import React from 'react';
import { useQuotes } from '../hooks/useQuotes';
import '../styles/Quotes.css';

const Quotes = () => {
  const {
    quotes,
    pets,
    activeVeterinarians,
    services,
    rooms,
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
          <div className="form-group">
            <label>Mascota *</label>
            <select
              value={formData.id_mascota}
              onChange={(e) => handleFieldChange('id_mascota', e.target.value)}
              className={errors.id_mascota ? 'error' : ''}
            >
              <option value="">Seleccionar Mascota</option>
              {pets.map((pet) => (
                <option key={pet.id_mascota} value={pet.id_mascota}>
                  {pet.nombre_mascota}
                </option>
              ))}
            </select>
            {errors.id_mascota && <span className="error-message">{errors.id_mascota}</span>}
          </div>
          <div className="form-group">
            <label>Veterinario * (Solo activos)</label>
            <select
              value={formData.id_veterinario}
              onChange={(e) => handleFieldChange('id_veterinario', e.target.value)}
              className={errors.id_veterinario ? 'error' : ''}
            >
              <option value="">Seleccionar Veterinario</option>
              {activeVeterinarians.map((vet) => (
                <option key={vet.id_veterinario} value={vet.id_veterinario}>
                  {vet.nombre_veterinario}
                </option>
              ))}
            </select>
            {errors.id_veterinario && <span className="error-message">{errors.id_veterinario}</span>}
          </div>
          <div className="form-group">
            <label>Servicio *</label>
            <select
              value={formData.id_servicio}
              onChange={(e) => handleFieldChange('id_servicio', e.target.value)}
              className={errors.id_servicio ? 'error' : ''}
            >
              <option value="">Seleccionar Servicio</option>
              {services.map((service) => (
                <option key={service.id_servicio} value={service.id_servicio}>
                  {service.nombre_servicio}
                </option>
              ))}
            </select>
            {errors.id_servicio && <span className="error-message">{errors.id_servicio}</span>}
          </div>
          <div className="form-group">
            <label>Sala *</label>
            <select
              value={formData.id_sala}
              onChange={(e) => handleFieldChange('id_sala', e.target.value)}
              className={errors.id_sala ? 'error' : ''}
            >
              <option value="">Seleccionar Sala</option>
              {rooms.map((room) => (
                <option key={room.id_sala} value={room.id_sala}>
                  {room.nombre_sala}
                </option>
              ))}
            </select>
            {errors.id_sala && <span className="error-message">{errors.id_sala}</span>}
          </div>
          <div className="form-group">
            <label>Fecha de inicio *</label>
            <input
              type="datetime-local"
              value={formData.fecha_inicio}
              onChange={(e) => handleFieldChange('fecha_inicio', e.target.value)}
              className={errors.fecha_inicio ? 'error' : ''}
              required
            />
            {errors.fecha_inicio && <span className="error-message">{errors.fecha_inicio}</span>}
          </div>
          <div className="form-group">
            <label>Fecha de fin *</label>
            <input
              type="datetime-local"
              value={formData.fecha_fin}
              onChange={(e) => handleFieldChange('fecha_fin', e.target.value)}
              className={errors.fecha_fin ? 'error' : ''}
              required
            />
            {errors.fecha_fin && <span className="error-message">{errors.fecha_fin}</span>}
          </div>
          <div className="form-group">
            <label>Estado de la Cita *</label>
            <select
              value={formData.estado_cita}
              onChange={(e) => handleFieldChange('estado_cita', e.target.value)}
              className={errors.estado_cita ? 'error' : ''}
            >
              <option value="">Seleccionar Estado de Cita</option>
              <option value="Programada">Programada - Cita agendada</option>
              <option value="Confirmada">Confirmada - Cita confirmada por el cliente</option>
              <option value="En curso">En curso - Cita en proceso</option>
              <option value="Completada">Completada - Cita finalizada</option>
              <option value="Cancelada">Cancelada - Cita cancelada</option>
              <option value="Reprogramada">Reprogramada - Cita reagendada</option>
            </select>
            {errors.estado_cita && <span className="error-message">{errors.estado_cita}</span>}
          </div>
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
