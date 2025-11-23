import { useState, useEffect } from 'react';
import { ownersAPI } from '../services/api';
import { validations } from '../utils/validations';

export const useOwners = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_dueño: '',
    telefono_dueño: '',
    correo_dueño: '',
    direccion_dueño: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    setLoading(true);
    try {
      const data = await ownersAPI.getAll();
      setOwners(data);
    } catch (error) {
      console.error('Error fetching owners:', error);
      alert('Error al cargar los dueños');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    newErrors.nombre_dueño = validations.name(formData.nombre_dueño);
    newErrors.telefono_dueño = validations.phone(formData.telefono_dueño);
    newErrors.correo_dueño = validations.email(formData.correo_dueño);
    newErrors.direccion_dueño = validations.address(formData.direccion_dueño);
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Validar en tiempo real
    if (errors[field]) {
      let error = '';
      switch (field) {
        case 'nombre_dueño':
          error = validations.name(value);
          break;
        case 'telefono_dueño':
          error = validations.phone(value);
          break;
        case 'correo_dueño':
          error = validations.email(value);
          break;
        case 'direccion_dueño':
          error = validations.address(value);
          break;
        default:
          break;
      }
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (editingId) {
        await ownersAPI.update(editingId, formData);
        alert('Dueño actualizado exitosamente');
      } else {
        await ownersAPI.create(formData);
        alert('Dueño creado exitosamente');
      }
      resetForm();
      fetchOwners();
    } catch (error) {
      console.error('Error saving owner:', error);
      alert('Error al guardar el dueño');
    }
  };

  const handleEdit = (owner) => {
    setEditingId(owner.id_dueño);
    setFormData({
      nombre_dueño: owner.nombre_dueño,
      telefono_dueño: owner.telefono_dueño,
      correo_dueño: owner.correo_dueño,
      direccion_dueño: owner.direccion_dueño
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este dueño?')) {
      try {
        await ownersAPI.delete(id);
        alert('Dueño eliminado exitosamente');
        fetchOwners();
      } catch (error) {
        console.error('Error deleting owner:', error);
        alert('Error al eliminar el dueño');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre_dueño: '',
      telefono_dueño: '',
      correo_dueño: '',
      direccion_dueño: ''
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
    owners,
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

