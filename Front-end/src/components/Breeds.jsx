import React from 'react';
import { useBreeds } from '../hooks/useBreeds';
import '../styles/Breeds.css';

const Breeds = () => {
  const {
    breeds,
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
    toggleForm,
    getSpeciesName
  } = useBreeds();

  return (
    <div className="breeds-container">
      <div className="section-header">
        <h2>Razas</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nueva Raza'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <select
              value={formData.id_especie}
              onChange={(e) => handleFieldChange('id_especie', e.target.value)}
              className={errors.id_especie ? 'error' : ''}
            >
              <option value="">Seleccionar Especie</option>
              {species.map((specie) => (
                <option key={specie.id_especie} value={specie.id_especie}>
                  {specie.nombre_de_especie}
                </option>
              ))}
            </select>
            {errors.id_especie && <span className="error-message">{errors.id_especie}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre de la raza"
              value={formData.nombre_raza}
              onChange={(e) => handleFieldChange('nombre_raza', e.target.value)}
              className={errors.nombre_raza ? 'error' : ''}
            />
            {errors.nombre_raza && <span className="error-message">{errors.nombre_raza}</span>}
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Raza
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {breeds.map((breed) => (
            <div key={breed.id_raza} className="card">
              <h3>{breed.nombre_raza}</h3>
              <p>Especie: {getSpeciesName(breed.id_especie)}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(breed)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(breed.id_raza)}>
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

export default Breeds;
