import { Carousel as Skeleton } from "../../../node_modules/react-noetic"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import React from "react"
import st from "./Carousel.scss"
import faCaretLeft from "@fortawesome/fontawesome-free-solid/faChevronRight"

export const Box = ({ colour, num, size = 200, children, hotelImg, logo, linkUrl, caption, styleclass }) =>
    <div style={{ alignItems: "center", backgroundColor: colour, height: size, justifyContent: "center", margin: 10, width: 400 }}>
        <div style={{ zIndex: "2", position: "absolute", flex: 1, marginTop: 80, marginLeft: 25, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignContent: "flex-start" }} >
            <img className={st.morton_hotel_solid_square_cmyk} src={logo} alt="logo" />
            <p className={st[styleclass]}>{caption}</p>
            <span>
                <a className={st.viewhotel} href={linkUrl}>View hotel

                    <FontAwesomeIcon icon={faCaretLeft} style={{ marginLeft: 5, fontSize: "0.6rem" }} />

                </a>
            </span>
        </div>
        <img style={{ zIndex: "1", position: "relative", paddingBottom: 10 }} width="100%" height="95%" src={hotelImg} />
    </div>


export const Carousel = ({ items }) =>
    <section>
        <Skeleton draggable itemWidth={220} maxItems={3}>
            { items.map((item) => (
                <Box
                    key
                    colour={item.bgcolor}
                    num="1"
                    hotelImg={item.img}
                    logo={item.logo}
                    linkUrl={item.link}
                    caption={item.caption}
                    styleclass={item.styleclass}
                />
            )
            )}
        </Skeleton>


    </section>
