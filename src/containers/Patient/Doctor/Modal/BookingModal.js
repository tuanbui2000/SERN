import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {

    constructor (props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
       







    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.language !== this.props.language) {
        //     let arrDate = this.getArrayDays(this.props.language);
        //     this.setState({

        //     })
        // }



    }


    render() {

        let { isOpenModalBooking, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId= dataTime.doctorId
        }
        return (
            <Modal isOpen={isOpenModalBooking}
                size='lg'
                className='booking-modal-container'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'> Thông tin đặt lịch khám bệnh</span>
                        <span

                            onClick={closeBookingModal}
                            className='right'><i className='fas fa-times'></i> </span>
                    </div>
                    <div className='booking-modal-body'>


                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId= {doctorId}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label> Name</label>
                                <input className='form-control' />

                            </div>
                            <div className='col-6 form-group'>
                                <label> Sdt</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label> address</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label> mail</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 form-group'>
                                <label> reason</label>
                                <input className='form-control' />

                            </div>
                            <div className='col-6 form-group'>
                                <label> for</label>
                                <input className='form-control' />

                            </div>
                            <div className='col-6 form-group'>
                                <label> gender</label>
                                <input className='form-control' />
                            </div>

                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'>Xac nhan</button>
                        <button onClick={closeBookingModal} className='btn-booking-cancel'>Huy</button>
                    </div>
                </div>


            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
