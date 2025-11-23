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
    setFormData,
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
          <select
            value={formData.id_especie}
            onChange={(e) => setFormData({ ...formData, id_especie: parseInt(e.target.value) })}
            required
          >
            <option value="">Seleccionar Especie</option>
            {species.map((specie) => (
              <option key={specie.id_especie} value={specie.id_especie}>
                {specie.nombre_de_especie}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nombre de la raza"
            value={formData.nombre_raza}
            onChange={(e) => setFormData({ ...formData, nombre_raza: e.target.value })}
            required
          />
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
