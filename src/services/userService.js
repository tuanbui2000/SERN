import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}



const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}


const createNewUserService = (data) => {
    // console.log('check data from service', data);
    return axios.post(`/api/create-new-user`, data);
}
const deleteUserService = (userId) => {
    // console.log('check data from service', data);
    // return axios.delete(`/api/delete-user`,{id:userId});
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    })
}


const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData)
}



const getAllcodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)

}
const getTopDocorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}



const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}




const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-info-doctors`, data)
}


const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}






export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllcodeService,
    getTopDocorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInfoDoctor,
    saveBulkScheduleDoctor
}