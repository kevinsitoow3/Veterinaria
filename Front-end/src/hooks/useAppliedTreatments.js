import { useState, useEffect } from 'react';
import { appliedTreatmentsAPI, clinicalHistoriesAPI, treatmentsAPI } from '../services/api';

export const useAppliedTreatments = () => {
  const [appliedTreatments, setAppliedTreatments] = useState([]);
  const [histories, setHistories] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    id_historia: '',
    id_tratamiento: '',
    cantidad: '',
    precio_aplicado: '',
    total: ''
  });

  useEffect(() => {
    fetchAppliedTreatments();
    fetchHistories();
    fetchTreatments();
  }, []);

  useEffect(() => {
    if (formData.cantidad && formData.precio_aplicado) {
      const total = parseFloat(formData.cantidad) * parseFloat(formData.precio_aplicado);
      setFormData(prev => ({ ...prev, total: total.toFixed(2) }));
    }
  }, [formData.cantidad, formData.precio_aplicado]);

  const fetchAppliedTreatments = async () => {
    setLoading(true);
    try {
      const data = await appliedTreatmentsAPI.getAll();
      setAppliedTreatments(data);
    } catch (error) {
      console.error('Error fetching applied treatments:', error);
      alert('Error al cargar los tratamientos aplicados');
    } finally {
      setLoading(false);
    }
  };

  const fetchHistories = async () => {
    try {
      const data = await clinicalHistoriesAPI.getAll();
      setHistories(data);
    } catch (error) {
      console.error('Error fetching histories:', error);
    }
  };

  const fetchTreatments = async () => {
    try {
      const data = await treatmentsAPI.getAll();
      setTreatments(data);
    } catch (error) {
      console.error('Error fetching treatments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        id_historia: parseInt(formData.id_historia),
        id_tratamiento: parseInt(formData.id_tratamiento),
        cantidad: parseFloat(formData.cantidad),
        precio_aplicado: parseFloat(formData.precio_aplicado),
        total: parseFloat(formData.total)
      };
      if (editingId) {
        await appliedTreatmentsAPI.update(editingId, submitData);
        alert('Tratamiento aplicado actualizado exitosamente');
      } else {
        await appliedTreatmentsAPI.create(submitData);
        alert('Tratamiento aplicado creado exitosamente');
      }
      resetForm();
      fetchAppliedTreatments();
    } catch (error) {
      console.error('Error saving applied treatment:', error);
      alert('Error al guardar el tratamiento aplicado');
    }
  };

  const handleEdit = (appliedTreatment) => {
    setEditingId(appliedTreatment.id_aplicacion);
    setFormData({
      id_historia: appliedTreatment.id_historia,
      id_tratamiento: appliedTreatment.id_tratamiento,
      cantidad: appliedTreatment.cantidad,
      precio_aplicado: appliedTreatment.precio_aplicado,
      total: appliedTreatment.total
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este tratamiento aplicado?')) {
      try {
        await appliedTreatmentsAPI.delete(id);
        alert('Tratamiento aplicado eliminado exitosamente');
        fetchAppliedTreatments();
      } catch (error) {
        console.error('Error deleting applied treatment:', error);
        alert('Error al eliminar el tratamiento aplicado');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id_historia: '',
      id_tratamiento: '',
      cantidad: '',
      precio_aplicado: '',
      total: ''
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

  const getTreatmentName = (treatmentId) => {
    const treatment = treatments.find(t => t.id_tratamiento === treatmentId);
    return treatment ? treatment.nombre_tratamiento : 'N/A';
  };

  const handleTreatmentChange = (treatmentId) => {
    const treatment = treatments.find(t => t.id_tratamiento === parseInt(treatmentId));
    setFormData(prev => ({
      ...prev,
      id_tratamiento: treatmentId,
      precio_aplicado: treatment ? treatment.precio_tratamiento : ''
    }));
  };

  return {
    appliedTreatments,
    histories,
    treatments,
    loading,
    showForm,
    editingId,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm,
    getTreatmentName,
    handleTreatmentChange
  };
};

