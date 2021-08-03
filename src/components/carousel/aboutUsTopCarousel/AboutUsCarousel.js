/* eslint-disable react/prop-types */

import React, { PureComponent } from "react"
import propTypes from "prop-types"
import st from "./AboutUsCarousel.scss"
import { AboutUsCarouselView } from "../aboutUsTopCarousel/AboutUsCarouselView"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft"
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight"

let firstIndex = 1
export class AboutUsCarousel extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 22,
            slides: this.props.items.map(item => ({ ...item, videoRef: React.createRef(), item }))
        }
    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.multiplyValues(this.state.slides)
    }

    multiplyValues = (slides) => {
        const concatedArray = []
        for (let i = 0; i <= slides.length; i++) {
            slides.forEach(item => {
                concatedArray.push(item)
            })
        }
        for (let i = 0; i <= slides.length; i++) {
            slides.forEach(item => {
                concatedArray.push(item)
            })
        }
        this.setState({ slides: slides.concat(concatedArray) })
        return this.state.slides
    }

    // calling the next property
    nextProperty = () => {
        const { activeIndex, slides } = this.state
        this.setState({
            activeIndex: activeIndex <= slides.length - 3 ? activeIndex + 1 : activeIndex
        })

    }

    sliceListRight = (slides) => {
        const baseIndex = firstIndex - 1
        const firstSlide = slides.slice(baseIndex, firstIndex)
        firstIndex += 1
        const concatedArray = slides.concat(firstSlide[0])
        this.setState({ slides: concatedArray })
    }

    // calling the previous property
    prevProperty = () => {
        const { activeIndex } = this.state
        this.setState({
            activeIndex: activeIndex >= 1 ? activeIndex - 1 : activeIndex
        })
    }

    render() {
        console.log("typeOf", typeof (this.props.items))
        const { slides, activeIndex } = this.state
        return (
            <div className={st.container}>
                <div className={st.imageSliderContainer}>
                    <div className={st.imageSlider}>
                        <div
                            className={st.imageSliderWrapper}
                            style={{
                                transform: `translateX(-${(activeIndex) * (100 / ((slides.length)))}%)`,
                            }}
                        >
                            {
                                slides.map((slide, slideIndex) =>
                                    <AboutUsCarouselView
                                        key={slide.caption}
                                        carouselImg={slide.img}
                                        index={slideIndex}
                                        activeSlideIndex={activeIndex}
                                        caption={slide.caption}
                                        videoRef={slide.videoRef}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className={st.arrowContainer}>
                    <div onClick={this.prevProperty}>
                        <FontAwesomeIcon className={st.right} icon={faChevronLeft} />
                    </div>
                    <div onClick={this.nextProperty}>
                        <FontAwesomeIcon className={st.right} icon={faChevronRight} />
                    </div>
                </div>

            </div >
        )
    }

}

AboutUsCarousel.prototypes = {
    items: propTypes.object.isRequired,
    multiplyValues: propTypes.func,
    nextProperty: propTypes.func.isRequired,
    prevProperty: propTypes.func.isRequired
}
