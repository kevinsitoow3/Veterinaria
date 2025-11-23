import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== OWNERS API ====================
export const ownersAPI = {
  getAll: () => api.get('/owners/').then(res => res.data.dueños || []),
  getById: (id) => api.get(`/owners/${id}`).then(res => res.data),
  create: (data) => api.post('/owners/', data).then(res => res.data),
  update: (id, data) => api.put(`/owners/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/owners/${id}`).then(res => res.data),
};

// ==================== SPECIES API ====================
export const speciesAPI = {
  getAll: () => api.get('/species/').then(res => res.data.especies || []),
  getById: (id) => api.get(`/species/${id}`).then(res => res.data),
  create: (data) => api.post('/species/', data).then(res => res.data),
  update: (id, data) => api.put(`/species/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/species/${id}`).then(res => res.data),
};

// ==================== BREEDS API ====================
export const breedsAPI = {
  getAll: () => api.get('/breeds/').then(res => res.data.razas || []),
  getById: (id) => api.get(`/breeds/${id}`).then(res => res.data),
  create: (data) => api.post('/breeds/', data).then(res => res.data),
  update: (id, data) => api.put(`/breeds/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/breeds/${id}`).then(res => res.data),
};

// ==================== PETS API ====================
export const petsAPI = {
  getAll: () => api.get('/pets/').then(res => res.data.mascotas || []),
  getById: (id) => api.get(`/pets/${id}`).then(res => res.data),
  create: (data) => api.post('/pets/', data).then(res => res.data),
  update: (id, data) => api.put(`/pets/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/pets/${id}`).then(res => res.data),
};

// ==================== VETERINARIANS API ====================
export const veterinariansAPI = {
  getAll: () => api.get('/veterinarians/').then(res => res.data.veterinarios || []),
  getById: (id) => api.get(`/veterinarians/${id}`).then(res => res.data),
  create: (data) => api.post('/veterinarians/', data).then(res => res.data),
  update: (id, data) => api.put(`/veterinarians/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/veterinarians/${id}`).then(res => res.data),
};

// ==================== SERVICES API ====================
export const servicesAPI = {
  getAll: () => api.get('/services/').then(res => res.data.servicios || []),
  getById: (id) => api.get(`/services/${id}`).then(res => res.data),
  create: (data) => api.post('/services/', data).then(res => res.data),
  update: (id, data) => api.put(`/services/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/services/${id}`).then(res => res.data),
};

// ==================== ROOMS API ====================
export const roomsAPI = {
  getAll: () => api.get('/rooms/').then(res => res.data.salas || []),
  getById: (id) => api.get(`/rooms/${id}`).then(res => res.data),
  create: (data) => api.post('/rooms/', data).then(res => res.data),
  update: (id, data) => api.put(`/rooms/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/rooms/${id}`).then(res => res.data),
};

// ==================== QUOTES API ====================
export const quotesAPI = {
  getAll: () => api.get('/quotes/').then(res => res.data.citas || []),
  getById: (id) => api.get(`/quotes/${id}`).then(res => res.data),
  create: (data) => api.post('/quotes/', data).then(res => res.data),
  update: (id, data) => api.put(`/quotes/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/quotes/${id}`).then(res => res.data),
};

// ==================== CLINICAL HISTORIES API ====================
export const clinicalHistoriesAPI = {
  getAll: () => api.get('/clinical-histories/').then(res => res.data.historias_clinicas || []),
  getById: (id) => api.get(`/clinical-histories/${id}`).then(res => res.data),
  create: (data) => api.post('/clinical-histories/', data).then(res => res.data),
  update: (id, data) => api.put(`/clinical-histories/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/clinical-histories/${id}`).then(res => res.data),
};

// ==================== TREATMENTS API ====================
export const treatmentsAPI = {
  getAll: () => api.get('/treatments/').then(res => res.data.tratamientos || []),
  getById: (id) => api.get(`/treatments/${id}`).then(res => res.data),
  create: (data) => api.post('/treatments/', data).then(res => res.data),
  update: (id, data) => api.put(`/treatments/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/treatments/${id}`).then(res => res.data),
};

// ==================== APPLIED TREATMENTS API ====================
export const appliedTreatmentsAPI = {
  getAll: () => api.get('/applied-treatments/').then(res => res.data.tratamientos_aplicados || []),
  getById: (id) => api.get(`/applied-treatments/${id}`).then(res => res.data),
  create: (data) => api.post('/applied-treatments/', data).then(res => res.data),
  update: (id, data) => api.put(`/applied-treatments/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/applied-treatments/${id}`).then(res => res.data),
};

export default api;

