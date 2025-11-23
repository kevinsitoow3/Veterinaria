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
    errors,
    handleFieldChange,
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
          <div className="form-group">
            <select
              value={formData.id_dueño}
              onChange={(e) => handleFieldChange('id_dueño', e.target.value)}
              className={errors.id_dueño ? 'error' : ''}
            >
              <option value="">Seleccionar Dueño</option>
              {owners.map((owner) => (
                <option key={owner.id_dueño} value={owner.id_dueño}>
                  {owner.nombre_dueño}
                </option>
              ))}
            </select>
            {errors.id_dueño && <span className="error-message">{errors.id_dueño}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre de la mascota"
              value={formData.nombre_mascota}
              onChange={(e) => handleFieldChange('nombre_mascota', e.target.value)}
              className={errors.nombre_mascota ? 'error' : ''}
            />
            {errors.nombre_mascota && <span className="error-message">{errors.nombre_mascota}</span>}
          </div>
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
            <select
              value={formData.id_raza}
              onChange={(e) => handleFieldChange('id_raza', e.target.value)}
              className={errors.id_raza ? 'error' : ''}
              disabled={!formData.id_especie}
            >
              <option value="">Seleccionar Raza</option>
              {breeds.map((breed) => (
                <option key={breed.id_raza} value={breed.id_raza}>
                  {breed.nombre_raza}
                </option>
              ))}
            </select>
            {errors.id_raza && <span className="error-message">{errors.id_raza}</span>}
          </div>
          <div className="form-group">
            <select
              value={formData.sexo_animal}
              onChange={(e) => handleFieldChange('sexo_animal', e.target.value)}
              className={errors.sexo_animal ? 'error' : ''}
            >
              <option value="">Seleccionar Sexo</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            {errors.sexo_animal && <span className="error-message">{errors.sexo_animal}</span>}
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="Fecha de nacimiento"
              value={formData.fecha_nacimiento}
              onChange={(e) => handleFieldChange('fecha_nacimiento', e.target.value)}
              className={errors.fecha_nacimiento ? 'error' : ''}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.fecha_nacimiento && <span className="error-message">{errors.fecha_nacimiento}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Color"
              value={formData.color}
              onChange={(e) => handleFieldChange('color', e.target.value)}
              className={errors.color ? 'error' : ''}
            />
            {errors.color && <span className="error-message">{errors.color}</span>}
          </div>
          <div className="form-group">
            <select
              value={formData.estado}
              onChange={(e) => handleFieldChange('estado', e.target.value)}
              className={errors.estado ? 'error' : ''}
            >
              <option value="">Seleccionar Estado</option>
              <option value="Saludable">Saludable - Mascota en buen estado de salud</option>
              <option value="En tratamiento">En tratamiento - Mascota bajo tratamiento médico</option>
              <option value="En observación">En observación - Mascota en seguimiento</option>
              <option value="Crítico">Crítico - Estado crítico de salud</option>
              <option value="Recuperándose">Recuperándose - En proceso de recuperación</option>
              <option value="En cuarentena">En cuarentena - Aislada por precaución</option>
              <option value="Fallecido">Fallecido - Mascota fallecida</option>
              <option value="Dado en adopción">Dado en adopción - Ya no está con el dueño original</option>
              <option value="Pendiente de revisión">Pendiente de revisión - Requiere evaluación médica</option>
            </select>
            {errors.estado && <span className="error-message">{errors.estado}</span>}
          </div>
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
