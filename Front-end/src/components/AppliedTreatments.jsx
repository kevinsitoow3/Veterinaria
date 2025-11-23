import React from 'react';
import { useAppliedTreatments } from '../hooks/useAppliedTreatments';
import { formatNumber } from '../utils/formatNumber';
import '../styles/AppliedTreatments.css';

const AppliedTreatments = () => {
  const {
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
  } = useAppliedTreatments();

  return (
    <div className="applied-treatments-container">
      <div className="section-header">
        <h2>Tratamientos Aplicados</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nuevo Tratamiento Aplicado'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <select
              value={formData.id_historia}
              onChange={(e) => handleFieldChange('id_historia', e.target.value)}
              className={errors.id_historia ? 'error' : ''}
            >
              <option value="">Seleccionar Historial</option>
              {histories.map((history) => (
                <option key={history.id_historia} value={history.id_historia}>
                  Historial #{history.id_historia}
                </option>
              ))}
            </select>
            {errors.id_historia && <span className="error-message">{errors.id_historia}</span>}
          </div>
          <div className="form-group">
            <select
              value={formData.id_tratamiento}
              onChange={(e) => handleTreatmentChange(e.target.value)}
              className={errors.id_tratamiento ? 'error' : ''}
            >
              <option value="">Seleccionar Tratamiento</option>
              {treatments.map((treatment) => (
                <option key={treatment.id_tratamiento} value={treatment.id_tratamiento}>
                  {treatment.nombre_tratamiento}
                </option>
              ))}
            </select>
            {errors.id_tratamiento && <span className="error-message">{errors.id_tratamiento}</span>}
          </div>
          <div className="form-group">
            <input
              type="number"
              step="0.01"
              placeholder="Cantidad"
              value={formData.cantidad}
              onChange={(e) => handleFieldChange('cantidad', e.target.value)}
              className={errors.cantidad ? 'error' : ''}
            />
            {errors.cantidad && <span className="error-message">{errors.cantidad}</span>}
          </div>
          <div className="form-group">
            <input
              type="number"
              step="0.01"
              placeholder="Precio aplicado"
              value={formData.precio_aplicado}
              onChange={(e) => handleFieldChange('precio_aplicado', e.target.value)}
              className={errors.precio_aplicado ? 'error' : ''}
            />
            {errors.precio_aplicado && <span className="error-message">{errors.precio_aplicado}</span>}
          </div>
          <div className="form-group">
            <input
              type="number"
              step="1"
              placeholder="Total"
              value={formData.total ? Math.floor(parseFloat(formData.total)) : ''}
              onChange={(e) => handleFieldChange('total', e.target.value)}
              className={errors.total ? 'error' : ''}
              readOnly
            />
            {errors.total && <span className="error-message">{errors.total}</span>}
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Tratamiento Aplicado
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {appliedTreatments.map((appliedTreatment) => (
            <div key={appliedTreatment.id_aplicacion} className="card">
              <h3>💉 Aplicación #{appliedTreatment.id_aplicacion}</h3>
              <p>Historial: #{appliedTreatment.id_historia}</p>
              <p>Tratamiento: {getTreatmentName(appliedTreatment.id_tratamiento)}</p>
              <p>Cantidad: {appliedTreatment.cantidad}</p>
              <p>Precio: ${formatNumber(appliedTreatment.precio_aplicado)}</p>
              <p className="price">Total: ${formatNumber(appliedTreatment.total)}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(appliedTreatment)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(appliedTreatment.id_aplicacion)}>
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

export default AppliedTreatments;
