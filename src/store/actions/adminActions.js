import actionTypes from './actionTypes';
import { getAllcdeService } from "../../services/userService"


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcdeService("gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));

            } else {
                dispatch(fetchGenderFailed());

            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart, ', error);
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
