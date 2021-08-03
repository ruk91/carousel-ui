import { RichCarousel as Skeleton } from "./RichCarousel"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import React from "react"
import st from "./Carousel.scss"
import faCaretLeft from "@fortawesome/fontawesome-free-solid/faChevronRight"
import PropTypes from "prop-types"
import { HistoryBox } from "./history/HistoryBox"
import { OurHotelBox } from "./logoCarousel/OurHotelBox"

export const Box = ({ colour, size = 200, hotelImg, logo, linkUrl, caption, styleclass, viewHotelLabel }) =>
    <div style={{ alignItems: "center", backgroundColor: colour, height: "95%", justifyContent: "center", margin: 10, width: "100%", minWidth: "200px" }}>
        <div style={{ zIndex: "2", position: "absolute", flex: 1, marginTop: size * 0.8, marginLeft: 25, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignContent: "flex-start", bottom: "10%" }} >
            <img className={st.morton_hotel_solid_square_cmyk} src={logo} alt="logo" />
            <p className={st[styleclass]} style={{ fontFamily: "Raleway-Bold", fontWeight: "bold" }}>{caption}</p>
            <span>
                <a className={st.viewhotel} href={linkUrl} style={{ textDecoration: "underline", paddingLeft: "0px" }}>{viewHotelLabel}

                    <FontAwesomeIcon icon={faCaretLeft} style={{ marginLeft: 5, fontSize: "0.6rem" }} />

                </a>
            </span>
        </div>
        <img style={{ zIndex: "1", position: "relative", paddingBottom: 10 }} width="100%" height="95%" src={hotelImg} />
    </div>


export const HotelCarousel = ({ items, type }) => {
    switch (type) {
        case "history":
            return (
                <section>
                    <Skeleton draggable footerArrows itemWidth={4000} maxItems={3}>
                        {items.map((item) =>
                            <HistoryBox
                                colour={item.bgcolor} num="1" hotelImg={item.img}
                                logo={item.logo}
                                linkUrl={item.link}
                                caption={item.caption}
                                size={300}
                                styleclass="morton"
                                key={item}
                            />)
                        }
                    </Skeleton>
                </section>)
        case "logo":
            return (
                <section>
                    <Skeleton draggable itemWidth={185} maxItems={7} >
                        {items.map((item) =>
                            <OurHotelBox
                                colour={item.bgcolor} num="1" hotelImg={item.img}
                                logo={item.logo}
                                linkUrl={item.link}
                                caption={item.caption}
                                styleclass="morton"
                                key={item}
                            />)
                        }
                    </Skeleton>
                </section>)

        default:
            return (
                <section>
                    <Skeleton bullets draggable footerArrows itemWidth={4000} maxItems={3} className={st.waysContainer}>
                        {items.map((item) =>
                            <Box
                                colour={item.bgcolor} num="1" hotelImg={item.img}
                                logo={item.logo}
                                linkUrl={item.link}
                                caption={item.caption}
                                styleclass="morton"
                                size={300}
                                key={item}
                                viewHotelLabel={item.viewHotelLabel}
                            />)
                        }
                    </Skeleton>
                </section>)

    }
}

Box.defaultProps = {
    colour: "gray",
    size: 200,
    styleclass: "morton"
}
Box.propTypes = {
    caption: PropTypes.string.isRequired,
    colour: PropTypes.string,
    hotelImg: PropTypes.string.isRequired,
    linkUrl: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    size: PropTypes.number,
    styleclass: PropTypes.string
}
HotelCarousel.defaultProps = {
    type: ""
}
HotelCarousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    type: PropTypes.string
}
