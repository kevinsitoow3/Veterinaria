import { useState, useEffect } from 'react';
import { speciesAPI } from '../services/api';

export const useSpecies = () => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_de_especie: ''
  });

  useEffect(() => {
    fetchSpecies();
  }, []);

  const fetchSpecies = async () => {
    setLoading(true);
    try {
      const data = await speciesAPI.getAll();
      setSpecies(data);
    } catch (error) {
      console.error('Error fetching species:', error);
      alert('Error al cargar las especies');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await speciesAPI.update(editingId, formData);
        alert('Especie actualizada exitosamente');
      } else {
        await speciesAPI.create(formData);
        alert('Especie creada exitosamente');
      }
      resetForm();
      fetchSpecies();
    } catch (error) {
      console.error('Error saving species:', error);
      alert('Error al guardar la especie');
    }
  };

  const handleEdit = (specie) => {
    setEditingId(specie.id_especie);
    setFormData({
      nombre_de_especie: specie.nombre_de_especie
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta especie?')) {
      try {
        await speciesAPI.delete(id);
        alert('Especie eliminada exitosamente');
        fetchSpecies();
      } catch (error) {
        console.error('Error deleting species:', error);
        alert('Error al eliminar la especie');
      }
    }
  };

  const resetForm = () => {
    setFormData({ nombre_de_especie: '' });
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
    species,
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

