import React, { useState } from 'react';
import { useClinicalHistories } from '../hooks/useClinicalHistories';
import { formatNumberWithDecimals } from '../utils/formatNumber';
import '../styles/ClinicalHistories.css';

const ClinicalHistories = () => {
  const {
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
  } = useClinicalHistories();

  const [displayPeso, setDisplayPeso] = useState('');
  const [displayTemperatura, setDisplayTemperatura] = useState('');

  const handlePesoChange = (e) => {
    const value = e.target.value;
    // Permitir números y un punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setDisplayPeso(value);
      handleFieldChange('peso_kg_animal', value);
    }
  };

  const handleTemperaturaChange = (e) => {
    const value = e.target.value;
    // Permitir números y un punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setDisplayTemperatura(value);
      handleFieldChange('temperatura_animal', value);
    }
  };

  const handlePesoBlur = () => {
    if (formData.peso_kg_animal) {
      setDisplayPeso(formatNumberWithDecimals(formData.peso_kg_animal));
    }
  };

  const handleTemperaturaBlur = () => {
    if (formData.temperatura_animal) {
      setDisplayTemperatura(formatNumberWithDecimals(formData.temperatura_animal));
    }
  };

  const handlePesoFocus = () => {
    setDisplayPeso(formData.peso_kg_animal || '');
  };

  const handleTemperaturaFocus = () => {
    setDisplayTemperatura(formData.temperatura_animal || '');
  };

  React.useEffect(() => {
    if (formData.peso_kg_animal && !showForm) {
      setDisplayPeso('');
    } else if (formData.peso_kg_animal) {
      setDisplayPeso(formatNumberWithDecimals(formData.peso_kg_animal));
    }
    if (formData.temperatura_animal && !showForm) {
      setDisplayTemperatura('');
    } else if (formData.temperatura_animal) {
      setDisplayTemperatura(formatNumberWithDecimals(formData.temperatura_animal));
    }
  }, [formData.peso_kg_animal, formData.temperatura_animal, showForm]);

  return (
    <div className="clinical-histories-container">
      <div className="section-header">
        <h2>Historiales Clínicos</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nuevo Historial'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Mascota *</label>
            <select
              value={formData.id_mascota}
              onChange={(e) => handleFieldChange('id_mascota', e.target.value)}
              className={errors.id_mascota ? 'error' : ''}
            >
              <option value="">Seleccionar Mascota</option>
              {pets.map((pet) => (
                <option key={pet.id_mascota} value={pet.id_mascota}>
                  {pet.nombre_mascota}
                </option>
              ))}
            </select>
            {errors.id_mascota && <span className="error-message">{errors.id_mascota}</span>}
          </div>
          <div className="form-group">
            <label>Veterinario *</label>
            <select
              value={formData.id_veterinario}
              onChange={(e) => handleFieldChange('id_veterinario', e.target.value)}
              className={errors.id_veterinario ? 'error' : ''}
              disabled={!!formData.id_cita}
            >
              <option value="">Seleccionar Veterinario</option>
              {veterinarians.map((vet) => (
                <option key={vet.id_veterinario} value={vet.id_veterinario}>
                  {vet.nombre_veterinario}
                </option>
              ))}
            </select>
            {formData.id_cita && <small style={{color: '#666', fontSize: '0.875rem'}}>Seleccionado automáticamente desde la cita</small>}
            {errors.id_veterinario && <span className="error-message">{errors.id_veterinario}</span>}
          </div>
          <div className="form-group">
            <label>Cita *</label>
            <select
              value={formData.id_cita}
              onChange={(e) => handleFieldChange('id_cita', e.target.value)}
              className={errors.id_cita ? 'error' : ''}
            >
              <option value="">Seleccionar Cita</option>
              {quotes.map((quote) => (
                <option key={quote.id_cita} value={quote.id_cita}>
                  Cita #{quote.id_cita}
                </option>
              ))}
            </select>
            {errors.id_cita && <span className="error-message">{errors.id_cita}</span>}
          </div>
          <div className="form-group">
            <label>Peso (kg) *</label>
            <input
              type="text"
              placeholder="Ej: 5.5, 26.2, 45.0"
              value={displayPeso}
              onChange={handlePesoChange}
              onBlur={handlePesoBlur}
              onFocus={handlePesoFocus}
              className={errors.peso_kg_animal ? 'error' : ''}
            />
            {errors.peso_kg_animal && <span className="error-message">{errors.peso_kg_animal}</span>}
          </div>
          <div className="form-group">
            <label>Temperatura (°C) *</label>
            <input
              type="text"
              placeholder="Ej: 37.5, 38.4, 37.8"
              value={displayTemperatura}
              onChange={handleTemperaturaChange}
              onBlur={handleTemperaturaBlur}
              onFocus={handleTemperaturaFocus}
              className={errors.temperatura_animal ? 'error' : ''}
            />
            {errors.temperatura_animal && <span className="error-message">{errors.temperatura_animal}</span>}
          </div>
          <div className="form-group">
            <label>Síntomas *</label>
            <textarea
              placeholder="Ej: Letargo, pérdida de apetito, vómitos ocasionales"
              value={formData.sintomas}
              onChange={(e) => handleFieldChange('sintomas', e.target.value)}
              className={errors.sintomas ? 'error' : ''}
              rows="3"
            />
            {errors.sintomas && <span className="error-message">{errors.sintomas}</span>}
          </div>
          <div className="form-group">
            <label>Diagnóstico *</label>
            <textarea
              placeholder="Ej: Infección bacteriana leve, requiere tratamiento antibiótico"
              value={formData.diagnostico}
              onChange={(e) => handleFieldChange('diagnostico', e.target.value)}
              className={errors.diagnostico ? 'error' : ''}
              rows="3"
            />
            {errors.diagnostico && <span className="error-message">{errors.diagnostico}</span>}
          </div>
          <div className="form-group">
            <label>Plan de Tratamiento *</label>
            <textarea
              placeholder="Ej: Administrar antibiótico cada 12 horas durante 7 días"
              value={formData.plan_tratamiento}
              onChange={(e) => handleFieldChange('plan_tratamiento', e.target.value)}
              className={errors.plan_tratamiento ? 'error' : ''}
              rows="3"
            />
            {errors.plan_tratamiento && <span className="error-message">{errors.plan_tratamiento}</span>}
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Historial
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {histories.map((history) => (
            <div key={history.id_historia} className="card">
              <h3>📋 Historial #{history.id_historia}</h3>
              <p>Mascota: {getPetName(history.id_mascota)}</p>
              <p>Veterinario: {getVetName(history.id_veterinario)}</p>
              <p>Peso: {history.peso_kg_animal} kg</p>
              <p>Temperatura: {history.temperatura_animal} °C</p>
              <p><strong>Síntomas:</strong> {history.sintomas}</p>
              <p><strong>Diagnóstico:</strong> {history.diagnostico}</p>
              <p><strong>Plan:</strong> {history.plan_tratamiento}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(history)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(history.id_historia)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicalHistories;
