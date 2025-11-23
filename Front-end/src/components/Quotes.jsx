import React from 'react';
import { useQuotes } from '../hooks/useQuotes';
import '../styles/Quotes.css';

const Quotes = () => {
  const {
    quotes,
    pets,
    veterinarians,
    services,
    rooms,
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
    getVetName,
    getServiceName,
    getRoomName
  } = useQuotes();

  return (
    <div className="quotes-container">
      <div className="section-header">
        <h2>Citas</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nueva Cita'}
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
            value={formData.id_servicio}
            onChange={(e) => setFormData({ ...formData, id_servicio: e.target.value })}
            required
          >
            <option value="">Seleccionar Servicio</option>
            {services.map((service) => (
              <option key={service.id_servicio} value={service.id_servicio}>
                {service.nombre_servicio}
              </option>
            ))}
          </select>
          <select
            value={formData.id_sala}
            onChange={(e) => setFormData({ ...formData, id_sala: e.target.value })}
            required
          >
            <option value="">Seleccionar Sala</option>
            {rooms.map((room) => (
              <option key={room.id_sala} value={room.id_sala}>
                {room.nombre_sala}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            placeholder="Fecha de inicio"
            value={formData.fecha_inicio}
            onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
            required
          />
          <input
            type="datetime-local"
            placeholder="Fecha de fin"
            value={formData.fecha_fin}
            onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Estado de la cita"
            value={formData.estado_cita}
            onChange={(e) => setFormData({ ...formData, estado_cita: e.target.value })}
            required
          />
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Cita
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {quotes.map((quote) => (
            <div key={quote.id_cita} className="card">
              <h3>📅 Cita #{quote.id_cita}</h3>
              <p>Mascota: {getPetName(quote.id_mascota)}</p>
              <p>Veterinario: {getVetName(quote.id_veterinario)}</p>
              <p>Servicio: {getServiceName(quote.id_servicio)}</p>
              <p>Sala: {getRoomName(quote.id_sala)}</p>
              <p>Inicio: {new Date(quote.fecha_inicio).toLocaleString()}</p>
              <p>Fin: {new Date(quote.fecha_fin).toLocaleString()}</p>
              <p>Estado: {quote.estado_cita}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(quote)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(quote.id_cita)}>
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

export default Quotes;
