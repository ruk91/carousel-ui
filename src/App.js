/* eslint-disable import/no-anonymous-default-export */
import React, { PureComponent } from 'react';
// import Carousel, { Dots } from '@brainhubeu/react-carousel';
import imageOne from './assets/1.jpg'
import imageTwo from './assets/2.jpg'
import imageThree from './assets/3.jpg'
import st from "./App.css"
import style from "./App.scss"
import Carousel, { Dots } from "./components/InfiniteCarousel"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft"
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight"

// const data = {
//   "hotel-images-list" : [
//     { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/City-Sleeper-Good-To-Go.jpg" },
//     { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/Royal-National-City-Sleeper-Corridor.jpg" },
//     { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/Royal-National-City-Sleeper-External.jpg" },
//     { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/Royal-National-City-Sleeper-Reception.jpg" },
//     { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/Royal-National-City-Sleeper-Entrance.jpg" },
//     { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/Royal-National-Meeting-Place.jpg" }
//   ]
// }

export default class App extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      hotel_images_list: [
        { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/City-Sleeper-Good-To-Go.jpg" },
        { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/Royal-National-City-Sleeper-Corridor.jpg" },
        { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/Royal-National-City-Sleeper-External.jpg" },
        { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/Royal-National-City-Sleeper-Reception.jpg" },
        { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/Royal-National-City-Sleeper-Entrance.jpg" },
        { "hotel-image-url": "https://cdn-ilh-dev.noeticlabs.io/ilh-common/hotels/images/Royal-National-Meeting-Place.jpg" }
      ],
      value: 1,
    }

    this.hotelLocation = React.createRef()
    this.panelCollapse = React.createRef()
    this.carouselRef = React.createRef()
    this.domRef = React.createRef()
  }

  getSlides = (data) => (typeof data !== "undefined") ? data.map(({ img, currentSlideIndex }) => (
    <div key={currentSlideIndex} className={style.hotelViewCarousalImage} style={{ backgroundImage: `url( ${img} )` }} >
      {/* <img src={img} alt="" /> */}
      {console.log("data: ",img)}
    </div>
  )) : []

  generateHotelImageList = (data) => {
    const hotelImageList = []
    data.map((item) => {
      const imageItem = {}
      imageItem.img = item["hotel-image-url"]
      hotelImageList.push(imageItem)
      return null
    })
    console.log("hotelImageList: ", hotelImageList)
    return hotelImageList
  }

  generateThumbnailsList = (data) => {
    const thumbnailsList = []
    data.map((item, i) => {
        const imageItem = <div ref={this[`${i}_ref`]} style={{ width: "95px", height: "61px", backgroundImage: `url( ${item["hotel-image-url"]} )`, backgroundSize: "cover" }} />
        // const imageItem = <img src={item["hotel-image-url"]} width="95px" height="61px" />
        // imageItem.img = item["hotel-image-url"]
        thumbnailsList.push(imageItem)
        return null
    })
    return thumbnailsList
}

  render() {
    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1
    // };
    console.log("this.state.hotel_images_list: ", this.state.hotel_images_list)
    if (typeof this.state.data !== "undefined") {
      this.state.hotel_images_list.forEach((dta, i) => {
        this[`${i}_ref`] = React.createRef()
      })
    }
    const { state: { value } } = this
    return (
      <div className={style.rightContainer}>
        <div className={style.carouselWrapper}>
          <p>test</p>
          <Carousel
            value={value}
            slides={this.getSlides(this.generateHotelImageList(this.state.hotel_images_list))}
            // slides={this.state.data}
            infinite
            slidesPerPage={1}
            draggable={false}
            animationSpeed={1500}
            offset={2}
          />
          <div className={style.arrowContainer}>
            <div onClick={this.prevSlide} className={style.noSelect}>
              <FontAwesomeIcon
                disabled
                className={value === 0 ? style.right_disabled : style.right}
                icon={faChevronLeft}
              />
            </div>
            <div ref={this.domRef} className={style.scrolling_wrapper}>
              <Dots
                number={this.generateThumbnailsList(this.state.hotel_images_list).length}
                thumbnails={this.generateThumbnailsList(this.state.hotel_images_list)}
                value={value} onChange={this.onchange}
              />
            </div>
            <div onClick={this.nextSlide} className={style.noSelect}>
              <FontAwesomeIcon
                className={value === (this.generateThumbnailsList(this.state.hotel_images_list).length - 1) ? style.right_disabled : style.right}
                icon={faChevronRight}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

