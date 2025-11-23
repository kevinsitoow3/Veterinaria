import React from 'react';
import { useVeterinarians } from '../hooks/useVeterinarians';
import '../styles/Veterinarians.css';

const Veterinarians = () => {
  const {
    veterinarians,
    loading,
    showForm,
    editingId,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm
  } = useVeterinarians();

  return (
    <div className="veterinarians-container">
      <div className="section-header">
        <h2>Veterinarios</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nuevo Veterinario'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre_veterinario}
            onChange={(e) => setFormData({ ...formData, nombre_veterinario: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={formData.correo_veterinario}
            onChange={(e) => setFormData({ ...formData, correo_veterinario: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={formData.telefono_veterinario}
            onChange={(e) => setFormData({ ...formData, telefono_veterinario: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Especialidad"
            value={formData.especialidad_veterinario}
            onChange={(e) => setFormData({ ...formData, especialidad_veterinario: e.target.value })}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={formData.estado_veterinario}
              onChange={(e) => setFormData({ ...formData, estado_veterinario: e.target.checked })}
            />
            Activo
          </label>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Veterinario
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {veterinarians.map((vet) => (
            <div key={vet.id_veterinario} className="card">
              <h3>{vet.nombre_veterinario}</h3>
              <p>📧 {vet.correo_veterinario}</p>
              <p>📞 {vet.telefono_veterinario}</p>
              <p>Especialidad: {vet.especialidad_veterinario}</p>
              <p>Estado: {vet.estado_veterinario ? '✅ Activo' : '❌ Inactivo'}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(vet)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(vet.id_veterinario)}>
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

export default Veterinarians;
