import React from 'react';
import { useOwners } from '../hooks/useOwners';
import '../styles/Owners.css';

const Owners = () => {
  const {
    owners,
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
  } = useOwners();

  return (
    <div className="owners-container">
      <div className="section-header">
        <h2>Dueños</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nuevo Dueño'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre_dueño}
              onChange={(e) => handleFieldChange('nombre_dueño', e.target.value)}
              className={errors.nombre_dueño ? 'error' : ''}
            />
            {errors.nombre_dueño && <span className="error-message">{errors.nombre_dueño}</span>}
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Teléfono"
              value={formData.telefono_dueño}
              onChange={(e) => handleFieldChange('telefono_dueño', e.target.value)}
              className={errors.telefono_dueño ? 'error' : ''}
            />
            {errors.telefono_dueño && <span className="error-message">{errors.telefono_dueño}</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Correo"
              value={formData.correo_dueño}
              onChange={(e) => handleFieldChange('correo_dueño', e.target.value)}
              className={errors.correo_dueño ? 'error' : ''}
            />
            {errors.correo_dueño && <span className="error-message">{errors.correo_dueño}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Dirección"
              value={formData.direccion_dueño}
              onChange={(e) => handleFieldChange('direccion_dueño', e.target.value)}
              className={errors.direccion_dueño ? 'error' : ''}
            />
            {errors.direccion_dueño && <span className="error-message">{errors.direccion_dueño}</span>}
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Dueño
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {owners.map((owner) => (
            <div key={owner.id_dueño} className="card">
              <h3>{owner.nombre_dueño}</h3>
              <p>📞 {owner.telefono_dueño}</p>
              <p>📧 {owner.correo_dueño}</p>
              <p>📍 {owner.direccion_dueño}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(owner)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(owner.id_dueño)}>
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

export default Owners;
