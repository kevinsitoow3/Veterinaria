import { useState, useEffect } from 'react';
import { veterinariansAPI } from '../services/api';
import { validations } from '../utils/validations';

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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    newErrors.nombre_veterinario = validations.name(formData.nombre_veterinario);
    newErrors.correo_veterinario = validations.email(formData.correo_veterinario);
    newErrors.telefono_veterinario = validations.phone(formData.telefono_veterinario);
    newErrors.especialidad_veterinario = validations.textOnly(formData.especialidad_veterinario, 'La especialidad');
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      let error = '';
      switch (field) {
        case 'nombre_veterinario':
          error = validations.name(value);
          break;
        case 'correo_veterinario':
          error = validations.email(value);
          break;
        case 'telefono_veterinario':
          error = validations.phone(value);
          break;
        case 'especialidad_veterinario':
          error = validations.textOnly(value, 'La especialidad');
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
    veterinarians,
    loading,
    showForm,
    editingId,
    formData,
    errors,
    setFormData,
    handleFieldChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm
  };
};

