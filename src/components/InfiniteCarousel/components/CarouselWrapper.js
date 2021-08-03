import React, { Component } from "react"
import isNil from "lodash/isNil"
import PropTypes from "prop-types"

import Carousel from "./Carousel"

export default class CarouselWrapper extends Component {
  static propTypes = {
      onChange: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  constructor(props) {
      super(props)
      this.state = {
          value: 0
      }
  }

  onChange = value => this.setState({ value });

  render() {
      const { value, onChange, ...rest } = this.props
      const isControlled = !isNil(value)
      return (
          <Carousel
              ref={this.props.myRef}
              value={isControlled ? parseInt(value) : this.state.value}
              onChange={isControlled ? onChange : this.onChange}
              {...rest}
          />
      )
  }
}
