import React from 'react';
import { useServices } from '../hooks/useServices';
import '../styles/Services.css';

const Services = () => {
  const {
    services,
    loading,
    showForm,
    editingId,
    formData,
    setFormData,
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
          <input
            type="text"
            placeholder="Nombre del servicio"
            value={formData.nombre_servicio}
            onChange={(e) => setFormData({ ...formData, nombre_servicio: e.target.value })}
            required
          />
          <textarea
            placeholder="Descripción"
            value={formData.descripcion_servicio}
            onChange={(e) => setFormData({ ...formData, descripcion_servicio: e.target.value })}
            required
            rows="3"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            value={formData.precio_servicio}
            onChange={(e) => setFormData({ ...formData, precio_servicio: e.target.value })}
            required
          />
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
              <p className="price">💰 ${parseFloat(service.precio_servicio).toFixed(2)}</p>
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
