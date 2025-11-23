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
    errors,
    setFormData,
    handleFieldChange,
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
          <div className="form-group">
            <label>Nombre del Veterinario *</label>
            <input
              type="text"
              placeholder="Ej: Dr. Carlos Rodríguez"
              value={formData.nombre_veterinario}
              onChange={(e) => handleFieldChange('nombre_veterinario', e.target.value)}
              className={errors.nombre_veterinario ? 'error' : ''}
            />
            {errors.nombre_veterinario && <span className="error-message">{errors.nombre_veterinario}</span>}
          </div>
          <div className="form-group">
            <label>Correo Electrónico *</label>
            <input
              type="email"
              placeholder="Ej: carlos.rodriguez@clinicavet.com"
              value={formData.correo_veterinario}
              onChange={(e) => handleFieldChange('correo_veterinario', e.target.value)}
              className={errors.correo_veterinario ? 'error' : ''}
            />
            {errors.correo_veterinario && <span className="error-message">{errors.correo_veterinario}</span>}
          </div>
          <div className="form-group">
            <label>Teléfono *</label>
            <input
              type="tel"
              placeholder="Ej: +57 300 1234567"
              value={formData.telefono_veterinario}
              onChange={(e) => handleFieldChange('telefono_veterinario', e.target.value)}
              className={errors.telefono_veterinario ? 'error' : ''}
            />
            {errors.telefono_veterinario && <span className="error-message">{errors.telefono_veterinario}</span>}
          </div>
          <div className="form-group">
            <label>Especialidad *</label>
            <input
              type="text"
              placeholder="Ej: Cirugía, Medicina General, Cardiología"
              value={formData.especialidad_veterinario}
              onChange={(e) => handleFieldChange('especialidad_veterinario', e.target.value)}
              className={errors.especialidad_veterinario ? 'error' : ''}
            />
            {errors.especialidad_veterinario && <span className="error-message">{errors.especialidad_veterinario}</span>}
          </div>
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
