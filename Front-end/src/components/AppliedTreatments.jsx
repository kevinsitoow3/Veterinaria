import React from 'react';
import { useAppliedTreatments } from '../hooks/useAppliedTreatments';
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
    setFormData,
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
          <select
            value={formData.id_historia}
            onChange={(e) => setFormData({ ...formData, id_historia: e.target.value })}
            required
          >
            <option value="">Seleccionar Historial</option>
            {histories.map((history) => (
              <option key={history.id_historia} value={history.id_historia}>
                Historial #{history.id_historia}
              </option>
            ))}
          </select>
          <select
            value={formData.id_tratamiento}
            onChange={(e) => handleTreatmentChange(e.target.value)}
            required
          >
            <option value="">Seleccionar Tratamiento</option>
            {treatments.map((treatment) => (
              <option key={treatment.id_tratamiento} value={treatment.id_tratamiento}>
                {treatment.nombre_tratamiento}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Cantidad"
            value={formData.cantidad}
            onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Precio aplicado"
            value={formData.precio_aplicado}
            onChange={(e) => setFormData({ ...formData, precio_aplicado: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Total"
            value={formData.total}
            onChange={(e) => setFormData({ ...formData, total: e.target.value })}
            required
            readOnly
          />
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
              <p>Precio: ${parseFloat(appliedTreatment.precio_aplicado).toFixed(2)}</p>
              <p className="price">Total: ${parseFloat(appliedTreatment.total).toFixed(2)}</p>
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
