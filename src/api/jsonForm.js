import axiosServices from './axiosServices';

const jsonFormApi = {
    getList: () => axiosServices.get('/jsonForm'),
    postJson: (data) => axiosServices.post('/jsonForm', data),
    getOne: (id) => axiosServices.get(`/jsonForm/${id}`),
    putJson: (id, data) => axiosServices.put(`/jsonForm/${id}`, data)
};

export default jsonFormApi;
