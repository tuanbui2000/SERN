import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatients } from '../../../services/userService';
import moment from 'moment';

// import { FormattedMessage } from 'react-intl';

class ManagePatient extends Component {

    constructor (props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }
    componentDidMount() {

        let { user } = this.props
        let { currentDate } = this.state
        let FormattedDate = new Date(currentDate).getTime();
        this.getDataPatent(user, FormattedDate)



    }
    getDataPatent = async (user, FormattedDate) => {


        let res = await getAllPatients({
            doctorId: user.id,
            date: FormattedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
        console.log("Checkkasdf", this.state.dataPatient);

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.language !== this.props.language) {
        //     let arrDate = this.getArrayDays(this.props.language);
        //     this.setState({

        //     })
        // }



    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {

            let { user } = this.props
            let { currentDate } = this.state
            let FormattedDate = new Date(currentDate).getTime();
            this.getDataPatent(user, FormattedDate)

        })
    }
    handleBtnConfirm = () => {
        
    }
    handleBtnRemedy = () => {
        
    }

    render() {
        let { dataPatient } = this.state
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh!
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label> Chọn ngày khám </label>
                        <DatePicker
                            style={{ cursor: "pointer" }}
                            className="form-control"
                            onChange={this.handleOnChangeDatePicker}
                            value={this.state.currentDate}

                        />
                    </div>
                    <div className='col-12 table-manage-patient'>

                        <table style={{ width: "100%" }} >
                            <tr>
                                <th>STT</th>
                                <th>thời gian</th>
                                <th>họ tên</th>
                                <th>địa chỉ</th>
                                <th>giới tính</th>
                                <th>actions</th>
                            </tr>
                            {dataPatient && dataPatient.length > 0 ? dataPatient.map((item, index) => {
                                return (

                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.timeTypeDataPatient.valueVi}</td>
                                        <td>{item.patientData.firstName}</td>
                                        <td>{item.patientData.address}</td>
                                        <td>{item.patientData.genderData.valueVi}</td>
                                        <td>
                                            <button className='confirm-btn'
                                                onClick={() => this.handleBtnConfirm()}
                                            >Xác nhận</button>
                                            <button className='Remedy-btn'
                                                onClick={() => this.handleBtnRemedy()}
                                            >Gửi hóa đơn</button>
                                        </td>
                                    </tr>
                                )
                            })

                                : <tr>no data </tr>
                            }

                        </table>

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
