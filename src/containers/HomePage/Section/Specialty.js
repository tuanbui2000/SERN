import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService';

class Specialty extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dataspecialty: []
        }
    }


    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataspecialty: res.data ? res.data : []
            })
        }
    }
    render() {
        let { dataspecialty } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id = "homepage.popular-specialties"/></span>
                        <button className='btn-section'><FormattedMessage id = "homepage.more-infor"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {dataspecialty && dataspecialty.length > 0 &&
                                dataspecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize specialty-child' key={index}>
                                            <div className='bg-image  section-specialty'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                            > </div>
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )

                                })
                            }




                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
