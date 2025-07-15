import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchEmployees = (search = '', status = '', page = 1, limit = 10) =>
  API.get(`/employees`, { params: { search, status, page, limit } });

export const addEmployee = (data) => API.post('/employees', data);