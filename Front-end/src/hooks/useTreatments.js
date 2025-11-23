import { useState, useEffect } from 'react';
import { treatmentsAPI } from '../services/api';
import { validations } from '../utils/validations';

export const useTreatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_tratamiento: '',
    descripcion_tratamiento: '',
    precio_tratamiento: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    setLoading(true);
    try {
      const data = await treatmentsAPI.getAll();
      setTreatments(data);
    } catch (error) {
      console.error('Error fetching treatments:', error);
      alert('Error al cargar los tratamientos');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.nombre_tratamiento = validations.textOnlyMinLength(formData.nombre_tratamiento, 3, 'El nombre del tratamiento');
    newErrors.descripcion_tratamiento = validations.description(formData.descripcion_tratamiento, 'La descripción');
    newErrors.precio_tratamiento = validations.positiveDecimal(formData.precio_tratamiento, 'El precio', 100, true);
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      let error = '';
      switch (field) {
        case 'nombre_tratamiento':
          error = validations.textOnlyMinLength(value, 3, 'El nombre del tratamiento');
          break;
        case 'descripcion_tratamiento':
          error = validations.description(value, 'La descripción');
          break;
        case 'precio_tratamiento':
          error = validations.positiveDecimal(value, 'El precio', 100, true);
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
        precio_tratamiento: parseFloat(formData.precio_tratamiento)
      };
      if (editingId) {
        await treatmentsAPI.update(editingId, submitData);
        alert('Tratamiento actualizado exitosamente');
      } else {
        await treatmentsAPI.create(submitData);
        alert('Tratamiento creado exitosamente');
      }
      resetForm();
      fetchTreatments();
    } catch (error) {
      console.error('Error saving treatment:', error);
      alert('Error al guardar el tratamiento');
    }
  };

  const handleEdit = (treatment) => {
    setEditingId(treatment.id_tratamiento);
    setFormData({
      nombre_tratamiento: treatment.nombre_tratamiento,
      descripcion_tratamiento: treatment.descripcion_tratamiento,
      precio_tratamiento: treatment.precio_tratamiento
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este tratamiento?')) {
      try {
        await treatmentsAPI.delete(id);
        alert('Tratamiento eliminado exitosamente');
        fetchTreatments();
      } catch (error) {
        console.error('Error deleting treatment:', error);
        alert('Error al eliminar el tratamiento');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre_tratamiento: '',
      descripcion_tratamiento: '',
      precio_tratamiento: ''
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
    treatments,
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

