import { useState, useEffect } from 'react';
import { petsAPI, ownersAPI, speciesAPI, breedsAPI } from '../services/api';
import { validations } from '../utils/validations';

export const usePets = () => {
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    id_dueño: '',
    nombre_mascota: '',
    id_especie: '',
    id_raza: '',
    sexo_animal: '',
    fecha_nacimiento: '',
    color: '',
    estado: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPets();
    fetchOwners();
    fetchSpecies();
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (formData.id_especie) {
      fetchBreeds();
    }
  }, [formData.id_especie]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const data = await petsAPI.getAll();
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
      alert('Error al cargar las mascotas');
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    try {
      const data = await ownersAPI.getAll();
      setOwners(data);
    } catch (error) {
      console.error('Error fetching owners:', error);
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

  const fetchBreeds = async () => {
    try {
      const data = await breedsAPI.getAll();
      setBreeds(data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.id_dueño = validations.select(formData.id_dueño, 'un dueño');
    newErrors.nombre_mascota = validations.name(formData.nombre_mascota);
    newErrors.id_especie = validations.select(formData.id_especie, 'una especie');
    newErrors.id_raza = validations.select(formData.id_raza, 'una raza');
    newErrors.sexo_animal = validations.gender(formData.sexo_animal);
    newErrors.fecha_nacimiento = validations.date(formData.fecha_nacimiento, 'La fecha de nacimiento');
    newErrors.color = validations.color(formData.color);
    newErrors.estado = validations.petStatus(formData.estado);
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleFieldChange = (field, value) => {
    if (field === 'id_especie') {
      setFormData({ ...formData, [field]: value, id_raza: '' });
    } else {
      setFormData({ ...formData, [field]: value });
    }
    if (errors[field]) {
      let error = '';
      switch (field) {
        case 'id_dueño':
          error = validations.select(value, 'un dueño');
          break;
        case 'nombre_mascota':
          error = validations.name(value);
          break;
        case 'id_especie':
          error = validations.select(value, 'una especie');
          break;
        case 'id_raza':
          error = validations.select(value, 'una raza');
          break;
        case 'sexo_animal':
          error = validations.gender(value);
          break;
        case 'fecha_nacimiento':
          error = validations.date(value, 'La fecha de nacimiento');
          break;
        case 'color':
          error = validations.color(value);
          break;
        case 'estado':
          error = validations.petStatus(value);
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
        id_dueño: parseInt(formData.id_dueño),
        id_especie: parseInt(formData.id_especie),
        id_raza: parseInt(formData.id_raza)
      };
      if (editingId) {
        await petsAPI.update(editingId, submitData);
        alert('Mascota actualizada exitosamente');
      } else {
        await petsAPI.create(submitData);
        alert('Mascota creada exitosamente');
      }
      resetForm();
      fetchPets();
    } catch (error) {
      console.error('Error saving pet:', error);
      alert('Error al guardar la mascota');
    }
  };

  const handleEdit = (pet) => {
    setEditingId(pet.id_mascota);
    setFormData({
      id_dueño: pet.id_dueño,
      nombre_mascota: pet.nombre_mascota,
      id_especie: pet.id_especie,
      id_raza: pet.id_raza,
      sexo_animal: pet.sexo_animal,
      fecha_nacimiento: pet.fecha_nacimiento,
      color: pet.color,
      estado: pet.estado
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta mascota?')) {
      try {
        await petsAPI.delete(id);
        alert('Mascota eliminada exitosamente');
        fetchPets();
      } catch (error) {
        console.error('Error deleting pet:', error);
        alert('Error al eliminar la mascota');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id_dueño: '',
      nombre_mascota: '',
      id_especie: '',
      id_raza: '',
      sexo_animal: '',
      fecha_nacimiento: '',
      color: '',
      estado: ''
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

  const getOwnerName = (ownerId) => {
    const owner = owners.find(o => o.id_dueño === ownerId);
    return owner ? owner.nombre_dueño : 'N/A';
  };

  const getSpeciesName = (speciesId) => {
    const specie = species.find(s => s.id_especie === speciesId);
    return specie ? specie.nombre_de_especie : 'N/A';
  };

  const getBreedName = (breedId) => {
    const breed = breeds.find(b => b.id_raza === breedId);
    return breed ? breed.nombre_raza : 'N/A';
  };

  const filteredBreeds = breeds.filter(b => b.id_especie === parseInt(formData.id_especie));

  return {
    pets,
    owners,
    species,
    breeds: filteredBreeds,
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
    getOwnerName,
    getSpeciesName,
    getBreedName
  };
};

