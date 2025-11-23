import { useState, useEffect } from 'react';
import { servicesAPI } from '../services/api';
import { validations } from '../utils/validations';

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_servicio: '',
    descripcion_servicio: '',
    precio_servicio: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await servicesAPI.getAll();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Error al cargar los servicios');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.nombre_servicio = validations.textMinLength(formData.nombre_servicio, 3, 'El nombre del servicio');
    newErrors.descripcion_servicio = validations.description(formData.descripcion_servicio, 'La descripción');
    newErrors.precio_servicio = validations.positiveDecimal(formData.precio_servicio, 'El precio', 20000, true);
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      let error = '';
      switch (field) {
        case 'nombre_servicio':
          error = validations.textMinLength(value, 3, 'El nombre del servicio');
          break;
        case 'descripcion_servicio':
          error = validations.description(value, 'La descripción');
          break;
        case 'precio_servicio':
          error = validations.positiveDecimal(value, 'El precio', 20000, true);
          break;
        default:
          break;
      }
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const submitData = {
        ...formData,
        precio_servicio: parseFloat(formData.precio_servicio)
      };
      if (editingId) {
        await servicesAPI.update(editingId, submitData);
        alert('Servicio actualizado exitosamente');
      } else {
        await servicesAPI.create(submitData);
        alert('Servicio creado exitosamente');
      }
      resetForm();
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error al guardar el servicio');
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id_servicio);
    setFormData({
      nombre_servicio: service.nombre_servicio,
      descripcion_servicio: service.descripcion_servicio,
      precio_servicio: service.precio_servicio
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este servicio?')) {
      try {
        await servicesAPI.delete(id);
        alert('Servicio eliminado exitosamente');
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Error al eliminar el servicio');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre_servicio: '',
      descripcion_servicio: '',
      precio_servicio: ''
    });
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      resetForm();
    }
  };

  return {
    services,
    loading,
    showForm,
    editingId,
    formData,
    errors,
    handleFieldChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm
  };
};

