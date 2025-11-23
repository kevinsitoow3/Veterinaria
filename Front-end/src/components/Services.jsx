import React from 'react';
import { useServices } from '../hooks/useServices';
import { formatNumber } from '../utils/formatNumber';
import '../styles/Services.css';

const Services = () => {
  const {
    services,
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
  } = useServices();

  return (
    <div className="services-container">
      <div className="section-header">
        <h2>Servicios</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nuevo Servicio'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre del servicio"
              value={formData.nombre_servicio}
              onChange={(e) => handleFieldChange('nombre_servicio', e.target.value)}
              className={errors.nombre_servicio ? 'error' : ''}
            />
            {errors.nombre_servicio && <span className="error-message">{errors.nombre_servicio}</span>}
          </div>
          <div className="form-group">
            <textarea
              placeholder="Descripción"
              value={formData.descripcion_servicio}
              onChange={(e) => handleFieldChange('descripcion_servicio', e.target.value)}
              className={errors.descripcion_servicio ? 'error' : ''}
              rows="3"
            />
            {errors.descripcion_servicio && <span className="error-message">{errors.descripcion_servicio}</span>}
          </div>
          <div className="form-group">
            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              value={formData.precio_servicio}
              onChange={(e) => handleFieldChange('precio_servicio', e.target.value)}
              className={errors.precio_servicio ? 'error' : ''}
            />
            {errors.precio_servicio && <span className="error-message">{errors.precio_servicio}</span>}
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Servicio
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {services.map((service) => (
            <div key={service.id_servicio} className="card">
              <h3>{service.nombre_servicio}</h3>
              <p>{service.descripcion_servicio}</p>
              <p className="price">${formatNumber(service.precio_servicio)}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(service)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(service.id_servicio)}>
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

export default Services;
