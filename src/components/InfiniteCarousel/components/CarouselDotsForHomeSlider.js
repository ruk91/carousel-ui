import React, { Component } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import classNames from "classnames/bind"
import st from "../styles/CarouselDots.scss"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faCircle from "@fortawesome/fontawesome-free-solid/faCircle"
import tmpst from "../../carousel/Carousel.scss"

const cx = classNames.bind(st)

export default class CarouselDotsForHomeSlider extends Component {
    static propTypes = {
        number: PropTypes.number,
        onChange: PropTypes.func,
        thumbnails: PropTypes.arrayOf(PropTypes.node),
        value: PropTypes.number
    };

    onChange = index => () => {
        const numberOfSlides = this.props.number || this.props.thumbnails.length
        const moduloItem = this.calculateButtonValue() % numberOfSlides

        return this.props.onChange(this.props.value - (moduloItem - index))
    };

    calculateButtonValue = () => {
        const numberOfSlides = this.props.number || this.props.thumbnails.length
        return this.props.value >= 0
            ? this.props.value
            : this.props.value + numberOfSlides * Math.ceil(Math.abs(this.props.value / numberOfSlides))
    };

    renderCarouselDots() {
        if (this.props.thumbnails) {
            const dotsLength = isNaN(this.props.number) ? this.props.thumbnails.length : this.props.number

            return this.props.thumbnails.slice(0, dotsLength).map((thumbnail, index) => (
                <li key={index}>
                    <div
                        // className={classnames(
                        //     "BrainhubCarousel__thumbnail",
                        //     { "BrainhubCarousel__thumbnail--selected": index === this.calculateButtonValue() % dotsLength }
                        // )}
                        className={index === this.calculateButtonValue() ? st.BrainhubCarousel__thumbnail_selected : st.BrainhubCarousel__thumbnail}
                        type="button"
                        onClick={this.onChange(index)}
                    >
                        {thumbnail}
                        {/* <img src={thumbnail} width="95px" height="61px" /> */}
                    </div>
                </li>
            ))
        }

        const dots = []
        for (let i = 0; i < this.props.number; i++) {
            dots.push(
                <li key={i}>
                    <FontAwesomeIcon
                        icon={faCircle}
                        className={(i === this.calculateButtonValue()) ? tmpst.bullet_selected_home : tmpst.bullet_normal_home}
                        currentposition={this.calculateButtonValue()}
                        clickedvalue={i}
                        type="button"
                        onClick={this.onChange(i)}
                    >
                        {i + 1}
                    </FontAwesomeIcon>
                </li>
            )
        }
        return dots
    }

    render() {
        return (
            <ul className={st.BrainhubCarousel__dots}>
                {this.renderCarouselDots()}
            </ul>
        )
    }
}
