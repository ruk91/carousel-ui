import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import classname from "classnames"
import carouselItemStyles from "../styles/CarouselItem.scss"

export default class CarouselItem extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        clickable: PropTypes.bool,
        currentSlideIndex: PropTypes.number,
        index: PropTypes.number,
        offset: PropTypes.number,
        onMouseDown: PropTypes.func,
        onTouchStart: PropTypes.func,
        width: PropTypes.number
    };

    onMouseDown = event => {
        this.props.onMouseDown(event, this.props.index)
    };

    onTouchStart = event => {
        this.props.onTouchStart(event, this.props.index)
    };

    render() {
        const { clickable, currentSlideIndex } = this.props
        return (
            <li
                className={[carouselItemStyles.BrainhubCarouselItem, clickable ? carouselItemStyles["BrainhubCarouselItem--clickable"] : "", currentSlideIndex ? carouselItemStyles["BrainhubCarouselItem--active"] : ""].join(" ")}
                style={{
                    paddingRight: `${this.props.offset / 2}px`,
                    paddingLeft: `${this.props.offset / 2}px`,
                    width: `${this.props.width}px`,
                    maxWidth: `${this.props.width}px`,
                    minWidth: `${this.props.width}px`
                }}
                onMouseDown={this.onMouseDown}
                onTouchStart={this.onTouchStart}
            >
                {this.props.children}
            </li>
        )
    }
}
