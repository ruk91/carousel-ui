import React, { PureComponent } from "react"
import propTypes from "prop-types"
import { VideoCarousel } from "./VideoCarousel"
import st from "./VideoCarousel.scss"

export class VidCarousel extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 1,
            slides: this.props.items.map(item => ({ ...item, videoRef: React.createRef(), item })),
            isSmallSize: false,
            isExtraSmallSize: false
        }
    }
    sizeOnChange = () => {
        this.setState({
            isSmallSize: window.matchMedia("(min-width:340px) and (max-width: 767px)").matches,
            isExtraSmallSize: window.matchMedia("(min-width: 310px) and (max-width: 330px)").matches
        })
    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.sizeOnChange()
        window.addEventListener("resize", this.sizeOnChange)
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.sizeOnChange)
    }
    // calling the next property
    nextProperty = (index) => {
        const { activeIndex, slides } = this.state
        const { videoRef } = slides[index]
        if (typeof videoRef.current !== "undefined" && typeof videoRef.current === "object") videoRef.current.pause()
        this.setState({
            activeIndex: activeIndex < slides.length ? activeIndex + 1 : activeIndex
        })
    }

    // caling the prevoius property
    prevProperty = (index) => {
        const { activeIndex, slides } = this.state
        const { videoRef } = slides[index]
        if (typeof videoRef.current !== "undefined" && typeof videoRef.current === "object") videoRef.current.pause()
        this.setState({
            activeIndex: activeIndex > 0 ? activeIndex - 1 : activeIndex
        })
    }
    render() {
        const { activeIndex, slides, isSmallSize, isExtraSmallSize } = this.state
        return (
            <div className="App">
                <div className={st.page}>
                    {isSmallSize ?
                        <div className={st.cardsSlider}>
                            <div
                                className={st.cardsSliderWrapper}
                                style={activeIndex !== 0 ? {
                                    transform: `translateX(-${(activeIndex * (93 / slides.length)) - 8.5}%)`
                                } : { transform: "translateX(8.5%" }}
                            >
                                {
                                    slides.map((slide, slideIndex) =>
                                        <VideoCarousel
                                            key={slide["video-title"]}
                                            video={slide["video-list"]}
                                            index={slideIndex}
                                            activeSlideIndex={activeIndex}
                                            prevProperty={this.prevProperty}
                                            nextProperty={this.nextProperty}
                                            videoRef={slide.videoRef}
                                            poster={slide["preview-image-url"]}
                                        />
                                    )
                                }
                            </div>
                        </div> :
                        <div className={st.cardsSlider}>
                            <div
                                className={st.cardsSliderWrapper}
                                style={isExtraSmallSize ? activeIndex !== 0 ? {
                                    transform: `translateX(-${(activeIndex * (93 / slides.length)) - 4}%)`
                                } : { transform: "translateX(4.5%)" } : { transform: `translateX(-${(activeIndex * 30) - activeIndex}%)` }}
                            >
                                {
                                    slides.map((slide, slideIndex) =>
                                        <VideoCarousel
                                            key={slide["video-title"]}
                                            video={slide["video-list"]}
                                            index={slideIndex}
                                            activeSlideIndex={activeIndex}
                                            prevProperty={this.prevProperty}
                                            nextProperty={this.nextProperty}
                                            videoRef={slide.videoRef}
                                            poster={slide["preview-image-url"]}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
VidCarousel.propTypes = {
    items: propTypes.arrayOf().isRequired
}


