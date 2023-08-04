import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify';

class BookingModal extends Component {

    constructor (props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            selectedGenders: '',
            doctorId: '',
            timeType: "",
        }
    }
    async componentDidMount() {

        this.props.getGenderStart()


    }

    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (prevProps.genders !== this.props.genders) {

            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType

                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }



    }


    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let copyState = { ...this.state };

        copyState[id] = valueInput
        this.setState({
            ...copyState
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }



    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGenders: selectedOption });

    }




    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime()
        let res = await postPatientAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            genders: this.state.genders,
            selectedGenders: this.state.selectedGenders.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
        })
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment succeed!")
            this.props.closeBookingModal()
        } else {
            toast.error("Booking a new appointment failed!")
        }
        console.log(this.state);
    }

    render() {





        let { isOpenModalBooking, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (
            <Modal isOpen={isOpenModalBooking}
                size='lg'
                className='booking-modal-container'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'> <FormattedMessage id="patient.booking-modal.title" /></span>
                        <span

                            onClick={closeBookingModal}
                            className='right'><i className='fas fa-times'></i> </span>
                    </div>
                    <div className='booking-modal-body'>


                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>  <FormattedMessage id="patient.booking-modal.fullName" /></label>
                                <input className='form-control' value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />

                            </div>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input className='form-control' value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className='form-control' value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className='form-control' value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                            </div>
                            <div className='col-12 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className='form-control' value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')} />

                            </div>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.birthday}
                                // minDate={yesterday}

                                />

                            </div>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGenders}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>

                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button onClick={() => this.handleConfirmBooking()}
                            className='btn-booking-confirm'
                        ><FormattedMessage id="patient.booking-modal.btn-confirm" />
                        </button>
                        <button onClick={closeBookingModal}
                            className='btn-booking-cancel'>
                            <FormattedMessage id="patient.booking-modal.btn-cancel" />
                        </button>
                    </div>
                </div>


            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,


    };
};

const mapDispatchToProps = dispatch => {
    return {

        getGenderStart: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
