import React from "react"
import PropTypes from "prop-types"
import st from "./RichCarousel.scss"
import tmpst from "./Carousel.scss"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faCircle from "@fortawesome/fontawesome-free-solid/faCircle"
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft"
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight"
import classNames from "classnames/bind"

const cx = classNames.bind(st)

export class RichCarousel extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            diffX: 0,
            hide: true,
            offset: 0,
            mouseX: 0,
            position: 0,
            toShow: 0,
            bullets: this.props.bullets,
            sideArrows: this.props.sideArrows,
            footerArrows: this.props.footerArrows,
            overlayBullet: this.props.bulletOverlay,
            bottomThumbanil: this.props.bottomThumbanil
        }


    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize)
        setTimeout(() => this.handleWindowResize(), 10)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize)
    }

    handleMouseDown = (event) => {
        const isDraggable = this.state.toShow < this.props.children.length && this.props.draggable
        if (isDraggable) {
            this.setState({ mouseX: event.pageX })
            window.addEventListener("mouseup", this.handleMouseUp)
            window.addEventListener("mousemove", this.handleMouseMove)
        }
    }

    handleMouseUp = (event) => {
        this.setState({ diffX: 0 })
        if (this.state.mouseX - event.pageX > this.props.itemWidth) this.next()
        else if (event.pageX - this.state.mouseX > this.props.itemWidth) this.previous()
        window.removeEventListener("mousemove", this.handleMouseMove)
        window.removeEventListener("mouseup", this.handleMouseUp)
    }

    handleMouseMove = (event) => {
        const hidden = 1
        this.setState(prevState => {
            const diffX = (event.pageX - prevState.mouseX)
            if (diffX > 0) {
                const next = diffX > (this.props.itemWidth * hidden) ? (this.props.itemWidth * hidden) : diffX
                return { diffX: next }
            }
            else if (diffX < 0) {
                const next = diffX < -(this.props.itemWidth * hidden) ? -(this.props.itemWidth * hidden) : diffX
                return { diffX: next }
            }
            return null
        })
    }

    preventDrag = (event) => {
        event.preventDefault()
    }

    handleWindowResize = () => {
        const maxWidth = this.props.maxItems * this.props.itemWidth
        const width = maxWidth < this.box.clientWidth ? maxWidth : this.box.clientWidth
        const toShow = Math.floor(width / this.props.itemWidth) || 1
        this.setState({ hide: false, toShow })
    }

    sliceList = () => {
        const children = React.Children.map(this.props.children, child => React.cloneElement(child, {
            nextClick: this.next,
            prevClick: this.previous,
            position: this.state.position < 0 ? this.state.position + this.props.children.length : this.state.position,
            childCount: this.props.children.length
        }))
        const totalLength = children.length
        const hidden = 1
        const { position, toShow } = this.state

        if (position <= 0) {
            const first = children.slice(totalLength + position - hidden, totalLength + position - hidden + toShow + (hidden * 2))
            const remaining = toShow + (hidden * 2) - first.length
            const second = children.slice(0, remaining)
            return first.concat(second)
        }
        else if (position >= hidden) {
            const first = children.slice(position - hidden, position + toShow + hidden)
            const remaining = toShow + (hidden * 2) - first.length
            const second = children.slice(0, remaining)
            return first.concat(second)
        }
        return null
    }

    previous = (event) => {
        const totalLength = this.props.children.length
        this.setState(prevState => {
            const nextPosition = prevState.position - 1
            const position = nextPosition < -totalLength + 1 ? 0 : nextPosition
            return { offset: prevState.offset - this.props.itemWidth, position }
        })
    }

    next = (event) => {
        const totalLength = this.props.children.length
        this.setState(prevState => {
            const nextPosition = prevState.position + 1
            const position = nextPosition > totalLength - 1 ? 0 : nextPosition
            return { offset: prevState.offset + this.props.itemWidth, position }
        })
    }

    bulletClick = (event) => {
        let curentRenderItem = event.currentTarget.getAttribute("currentposition")
        const pressed = event.currentTarget.getAttribute("clickedvalue")
        if (pressed > curentRenderItem) {
            for (; curentRenderItem < pressed; curentRenderItem++) {
                this.next()
            }
        }
        else {
            for (; curentRenderItem > pressed; curentRenderItem--) {
                this.previous()
            }
        }
    }

    renderBulletsBar = () => {
        if (this.state.bullets) {
            const bulltesBarView = []
            const count = (this.state.position < 0) ? this.state.position + this.props.children.length : this.state.position
            this.props.children.map((child, index) => {
                bulltesBarView.push(<FontAwesomeIcon icon={faCircle} className={(index === count) ? tmpst.bullet_selected : tmpst.bullet_normal} currentposition={count} onClick={this.bulletClick} key={child} clickedvalue={index} />)
                return null
            })
            return bulltesBarView
        }
        return null
    }

    render() {
        const { children, itemWidth, transitions } = this.props
        const { diffX, offset, toShow } = this.state
        const showArrows = toShow < children.length
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={st.carousel} ref={(box) => { this.box = box }} style={{ visibility: this.state.hide ? "hidden" : "inherit" }}>
                    {showArrows && this.state.sideArrows ? <FontAwesomeIcon className={tmpst.right} icon={faChevronLeft} onClick={this.previous} /> : null}

                    <div className={cx(st.viewBox, { shadow: this.state.bottomThumbanil })} style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                        <div
                            className={st.itemWrapper}
                            onDragStart={this.preventDrag}
                            onMouseDown={this.handleMouseDown}
                            style={{
                                left: offset,
                                transform: `translateX(${-(offset - diffX)}px)`,
                                backgroundColor: "rgba(0,0,0,0)",
                                transition: transitions ? transitions : "transform 0.1s cubic-bezier(0.22, 0.61, 0.36, 1) 0s"
                            }}
                        >
                            {children.length < toShow ? children : this.sliceList()}
                        </div>

                    </div>
                    {showArrows && this.state.sideArrows ? <FontAwesomeIcon className={tmpst.right} icon={faChevronRight} onClick={this.next} /> : null}
                </div>
                <div className={this.state.overlayBullet ? tmpst.home_top_carousel : tmpst.default_carousel} style={{ display: "flex", alignContent: "center", justifyContent: this.state.overlayBullet ? "flex-end" : "center" }}>
                    {showArrows && this.state.footerArrows ? <div onClick={this.previous}><FontAwesomeIcon className={tmpst.right} icon={faChevronLeft} /> </div> : null}

                    <div>{this.renderBulletsBar()}</div>
                    {showArrows && this.state.footerArrows ? <div onClick={this.next}><FontAwesomeIcon className={tmpst.right} icon={faChevronRight} /> </div> : null}
                </div>
            </div>
        )
    }
}
RichCarousel.defaultProps = {
    draggable: false,
    bulletOverlay: false,
    bottomThumbanil: false,
    itemWidth: 0,
    maxItems: 3,
    sideArrows: false,
    footerArrows: false,
    bullets: false
}

RichCarousel.propTypes = {
    bottomThumbanil: PropTypes.bool,
    bulletOverlay: PropTypes.bool,
    bullets: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    draggable: PropTypes.bool,
    footerArrows: PropTypes.bool,
    itemWidth: PropTypes.number,
    maxItems: PropTypes.number,
    sideArrows: PropTypes.bool
}
