import React from 'react';
import { useTreatments } from '../hooks/useTreatments';
import '../styles/Treatments.css';

const Treatments = () => {
  const {
    treatments,
    loading,
    showForm,
    editingId,
    formData,
    setFormData,
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
          <input
            type="text"
            placeholder="Nombre del tratamiento"
            value={formData.nombre_tratamiento}
            onChange={(e) => setFormData({ ...formData, nombre_tratamiento: e.target.value })}
            required
          />
          <textarea
            placeholder="Descripción"
            value={formData.descripcion_tratamiento}
            onChange={(e) => setFormData({ ...formData, descripcion_tratamiento: e.target.value })}
            required
            rows="3"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            value={formData.precio_tratamiento}
            onChange={(e) => setFormData({ ...formData, precio_tratamiento: e.target.value })}
            required
          />
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
              <p className="price">💰 ${parseFloat(treatment.precio_tratamiento).toFixed(2)}</p>
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
