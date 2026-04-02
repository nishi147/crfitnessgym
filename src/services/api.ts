import axios from 'axios';

const API_URL = 'https://crfitnessgym.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const packageService = {
  getAll: () => api.get('/packages'),
  create: (data: any) => api.post('/packages', data),
  update: (id: string, data: any) => api.put(`/packages/${id}`, data),
  delete: (id: string) => api.delete(`/packages/${id}`),
};

export const enquiryService = {
  getAll: () => api.get('/enquiries'),
  create: (data: any) => api.post('/enquiries', data),
  update: (id: string, data: any) => api.put(`/enquiries/${id}`, data),
  delete: (id: string) => api.delete(`/enquiries/${id}`),
};

export const authService = {
  login: (credentials: any) => api.post('/auth/login', credentials),
};

export default api;
