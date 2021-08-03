import React, { PureComponent } from "react"
import st from "./VideoCarousel.scss"
import propTypes from "prop-types"

export class VideoCarousel extends PureComponent {

    refOne = React.createRef()

    onPressNextProperty = () => {
        const { nextProperty, activeSlideIndex } = this.props
        nextProperty(activeSlideIndex)
    }

    onPressPrevProperty = () => {
        const { prevProperty, activeSlideIndex } = this.props
        prevProperty(activeSlideIndex)
    }
    getExtension(url) {
        return url.split(/\#|\?/)[0].split(".").pop().trim()
    }
    getVideo(type) {
        const { video } = this.props
        const videoUrl = video.find(vid => this.getExtension(vid["video-url"]) === type)
        if (videoUrl) {
            return videoUrl["video-url"]
        }
        else {
            return null
        }
    }
    render() {
        const { video, index, activeSlideIndex, videoRef, poster } = this.props
        const videoElem = (<video width="100%" poster={poster} controls disablePictureInPicture controlsList="nodownload" ref={videoRef}><source src={this.getVideo("mp4")} type="video/mp4" /><source src={this.getVideo("webm")} type="video/webm" /><source src={this.getVideo("ogg")} type="video/ogg" /></video>)
        const videoElemForActiveSlide = (<video poster={poster} className={st.video} width="100%" controls disablePictureInPicture controlsList="nodownload" ref={videoRef}><source src={this.getVideo("mp4")} type="video/mp4" /><source src={this.getVideo("webm")} type="video/webm" /><source src={this.getVideo("ogg")} type="video/ogg" /></video>)

        if (index === activeSlideIndex) {
            return (
                <div
                    // style={{ alignItems: "center", justifyContent: "center", paddingTop: 0, paddingBottom: 10 }}
                    id={index}
                    className={st.videoThumbnailsforMiddle}
                >

                    {videoElem}
                </div>)
        }
        else if (index < activeSlideIndex) {
            return (

                <div
                    // style={{ alignItems: "center", justifyContent: "center", margin: 10, paddingTop: 40, paddingBottom: 10 }}
                    id={index}
                    onClick={this.onPressPrevProperty}
                    className={st.videoThumbnails}
                >

                    {videoElemForActiveSlide}

                </div>)
        }

        else if (index > activeSlideIndex) {
            return (
                <div
                    // style={{ alignItems: "center", justifyContent: "center", margin: 10, paddingTop: 40, paddingBottom: 10 }}
                    id={index}
                    onClick={this.onPressNextProperty}
                    className={st.videoThumbnails}
                >

                    {videoElemForActiveSlide}

                </div>)
        }
        return null
    }

}

VideoCarousel.propTypes = {
    nextProperty: propTypes.func.isRequired,
    prevProperty: propTypes.func.isRequired
}

