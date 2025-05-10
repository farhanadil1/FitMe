import axios from 'axios';

const API_URL = 'http://localhost:8053/api/users';

export const getUsers = () => axios.get(`${API_URL}/`);
export const getUsersId = (id) => axios.get(`${API_URL}/${id}`);
export const createUsers = (users) => axios.post(`${API_URL}/create`,users);

export const updateUsers = (users) => axios.put(`${API_URL}/edit`, users);
export const deleteUsers = (id) => axios.delete(`${API_URL}/delete/${id}`);
export const userLogin = (emailid, password) => {
    return axios.post(`${API_URL}/login`, {
      emailid: emailid,
      password: password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  };
  