import { useState, useEffect } from 'react';
import { clinicalHistoriesAPI, petsAPI, veterinariansAPI, quotesAPI } from '../services/api';
import { validations } from '../utils/validations';

export const useClinicalHistories = () => {
  const [histories, setHistories] = useState([]);
  const [pets, setPets] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    id_mascota: '',
    id_veterinario: '',
    id_cita: '',
    peso_kg_animal: '',
    temperatura_animal: '',
    sintomas: '',
    diagnostico: '',
    plan_tratamiento: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchHistories();
    fetchPets();
    fetchVeterinarians();
    fetchQuotes();
  }, []);

  const fetchHistories = async () => {
    setLoading(true);
    try {
      const data = await clinicalHistoriesAPI.getAll();
      setHistories(data);
    } catch (error) {
      console.error('Error fetching histories:', error);
      alert('Error al cargar los historiales');
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

  const fetchQuotes = async () => {
    try {
      const data = await quotesAPI.getAll();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.id_mascota = validations.select(formData.id_mascota, 'una mascota');
    newErrors.id_veterinario = validations.select(formData.id_veterinario, 'un veterinario');
    newErrors.id_cita = validations.select(formData.id_cita, 'una cita');
    newErrors.peso_kg_animal = validations.weight(formData.peso_kg_animal);
    newErrors.temperatura_animal = validations.temperature(formData.temperatura_animal);
    newErrors.sintomas = validations.textMinLength(formData.sintomas, 5, 'Los síntomas');
    newErrors.diagnostico = validations.textMinLength(formData.diagnostico, 5, 'El diagnóstico');
    newErrors.plan_tratamiento = validations.textMinLength(formData.plan_tratamiento, 5, 'El plan de tratamiento');
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleFieldChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
    
    // Si se selecciona una cita, automáticamente llenar el veterinario y la mascota
    if (field === 'id_cita' && value) {
      const selectedQuote = quotes.find(q => q.id_cita === parseInt(value));
      if (selectedQuote) {
        updatedFormData.id_veterinario = selectedQuote.id_veterinario.toString();
        updatedFormData.id_mascota = selectedQuote.id_mascota.toString();
      }
    }
    
    setFormData(updatedFormData);
    
    if (errors[field]) {
      let error = '';
      switch (field) {
        case 'id_mascota':
          error = validations.select(updatedFormData.id_mascota, 'una mascota');
          break;
        case 'id_veterinario':
          error = validations.select(updatedFormData.id_veterinario, 'un veterinario');
          break;
        case 'id_cita':
          error = validations.select(value, 'una cita');
          break;
        case 'peso_kg_animal':
          error = validations.weight(value);
          break;
        case 'temperatura_animal':
          error = validations.temperature(value);
          break;
        case 'sintomas':
          error = validations.textMinLength(value, 5, 'Los síntomas');
          break;
        case 'diagnostico':
          error = validations.textMinLength(value, 5, 'El diagnóstico');
          break;
        case 'plan_tratamiento':
          error = validations.textMinLength(value, 5, 'El plan de tratamiento');
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
        id_mascota: parseInt(formData.id_mascota),
        id_veterinario: parseInt(formData.id_veterinario),
        id_cita: parseInt(formData.id_cita),
        peso_kg_animal: parseFloat(formData.peso_kg_animal),
        temperatura_animal: parseFloat(formData.temperatura_animal)
      };
      if (editingId) {
        await clinicalHistoriesAPI.update(editingId, submitData);
        alert('Historial actualizado exitosamente');
      } else {
        await clinicalHistoriesAPI.create(submitData);
        alert('Historial creado exitosamente');
      }
      resetForm();
      fetchHistories();
    } catch (error) {
      console.error('Error saving history:', error);
      alert('Error al guardar el historial');
    }
  };

  const handleEdit = (history) => {
    setEditingId(history.id_historia);
    setFormData({
      id_mascota: history.id_mascota,
      id_veterinario: history.id_veterinario,
      id_cita: history.id_cita,
      peso_kg_animal: history.peso_kg_animal,
      temperatura_animal: history.temperatura_animal,
      sintomas: history.sintomas,
      diagnostico: history.diagnostico,
      plan_tratamiento: history.plan_tratamiento
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este historial?')) {
      try {
        await clinicalHistoriesAPI.delete(id);
        alert('Historial eliminado exitosamente');
        fetchHistories();
      } catch (error) {
        console.error('Error deleting history:', error);
        alert('Error al eliminar el historial');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id_mascota: '',
      id_veterinario: '',
      id_cita: '',
      peso_kg_animal: '',
      temperatura_animal: '',
      sintomas: '',
      diagnostico: '',
      plan_tratamiento: ''
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

  const getPetName = (petId) => {
    const pet = pets.find(p => p.id_mascota === petId);
    return pet ? pet.nombre_mascota : 'N/A';
  };

  const getVetName = (vetId) => {
    const vet = veterinarians.find(v => v.id_veterinario === vetId);
    return vet ? vet.nombre_veterinario : 'N/A';
  };

  return {
    histories,
    pets,
    veterinarians,
    quotes,
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
    getPetName,
    getVetName
  };
};

