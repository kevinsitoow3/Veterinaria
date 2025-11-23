import { useState, useEffect } from 'react';
import { roomsAPI } from '../services/api';

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_sala: ''
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const data = await roomsAPI.getAll();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      alert('Error al cargar las salas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await roomsAPI.update(editingId, formData);
        alert('Sala actualizada exitosamente');
      } else {
        await roomsAPI.create(formData);
        alert('Sala creada exitosamente');
      }
      resetForm();
      fetchRooms();
    } catch (error) {
      console.error('Error saving room:', error);
      alert('Error al guardar la sala');
    }
  };

  const handleEdit = (room) => {
    setEditingId(room.id_sala);
    setFormData({
      nombre_sala: room.nombre_sala
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta sala?')) {
      try {
        await roomsAPI.delete(id);
        alert('Sala eliminada exitosamente');
        fetchRooms();
      } catch (error) {
        console.error('Error deleting room:', error);
        alert('Error al eliminar la sala');
      }
    }
  };

  const resetForm = () => {
    setFormData({ nombre_sala: '' });
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
    rooms,
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

