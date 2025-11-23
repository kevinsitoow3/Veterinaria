import { useState, useEffect } from 'react';
import { treatmentsAPI } from '../services/api';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm
  };
};

