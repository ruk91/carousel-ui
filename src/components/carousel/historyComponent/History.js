import React, { PureComponent } from "react"
import st from "./History.scss"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft"
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight"
import classnames from "classnames/bind"
import PropTypes from "prop-types"

const cx = classnames.bind(st)
let dummy = []

export class History extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            currentYearIndex: 0
        }
        dummy = props.history
    }
    upadateSelectedYear = (index = 0) => () => {
        this.setState({ currentYearIndex: index })
    }
    generateYearsList = () => dummy.map((item, index) =>
        <li
            key={item}
            onClick={this.upadateSelectedYear(index)}
            className={cx({ selected: index === this.state.currentYearIndex }, st.yearListItem)}
        >
            {item.year}
        </li>)

    next = () => () => {
        this.setState((prevState) => ({
            currentYearIndex: prevState.currentYearIndex >= dummy.length - 1 ? 0 : prevState.currentYearIndex + 1
        }))
    }

    previous = () => () => {
        this.setState((prevState) => ({
            currentYearIndex: prevState.currentYearIndex < 1 ? dummy.length - 1 : prevState.currentYearIndex - 1
        }))
    }

    render() {
        return (
            <div className={st.flexcontainer}>
                <div className={st.img_year}>
                    <div className={st.yearList}>
                        <ul>
                            { this.generateYearsList() }
                        </ul>
                    </div>
                    <div className={st.imgDiv}>
                        <div style={{ backgroundImage: `url(${dummy[this.state.currentYearIndex]["image-url"]})`, backgroundSize: "cover", backgroundPosition: "center"}}>
                            <img className={st.dummyImage} src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAAAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM0NEFDRjFFNTE1MTExRUE4OUJDQTZFQUI2QjZBNEIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM0NEFDRjFGNTE1MTExRUE4OUJDQTZFQUI2QjZBNEIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjRERDMyODk1MTQ2MTFFQTg5QkNBNkVBQjZCNkE0QjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjRERDMyOEE1MTQ2MTFFQTg5QkNBNkVBQjZCNkE0QjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAbGhopHSlBJiZBQi8vL0JHPz4+P0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHAR0pKTQmND8oKD9HPzU/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAElAYADASIAAhEBAxEB/8QASwABAQAAAAAAAAAAAAAAAAAAAAYBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q==" />
                        </div>
                    </div>
                </div>
                <div className={st.descriptionWrapper} style={{ overflow: "hidden" }}>
                    <div className={st.description} >
                        <p className={st.year}> { dummy[this.state.currentYearIndex].year} </p>
                        <div className={st.details} dangerouslySetInnerHTML={{ __html: dummy[this.state.currentYearIndex]["history-summary"] }} />
                    </div>
                    <FontAwesomeIcon className={st.navleft} icon={faChevronLeft} onClick={this.previous()} />
                    <FontAwesomeIcon className={st.navright} icon={faChevronRight} onClick={this.next()} />
                </div>

            </div>

        )
    }


}

History.propTypes = {
    history: PropTypes.arrayOf(PropTypes.object).isRequired
}
