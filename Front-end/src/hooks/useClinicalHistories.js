import { useState, useEffect } from 'react';
import { clinicalHistoriesAPI, petsAPI, veterinariansAPI, quotesAPI } from '../services/api';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm,
    getPetName,
    getVetName
  };
};

