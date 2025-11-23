import { useState, useEffect } from 'react';
import { quotesAPI, petsAPI, veterinariansAPI, servicesAPI, roomsAPI } from '../services/api';

export const useQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [pets, setPets] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);
  const [services, setServices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    id_mascota: '',
    id_veterinario: '',
    id_servicio: '',
    id_sala: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado_cita: ''
  });

  useEffect(() => {
    fetchQuotes();
    fetchPets();
    fetchVeterinarians();
    fetchServices();
    fetchRooms();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const data = await quotesAPI.getAll();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      alert('Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  };

  const fetchPets = async () => {
    try {
      const data = await petsAPI.getAll();
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const fetchVeterinarians = async () => {
    try {
      const data = await veterinariansAPI.getAll();
      setVeterinarians(data);
    } catch (error) {
      console.error('Error fetching veterinarians:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const data = await servicesAPI.getAll();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const data = await roomsAPI.getAll();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        id_mascota: parseInt(formData.id_mascota),
        id_veterinario: parseInt(formData.id_veterinario),
        id_servicio: parseInt(formData.id_servicio),
        id_sala: parseInt(formData.id_sala),
        fecha_inicio: new Date(formData.fecha_inicio).toISOString(),
        fecha_fin: new Date(formData.fecha_fin).toISOString()
      };
      if (editingId) {
        await quotesAPI.update(editingId, submitData);
        alert('Cita actualizada exitosamente');
      } else {
        await quotesAPI.create(submitData);
        alert('Cita creada exitosamente');
      }
      resetForm();
      fetchQuotes();
    } catch (error) {
      console.error('Error saving quote:', error);
      alert('Error al guardar la cita');
    }
  };

  const handleEdit = (quote) => {
    setEditingId(quote.id_cita);
    const startDate = new Date(quote.fecha_inicio).toISOString().slice(0, 16);
    const endDate = new Date(quote.fecha_fin).toISOString().slice(0, 16);
    setFormData({
      id_mascota: quote.id_mascota,
      id_veterinario: quote.id_veterinario,
      id_servicio: quote.id_servicio,
      id_sala: quote.id_sala,
      fecha_inicio: startDate,
      fecha_fin: endDate,
      estado_cita: quote.estado_cita
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cita?')) {
      try {
        await quotesAPI.delete(id);
        alert('Cita eliminada exitosamente');
        fetchQuotes();
      } catch (error) {
        console.error('Error deleting quote:', error);
        alert('Error al eliminar la cita');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id_mascota: '',
      id_veterinario: '',
      id_servicio: '',
      id_sala: '',
      fecha_inicio: '',
      fecha_fin: '',
      estado_cita: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      resetForm();
    }
  };

  const getPetName = (petId) => {
    const pet = pets.find(p => p.id_mascota === petId);
    return pet ? pet.nombre_mascota : 'N/A';
  };

  const getVetName = (vetId) => {
    const vet = veterinarians.find(v => v.id_veterinario === vetId);
    return vet ? vet.nombre_veterinario : 'N/A';
  };

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id_servicio === serviceId);
    return service ? service.nombre_servicio : 'N/A';
  };

  const getRoomName = (roomId) => {
    const room = rooms.find(r => r.id_sala === roomId);
    return room ? room.nombre_sala : 'N/A';
  };

  return {
    quotes,
    pets,
    veterinarians,
    services,
    rooms,
    loading,
    showForm,
    editingId,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm,
    getPetName,
    getVetName,
    getServiceName,
    getRoomName
  };
};

