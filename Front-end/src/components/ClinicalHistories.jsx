import React from 'react';
import { useClinicalHistories } from '../hooks/useClinicalHistories';
import '../styles/ClinicalHistories.css';

const ClinicalHistories = () => {
  const {
    histories,
    pets,
    veterinarians,
    quotes,
    loading,
    showForm,
    editingId,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm,
    getPetName,
    getVetName
  } = useClinicalHistories();

  return (
    <div className="clinical-histories-container">
      <div className="section-header">
        <h2>Historiales Clínicos</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nuevo Historial'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <select
            value={formData.id_mascota}
            onChange={(e) => setFormData({ ...formData, id_mascota: e.target.value })}
            required
          >
            <option value="">Seleccionar Mascota</option>
            {pets.map((pet) => (
              <option key={pet.id_mascota} value={pet.id_mascota}>
                {pet.nombre_mascota}
              </option>
            ))}
          </select>
          <select
            value={formData.id_veterinario}
            onChange={(e) => setFormData({ ...formData, id_veterinario: e.target.value })}
            required
          >
            <option value="">Seleccionar Veterinario</option>
            {veterinarians.map((vet) => (
              <option key={vet.id_veterinario} value={vet.id_veterinario}>
                {vet.nombre_veterinario}
              </option>
            ))}
          </select>
          <select
            value={formData.id_cita}
            onChange={(e) => setFormData({ ...formData, id_cita: e.target.value })}
            required
          >
            <option value="">Seleccionar Cita</option>
            {quotes.map((quote) => (
              <option key={quote.id_cita} value={quote.id_cita}>
                Cita #{quote.id_cita}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.1"
            placeholder="Peso (kg)"
            value={formData.peso_kg_animal}
            onChange={(e) => setFormData({ ...formData, peso_kg_animal: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Temperatura (°C)"
            value={formData.temperatura_animal}
            onChange={(e) => setFormData({ ...formData, temperatura_animal: e.target.value })}
            required
          />
          <textarea
            placeholder="Síntomas"
            value={formData.sintomas}
            onChange={(e) => setFormData({ ...formData, sintomas: e.target.value })}
            required
            rows="3"
          />
          <textarea
            placeholder="Diagnóstico"
            value={formData.diagnostico}
            onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
            required
            rows="3"
          />
          <textarea
            placeholder="Plan de tratamiento"
            value={formData.plan_tratamiento}
            onChange={(e) => setFormData({ ...formData, plan_tratamiento: e.target.value })}
            required
            rows="3"
          />
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Historial
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {histories.map((history) => (
            <div key={history.id_historia} className="card">
              <h3>📋 Historial #{history.id_historia}</h3>
              <p>Mascota: {getPetName(history.id_mascota)}</p>
              <p>Veterinario: {getVetName(history.id_veterinario)}</p>
              <p>Peso: {history.peso_kg_animal} kg</p>
              <p>Temperatura: {history.temperatura_animal} °C</p>
              <p><strong>Síntomas:</strong> {history.sintomas}</p>
              <p><strong>Diagnóstico:</strong> {history.diagnostico}</p>
              <p><strong>Plan:</strong> {history.plan_tratamiento}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(history)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(history.id_historia)}>
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

export default ClinicalHistories;
