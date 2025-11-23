import { useState, useEffect } from 'react';
import { appliedTreatmentsAPI, clinicalHistoriesAPI, treatmentsAPI } from '../services/api';
import { validations } from '../utils/validations';

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAppliedTreatments();
    fetchHistories();
    fetchTreatments();
  }, []);

  useEffect(() => {
    if (formData.cantidad && formData.precio_aplicado) {
      const total = parseFloat(formData.cantidad) * parseFloat(formData.precio_aplicado);
      setFormData(prev => ({ ...prev, total: Math.floor(total).toString() }));
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

  const validateForm = () => {
    const newErrors = {};
    newErrors.id_historia = validations.select(formData.id_historia, 'un historial');
    newErrors.id_tratamiento = validations.select(formData.id_tratamiento, 'un tratamiento');
    newErrors.cantidad = validations.positiveDecimal(formData.cantidad, 'La cantidad');
    newErrors.precio_aplicado = validations.positiveDecimal(formData.precio_aplicado, 'El precio aplicado');
    newErrors.total = validations.positiveDecimal(formData.total, 'El total');
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      let error = '';
      switch (field) {
        case 'id_historia':
          error = validations.select(value, 'un historial');
          break;
        case 'id_tratamiento':
          error = validations.select(value, 'un tratamiento');
          break;
        case 'cantidad':
          error = validations.positiveDecimal(value, 'La cantidad');
          break;
        case 'precio_aplicado':
          error = validations.positiveDecimal(value, 'El precio aplicado');
          break;
        case 'total':
          error = validations.positiveDecimal(value, 'El total');
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

  const getTreatmentName = (treatmentId) => {
    const treatment = treatments.find(t => t.id_tratamiento === treatmentId);
    return treatment ? treatment.nombre_tratamiento : 'N/A';
  };

  const handleTreatmentChange = (treatmentId) => {
    const treatment = treatments.find(t => t.id_tratamiento === parseInt(treatmentId));
    const newFormData = {
      ...formData,
      id_tratamiento: treatmentId,
      precio_aplicado: treatment ? treatment.precio_tratamiento : ''
    };
    setFormData(newFormData);
    // Validar en tiempo real
    if (errors.id_tratamiento) {
      const error = validations.select(treatmentId, 'un tratamiento');
      setErrors({ ...errors, id_tratamiento: error });
    }
  };

  return {
    appliedTreatments,
    histories,
    treatments,
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
    getTreatmentName,
    handleTreatmentChange
  };
};

