import React from "react"
import st from "./../Carousel.scss"
import PropTypes from "prop-types"

export const OurHotelBox = ({ colour, logo, width = 147, height = 149 }) =>
    <div style={{ alignItems: "center", backgroundColor: colour, height: "100%", justifyContent: "center", margin: 5, width: "100%", padding: "10px" }}>
        <img style={{ zIndex: "1", position: "relative", paddingBottom: 10, objectFit: "contain" }} width="100%" height="100%" src={logo} />
    </div>


OurHotelBox.defaultProps = {
    colour: "gray",
    width: 147,
    height: 149
}
OurHotelBox.propTypes = {
    colour: PropTypes.string,
    height: PropTypes.number,
    logo: PropTypes.string.isRequired,
    width: PropTypes.number
}
