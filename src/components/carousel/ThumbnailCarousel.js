import { RichCarousel as Skeleton } from "./RichCarouselForHotels"
import React from "react"
import PropTypes from "prop-types"
import ThumbnailBox from "./thumbnail/ThumbnailBox"
import str from "./RichCarouselForHotels.scss"
const st = {
    maxWidth: "100%",
    maxHeight: "480px",
    display: "block",
    width: "100%",
    objectFit: "cover",
    height: "100%"
}
let imgArray = new Array()
let middleEliment = 0
export class ThumbnailCarousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            thumbnailImgUrl: this.props.items[0].img
        }
    }
    c = (i) => {
        if (i !== this.state.thumbnailImgUrl) {

            this.setState(prevState => prevState !== i ? { thumbnailImgUrl: i } : null)
        }
    }
    sendMiddleElement = (hotel) => {
        const { absoluteNumber } = this.props
        const arraylen = imgArray.length
        middleEliment = Math.floor(absoluteNumber / 2)
        if (arraylen === absoluteNumber) {
            imgArray = []
        }
        imgArray.push(hotel)
        this.setState(prevState => prevState !== imgArray[middleEliment] ? { thumbnailImgUrl: imgArray[middleEliment] } : null)

    }
    render() {
        const { items, maxThumbnailItems, absoluteNumber } = this.props
        return (
            <div style={{ backgroundColor: "transparent", flex: 1, display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <img style={st} src={this.state.thumbnailImgUrl || items[0].img} height={this.props.previewImgHeight || "-webkit-fill-available"} width={this.props.previewImgWidth || "auto"} />
                </div>
                <section>
                    <div>
                        <Skeleton draggable itemWidth={300} maxItems={maxThumbnailItems} sideArrows bottomThumbanil>

                            {items.map((item, index) =>
                                <ThumbnailBox
                                    colour={item.bgcolor}
                                    num=""
                                    hotelImg={item.img}
                                    logo={item.logo}
                                    linkUrl={item.link}
                                    caption={item.caption}
                                    styleclass="morton"
                                    width={95}
                                    key={item}
                                    fun={this.c}
                                    middleFun={this.sendMiddleElement}
                                    absoluteNumber={absoluteNumber}
                                    // maxThumbnailItems={maxThumbnailItems}
                                    indexes={index}
                                />
                            )}

                        </Skeleton>
                    </div>

                </section>
            </div>
        )
    }
}
ThumbnailCarousel.defaultProps = {
    previewImgHeight: 0,
    previewImgWidth: 0,
    maxThumbnailItems: 0,
    absoluteNumber: 0
    // maxThumbnailItems: 0
}
ThumbnailCarousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    maxThumbnailItems: PropTypes.number,
    previewImgHeight: PropTypes.number,
    previewImgWidth: PropTypes.number,
    absoluteNumber: PropTypes.number,
    // maxThumbnailItems: PropTypes.number
}
