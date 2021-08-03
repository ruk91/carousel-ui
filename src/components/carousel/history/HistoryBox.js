import React from "react"
import st from "./../Carousel.scss"
import PropTypes from "prop-types"

export const HistoryBox = ({ caption, hotelImg, size = 300 }) =>
    <div className={st.waysContainer} style={{ height: size }}>
        <div style={{ zIndex: "2", position: "absolute", flex: 1, marginTop: size * 0.85, marginLeft: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignContent: "flex-start" }} >
            <p className={st.dolor_sit_amet}>{caption} </p>
        </div>
        <img style={{ zIndex: "1", position: "relative", paddingBottom: 10, objectFit: "cover" }} width="100%" height="100%" src={hotelImg} />
    </div>


HistoryBox.defaultProps = {
    size: 300
}
HistoryBox.propTypes = {
    caption: PropTypes.string.isRequired,
    hotelImg: PropTypes.string.isRequired,
    size: PropTypes.number
}
