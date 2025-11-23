import React from 'react';
import { useTreatments } from '../hooks/useTreatments';
import { formatNumber } from '../utils/formatNumber';
import '../styles/Treatments.css';

const Treatments = () => {
  const {
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
    toggleForm
  } = useTreatments();

  return (
    <div className="treatments-container">
      <div className="section-header">
        <h2>Tratamientos</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nuevo Tratamiento'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre del tratamiento"
              value={formData.nombre_tratamiento}
              onChange={(e) => handleFieldChange('nombre_tratamiento', e.target.value)}
              className={errors.nombre_tratamiento ? 'error' : ''}
            />
            {errors.nombre_tratamiento && <span className="error-message">{errors.nombre_tratamiento}</span>}
          </div>
          <div className="form-group">
            <textarea
              placeholder="Descripción"
              value={formData.descripcion_tratamiento}
              onChange={(e) => handleFieldChange('descripcion_tratamiento', e.target.value)}
              className={errors.descripcion_tratamiento ? 'error' : ''}
              rows="3"
            />
            {errors.descripcion_tratamiento && <span className="error-message">{errors.descripcion_tratamiento}</span>}
          </div>
          <div className="form-group">
            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              value={formData.precio_tratamiento}
              onChange={(e) => handleFieldChange('precio_tratamiento', e.target.value)}
              className={errors.precio_tratamiento ? 'error' : ''}
            />
            {errors.precio_tratamiento && <span className="error-message">{errors.precio_tratamiento}</span>}
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Tratamiento
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {treatments.map((treatment) => (
            <div key={treatment.id_tratamiento} className="card">
              <h3>{treatment.nombre_tratamiento}</h3>
              <p>{treatment.descripcion_tratamiento}</p>
              <p className="price">${formatNumber(treatment.precio_tratamiento)}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(treatment)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(treatment.id_tratamiento)}>
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

export default Treatments;
