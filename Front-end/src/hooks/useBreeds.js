import { useState, useEffect } from 'react';
import { breedsAPI, speciesAPI } from '../services/api';
import { validations } from '../utils/validations';

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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    newErrors.id_especie = validations.select(formData.id_especie, 'una especie');
    newErrors.nombre_raza = validations.textOnly(formData.nombre_raza, 'El nombre de la raza');
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      let error = '';
      if (field === 'id_especie') {
        error = validations.select(value, 'una especie');
      } else if (field === 'nombre_raza') {
        error = validations.textOnly(value, 'El nombre de la raza');
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
    errors,
    handleFieldChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm,
    getSpeciesName
  };
};

