import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleByDate } from '../../../services/userService'
class DoctorSchedule extends Component {

    constructor (props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailbleTime: []

        }
    }
    componentDidMount() {

        let { language } = this.props
        this.setArrayDays(language);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setArrayDays(this.props.language);


        }

    }

    setArrayDays = (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');


                object.label = this.capitalizeFirstLetter(labelVi)
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDate.push(object);
        }



        this.setState({
            allDays: arrDate,
        })
    }



    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdfromparent && this.props.doctorIdfromparent !== -1) {

            let doctorId = this.props.doctorIdfromparent;
            let date = event.target.value;
            console.log(doctorId, date);
            let res = await getScheduleByDate(doctorId, date)

            if (res && res.errCode === 0) {

                this.setState({
                    allAvailbleTime: res.data ? res.data : []
                })
            }
            console.log(res);


        }
    }

    render() {

        console.log()
        let { allDays, allAvailbleTime } = this.state
        let { language } = this.props
        return (
            <div className='doctor-schedule-container'>
                <div className=' all-schedule'>
                    <select onChange={(event) => this.handleOnchangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (

                                    <option value={item.value} key={index} >{item.label}</option>
                                )

                            })}

                    </select>
                </div>
                <div className='all-availble-time'>
                    <div className='text-calendar'>
                        <i className='fas fa-calendar-alt'></i> <span> Lịch khám </span></div>
                    <div className='time-content'>
                        {allAvailbleTime && allAvailbleTime.length > 0 ?
                            allAvailbleTime.map((item, index) => {
                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                            return (
                                <button key={index}>{timeDisplay}</button>

                            )
                            })
                            : <div> Choose another  day</div>
                    }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
