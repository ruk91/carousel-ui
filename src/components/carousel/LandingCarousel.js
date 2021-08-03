import React from "react"
import PropTypes from "prop-types"
import st from "./LandingCarousel.scss"
import { IconButton } from "../../../node_modules/react-noetic/src/IconButton/IconButton"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft"
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight"

export class Carousel extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            diffX: 0,
            hide: true,
            offset: 0,
            mouseX: 0,
            position: 0,
            toShow: 0
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
        const { children } = this.props
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

    render() {
        const { children, itemWidth } = this.props
        const { diffX, offset, toShow } = this.state
        const showArrows = toShow < children.length
        return (
            <div className={st.carousel} ref={(box) => { this.box = box }} style={{ visibility: this.state.hide ? "hidden" : "inherit" }}>
                <div className={st.viewBox} style={{ width: "100%" }}>
                    <div
                        className={st.itemWrapper}
                        onDragStart={this.preventDrag}
                        onMouseDown={this.handleMouseDown}
                        style={{
                            left: offset,
                            transform: `translateX(${-(offset - diffX)}px)`,
                            backgroundColor: "rgba(0,0,0,0)",
                            // transition: "transform 1.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s"
                        }}
                    >
                        {children.length < toShow ? children : this.sliceList()}
                        <div className={st.home_top_carousel} style={{ width: "100%", height: "100%"}}>
                            {showArrows ? <div style={{ display: "flex", width: "50%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}><FontAwesomeIcon onClick={this.previous} className={st.left} icon={faChevronLeft} style={{ cursor: "pointer", backgroundColor: "rgba(0,0,0,0.4)", padding: 10 }} /> </div> : null}
                            {showArrows ? <div style={{ display: "flex", width: "50%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}><FontAwesomeIcon onClick={this.next} className={st.right} icon={faChevronRight} style={{ cursor: "pointer", backgroundColor: "rgba(0,0,0,0.4)", padding: 10 }} /> </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Carousel.defaultProps = {
    draggable: false
}

Carousel.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    draggable: PropTypes.bool,
    itemWidth: PropTypes.number.isRequired,
    maxItems: PropTypes.number.isRequired
}
