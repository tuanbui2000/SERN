import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicaFacility.scss'
import Slider from "react-slick";

class MedicaFacility extends Component {

    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >

                            <div className='section-customize'>
                                <div className='customize-border'>

                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'> </div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>name, position</div>
                                        <div>doctor 1</div>
                                    </div>
                                </div>
                            </div>


                            <div className='section-customize'>
                                <div className='customize-border'>

                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'> </div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>name, position</div>
                                        <div>doctor 2 </div>
                                    </div>
                                </div>
                            </div>


                            <div className='section-customize'>
                                <div className='customize-border'>

                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'> </div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>name, position</div>
                                        <div>doctor 3</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'> </div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>name, position</div>
                                        <div>doctor 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>

                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'> </div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>name, position</div>
                                        <div>doctor 5</div>
                                    </div>
                                </div>
                            </div>

                            <div className='section-customize'>
                                <div className='customize-border'>

                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'> </div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>name, position</div>
                                        <div>doctor 6</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicaFacility);
