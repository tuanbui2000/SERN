import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
import { getAllUsers } from "../../services/userService"
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {

        let response = await getAllUsers('ALL');
        console.log('get user  from nodejs: ', response);
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })

        }


    }


    render() {
        let arrUsers = this.state.arrUsers;
        // console.log('check render', this.state);
        return (
            <div className="user-container">
                <div className='title text-center'>manage users</div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {arrUsers && arrUsers.map((item, index) => {
                            console.log('check map: ', item, index);
                            return (
                                <tr key={index}>

                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i class="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                    </td>





                                </tr>
                            )
                        })}


                    </table></div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
