import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';


class ProfileDoctor extends Component {

    constructor (props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {

        let data = await this.getInfoDoctor(this.props.doctorId)
        // console.log("log data", data);
        this.setState({
            dataProfile: data
        })



    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.language !== this.props.language) {
        //     let arrDate = this.getArrayDays(this.props.language);
        //     this.setState({
        //     })
        // }
        if (prevProps.doctorId !== this.props.doctorId) {
            // this.getInfoDoctor(this.props.doctorId)

        }

    }


    getInfoDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }

    render() {
        console.log(this.state.dataProfile);
        let { dataProfile } = this.state
        let { language } = this.props
        let nameVi = '';
        let nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})` }}

                    > </div>
                    <div className='content-right'>

                        <div className='up'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div className='down'>
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&

                                <span>
                                    {dataProfile.Markdown.description}

                                </span>

                            }
                        </div>


                    </div>

                </div>
                <div className='price'>
                    Gia Kham: 
                    {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.VI ?
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_infor.priceData.valueVi}
                            suffix="VND"
                            displayType="text"
                            thousandSeparator=","
                        /> : ''}
                    {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.EN ?
                        <NumberFormat
                        className='currency'
                        value={dataProfile.Doctor_infor.priceData.valueEn }
                        suffix="$"
                        displayType="text"
                        thousandSeparator=","
                    />: ''}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
