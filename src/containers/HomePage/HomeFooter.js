import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
<p>&copy; 2023 buidinhtuan. More information <a target="_blank" href='https://www.facebook.com/profile.php?id=100027057561662'>Click here</a> </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
