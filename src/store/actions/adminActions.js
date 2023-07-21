import actionTypes from './actionTypes';
import { getAllcdeService, createNewUserService, getAllUsers,deleteUserService } from "../../services/userService"
import {  toast } from 'react-toastify';


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllcdeService("gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));

            } else {
                dispatch(fetchGenderFailed());

            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderFailed, ', error);
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})




export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllcdeService("position");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));

            } else {
                dispatch(fetchPositionFailed());

            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed, ', error);
        }
    }

}



export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})




export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllcdeService("role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));

            } else {
                dispatch(fetchRoleFailed());

            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed, ', error);
        }
    }

}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})





export const createNewUser = (data) => {

    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUsersStart());

            } else {
                toast.error("Create a new user failed!")
                dispatch(saveUserFailed());

            }
        } catch (error) {
            dispatch(saveUserFailed());
            toast.error("Create a new user failed!")

            console.log('createUserFailed, ', error);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})




//getalluser

export const fetchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));

            } else {
                dispatch(fetchAllUsersFailed());

            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchRoleFailed, ', error);
        }
    }

}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_All_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_All_USERS_FAILED
})



//delete

export const deleteAUser = (userId) => {

    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete user succeed!")
                dispatch(deleteUserSuccess(res.data));
                dispatch(fetchAllUsersStart());

            } else {
                toast.error("Delete user failed!")

                dispatch(delteUserFailed());

            }
        } catch (error) {
            toast.error("Delete user failed!")

            dispatch(delteUserFailed());
            console.log('createUserFailed, ', error);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const delteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
