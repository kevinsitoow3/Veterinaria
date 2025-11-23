import { useState, useEffect } from 'react';
import { veterinariansAPI } from '../services/api';

export const useVeterinarians = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_veterinario: '',
    correo_veterinario: '',
    telefono_veterinario: '',
    especialidad_veterinario: '',
    estado_veterinario: true
  });

  useEffect(() => {
    fetchVeterinarians();
  }, []);

  const fetchVeterinarians = async () => {
    setLoading(true);
    try {
      const data = await veterinariansAPI.getAll();
      setVeterinarians(data);
    } catch (error) {
      console.error('Error fetching veterinarians:', error);
      alert('Error al cargar los veterinarios');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await veterinariansAPI.update(editingId, formData);
        alert('Veterinario actualizado exitosamente');
      } else {
        await veterinariansAPI.create(formData);
        alert('Veterinario creado exitosamente');
      }
      resetForm();
      fetchVeterinarians();
    } catch (error) {
      console.error('Error saving veterinarian:', error);
      alert('Error al guardar el veterinario');
    }
  };

  const handleEdit = (vet) => {
    setEditingId(vet.id_veterinario);
    setFormData({
      nombre_veterinario: vet.nombre_veterinario,
      correo_veterinario: vet.correo_veterinario,
      telefono_veterinario: vet.telefono_veterinario,
      especialidad_veterinario: vet.especialidad_veterinario,
      estado_veterinario: vet.estado_veterinario
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este veterinario?')) {
      try {
        await veterinariansAPI.delete(id);
        alert('Veterinario eliminado exitosamente');
        fetchVeterinarians();
      } catch (error) {
        console.error('Error deleting veterinarian:', error);
        alert('Error al eliminar el veterinario');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre_veterinario: '',
      correo_veterinario: '',
      telefono_veterinario: '',
      especialidad_veterinario: '',
      estado_veterinario: true
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
    veterinarians,
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

