import React from 'react';
import { useSpecies } from '../hooks/useSpecies';
import '../styles/Species.css';

const Species = () => {
  const {
    species,
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
  } = useSpecies();

  return (
    <div className="species-container">
      <div className="section-header">
        <h2>Especies</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nueva Especie'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de la Especie *</label>
            <input
              type="text"
              placeholder="Ej: Canino, Felino, Aves"
              value={formData.nombre_de_especie}
              onChange={(e) => handleFieldChange('nombre_de_especie', e.target.value)}
              className={errors.nombre_de_especie ? 'error' : ''}
            />
            {errors.nombre_de_especie && <span className="error-message">{errors.nombre_de_especie}</span>}
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Especie
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {species.map((specie) => (
            <div key={specie.id_especie} className="card">
              <h3>{specie.nombre_de_especie}</h3>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(specie)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(specie.id_especie)}>
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

export default Species;
