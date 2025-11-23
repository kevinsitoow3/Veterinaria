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
    setFormData,
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
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre_dueño}
            onChange={(e) => setFormData({ ...formData, nombre_dueño: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={formData.telefono_dueño}
            onChange={(e) => setFormData({ ...formData, telefono_dueño: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={formData.correo_dueño}
            onChange={(e) => setFormData({ ...formData, correo_dueño: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Dirección"
            value={formData.direccion_dueño}
            onChange={(e) => setFormData({ ...formData, direccion_dueño: e.target.value })}
            required
          />
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
