import React from "react"
import PropTypes from "prop-types"
import st from "../RichCarouselForHotels.scss"
import ReactDOM from "react-dom"

class ThumbnailBox extends React.PureComponent {
    constructor(props) {
        super(props)
        this.imgclick = this.props.fun
        this.middleImage = this.props.middleFun
        this.f = this.props.funny
        this.imgDoll = React.createRef()
        this.state = {
            isClicked: false
        }
    }
    clickevent = (event) => {
        this.imgclick(this.props.hotelImg)
        // this.f(this.props.hotelImg)
        // console.log("This is:", this.props.hotelImg)

    }
    render() {
        this.props.absoluteNumber ? this.middleImage(this.props.hotelImg) : null
        const { colour, hotelImg, indexes } = this.props
        const style = this.state.isClicked ? st.imgAtt : st.imgAtt2
        return (
            <div id={indexes} onClick={this.clickevent} style={{ alignItems: "center", backgroundColor: colour, justifyContent: "center", margin: 5, marginTop: 10 }}>
                <img className={style} width="100%" height="95%" src={hotelImg} />
            </div>)

    }

}

export default ThumbnailBox

ThumbnailBox.defaultProps = {
    colour: "",
    size: 61,
    // width: 0
}
ThumbnailBox.propTypes = {
    colour: PropTypes.string,
    fun: PropTypes.func.isRequired,
    hotelImg: PropTypes.string.isRequired,
    size: PropTypes.number,
    // width: PropTypes.number
}

