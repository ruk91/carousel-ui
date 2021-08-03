import { RichCarousel as Skeleton } from "./RichCarousel"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import React from "react"
import st from "./Carousel.scss"
import faCaretLeft from "@fortawesome/fontawesome-free-solid/faChevronRight"
import PropTypes from "prop-types"
import NavLink from "../../layout/Navigation/NavLink"

let itemlength = 0
let count = -1

const loop = () => {
    count = (count < itemlength ? count : null)
    count++
    return count
}

export const Box = ({ colour, size = 200, hotelImg, linkUrl, caption, maxWidth, screenWidth, nextClick, isAutoplay }) => {
    if (isAutoplay) {
        const runner = setInterval(nextClick, 1000 * 4.5)
        const play = () => loop() ? clearInterval(runner) : null
        play()
    }
    return (
        <div key={hotelImg + loop} style={{ alignItems: "center", backgroundColor: colour, height: size, justifyContent: "center", width: maxWidth }}>
            <div
                key={loop}
                style={{
                    zIndex: "2", position: "absolute", marginTop: size - 40, marginLeft: 0/* maxWidth - (screenWidth * 0.2)*/,
                    display: "flex", flexDirection: "row", justifyContent: "flex-end"
                }}
            >
                <span style={{ marginTop: "-10px", position: "relative", bottom: "38px", float: "right", zIndex: "10", backgroundColor: "rgba(0,0,0,0.35)", padding: `10px ${(screenWidth * 0.2)}px 55px ${maxWidth - (screenWidth * 0.2)}px` }} >
                    <a
                        className={st.viewhotel}
                        href={linkUrl}
                        style={{ marginTop: "31px", position: "relative", bottom: "38px", float: "right", zIndex: "11", fontFamily: "Raleway-Bold", fontWeight: "bold", lineHeight: 1.07 }}
                    >
                        {caption}
                        <FontAwesomeIcon icon={faCaretLeft} style={{ marginLeft: 5, fontSize: "0.6rem", fontWeight: "normal" }} />
                    </a>
                </span>
            </div>
            <img key={hotelImg} style={{ zIndex: "1", position: "relative", paddingBottom: 10, objectFit: "cover" }} width="100%" height="100%" src={hotelImg} />
        </div>
    )
}
// defining the transition specifically for this component
const transitions = "transform 1s cubic-bezier(0.22, 0.61, 0.36, 1) 0s"

export class HomeTopCarousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { maxWidth: 0, screenWidth: 0 }
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener("resize", this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }

    updateWindowDimensions = () => {
        this.setState({ maxWidth: window.innerWidth, screenWidth: screen.width })
    }

    render() {
        const { items, autoplay } = this.props
        itemlength = items.length
        return (
            <section>
                <Skeleton bulletOverlay bullets draggable itemWidth={this.state.maxWidth} maxItems={1} footerArrows transitions={transitions}>
                    {items.map((item) =>
                        <Box
                            colour={item.bgcolor}
                            num="1" hotelImg={item.img}
                            logo={item.logo}
                            linkUrl={item.link}
                            caption={item.caption}
                            styleclass="morton"
                            key={item}
                            size={400}
                            maxWidth={this.state.maxWidth}
                            screenWidth={this.state.screenWidth}
                            isAutoplay={autoplay}

                        />)
                    }
                </Skeleton>


            </section>
        )
    }
}

HomeTopCarousel.defaultProps = {
    autoplay: false
}
HomeTopCarousel.propTypes = {
    autoplay: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object).isRequired
}
Box.defaultProps = {
    colour: "gray",
    maxWidth: 0,
    screenWidth: 0,
    size: 200
}
Box.propTypes = {
    caption: PropTypes.string.isRequired,
    colour: PropTypes.string,
    hotelImg: PropTypes.string.isRequired,
    isAutoplay: PropTypes.bool.isRequired,
    linkUrl: PropTypes.string.isRequired,
    maxWidth: PropTypes.number,
    nextClick: PropTypes.func.isRequired,
    screenWidth: PropTypes.number,
    size: PropTypes.number
}
