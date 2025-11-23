import React from 'react';
import { usePets } from '../hooks/usePets';
import '../styles/Pets.css';

const Pets = () => {
  const {
    pets,
    owners,
    species,
    breeds,
    loading,
    showForm,
    editingId,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm,
    getOwnerName,
    getSpeciesName,
    getBreedName
  } = usePets();

  return (
    <div className="pets-container">
      <div className="section-header">
        <h2>Mascotas</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nueva Mascota'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <select
            value={formData.id_dueño}
            onChange={(e) => setFormData({ ...formData, id_dueño: e.target.value })}
            required
          >
            <option value="">Seleccionar Dueño</option>
            {owners.map((owner) => (
              <option key={owner.id_dueño} value={owner.id_dueño}>
                {owner.nombre_dueño}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nombre de la mascota"
            value={formData.nombre_mascota}
            onChange={(e) => setFormData({ ...formData, nombre_mascota: e.target.value })}
            required
          />
          <select
            value={formData.id_especie}
            onChange={(e) => setFormData({ ...formData, id_especie: e.target.value, id_raza: '' })}
            required
          >
            <option value="">Seleccionar Especie</option>
            {species.map((specie) => (
              <option key={specie.id_especie} value={specie.id_especie}>
                {specie.nombre_de_especie}
              </option>
            ))}
          </select>
          <select
            value={formData.id_raza}
            onChange={(e) => setFormData({ ...formData, id_raza: e.target.value })}
            required
            disabled={!formData.id_especie}
          >
            <option value="">Seleccionar Raza</option>
            {breeds.map((breed) => (
              <option key={breed.id_raza} value={breed.id_raza}>
                {breed.nombre_raza}
              </option>
            ))}
          </select>
          <select
            value={formData.sexo_animal}
            onChange={(e) => setFormData({ ...formData, sexo_animal: e.target.value })}
            required
          >
            <option value="">Seleccionar Sexo</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            value={formData.fecha_nacimiento}
            onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Estado"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            required
          />
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Mascota
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {pets.map((pet) => (
            <div key={pet.id_mascota} className="card">
              <h3>{pet.nombre_mascota}</h3>
              <p>Dueño: {getOwnerName(pet.id_dueño)}</p>
              <p>Especie: {getSpeciesName(pet.id_especie)}</p>
              <p>Raza: {getBreedName(pet.id_raza)}</p>
              <p>Sexo: {pet.sexo_animal}</p>
              <p>Color: {pet.color}</p>
              <p>Estado: {pet.estado}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(pet)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(pet.id_mascota)}>
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

export default Pets;
