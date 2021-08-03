import React from "react"
import st from "./AboutUsCarousel.scss"
import PropTypes from "prop-types"

export const AboutUsCarouselView = ({ index, carouselImg, caption }) => {
    return (
        <div
            style={{ alignItems: "center", justifyContent: "center", paddingTop: 0, paddingBottom: 10, margin: 5 }}
            id={index}
            className={st.imagethumbnail}
        >
            <img style={{ zIndex: "1", position: "relative", paddingBottom: 10, objectFit: "cover" }} width="100%" height="100%" src={carouselImg} />
            <div className={st.captionOnImage}>
                {caption}
            </div>
        </div>)
}

AboutUsCarouselView.prototype = {
    caption: PropTypes.string.isRequired,
    carouselImg: PropTypes.string.isRequired,
    index: PropTypes.number
}

