import { useState, useEffect } from 'react';
import { breedsAPI, speciesAPI } from '../services/api';

export const useBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    id_especie: '',
    nombre_raza: ''
  });

  useEffect(() => {
    fetchBreeds();
    fetchSpecies();
  }, []);

  const fetchBreeds = async () => {
    setLoading(true);
    try {
      const data = await breedsAPI.getAll();
      setBreeds(data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
      alert('Error al cargar las razas');
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecies = async () => {
    try {
      const data = await speciesAPI.getAll();
      setSpecies(data);
    } catch (error) {
      console.error('Error fetching species:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        id_especie: parseInt(formData.id_especie)
      };
      if (editingId) {
        await breedsAPI.update(editingId, submitData);
        alert('Raza actualizada exitosamente');
      } else {
        await breedsAPI.create(submitData);
        alert('Raza creada exitosamente');
      }
      resetForm();
      fetchBreeds();
    } catch (error) {
      console.error('Error saving breed:', error);
      alert('Error al guardar la raza');
    }
  };

  const handleEdit = (breed) => {
    setEditingId(breed.id_raza);
    setFormData({
      id_especie: breed.id_especie,
      nombre_raza: breed.nombre_raza
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta raza?')) {
      try {
        await breedsAPI.delete(id);
        alert('Raza eliminada exitosamente');
        fetchBreeds();
      } catch (error) {
        console.error('Error deleting breed:', error);
        alert('Error al eliminar la raza');
      }
    }
  };

  const resetForm = () => {
    setFormData({ id_especie: '', nombre_raza: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      resetForm();
    }
  };

  const getSpeciesName = (speciesId) => {
    const specie = species.find(s => s.id_especie === speciesId);
    return specie ? specie.nombre_de_especie : 'N/A';
  };

  return {
    breeds,
    species,
    loading,
    showForm,
    editingId,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm,
    getSpeciesName
  };
};

