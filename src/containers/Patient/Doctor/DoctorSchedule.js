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
            allDays: []

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
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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



    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdfromparent && this.props.doctorIdfromparent !== -1) {

            let doctorId = this.props.doctorIdfromparent;
            let date = event.target.value;
            console.log(doctorId, date);
            let res = await getScheduleByDate(doctorId, date)
            console.log(res);


        }
    }

    render() {

        console.log(moment(new Date()).startOf('day').valueOf())
        let { allDays } = this.state
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
