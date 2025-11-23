import React from 'react';
import { useClinicalHistories } from '../hooks/useClinicalHistories';
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
            <input
              type="number"
              step="0.1"
              placeholder="Peso (kg)"
              value={formData.peso_kg_animal}
              onChange={(e) => handleFieldChange('peso_kg_animal', e.target.value)}
              className={errors.peso_kg_animal ? 'error' : ''}
            />
            {errors.peso_kg_animal && <span className="error-message">{errors.peso_kg_animal}</span>}
          </div>
          <div className="form-group">
            <input
              type="number"
              step="0.1"
              placeholder="Temperatura (°C)"
              value={formData.temperatura_animal}
              onChange={(e) => handleFieldChange('temperatura_animal', e.target.value)}
              className={errors.temperatura_animal ? 'error' : ''}
            />
            {errors.temperatura_animal && <span className="error-message">{errors.temperatura_animal}</span>}
          </div>
          <div className="form-group">
            <textarea
              placeholder="Síntomas"
              value={formData.sintomas}
              onChange={(e) => handleFieldChange('sintomas', e.target.value)}
              className={errors.sintomas ? 'error' : ''}
              rows="3"
            />
            {errors.sintomas && <span className="error-message">{errors.sintomas}</span>}
          </div>
          <div className="form-group">
            <textarea
              placeholder="Diagnóstico"
              value={formData.diagnostico}
              onChange={(e) => handleFieldChange('diagnostico', e.target.value)}
              className={errors.diagnostico ? 'error' : ''}
              rows="3"
            />
            {errors.diagnostico && <span className="error-message">{errors.diagnostico}</span>}
          </div>
          <div className="form-group">
            <textarea
              placeholder="Plan de tratamiento"
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
