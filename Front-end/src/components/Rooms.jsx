import React from 'react';
import { useRooms } from '../hooks/useRooms';
import '../styles/Rooms.css';

const Rooms = () => {
  const {
    rooms,
    loading,
    showForm,
    editingId,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm
  } = useRooms();

  return (
    <div className="rooms-container">
      <div className="section-header">
        <h2>Salas</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nueva Sala'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de la sala"
            value={formData.nombre_sala}
            onChange={(e) => setFormData({ ...formData, nombre_sala: e.target.value })}
            required
          />
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Sala
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {rooms.map((room) => (
            <div key={room.id_sala} className="card">
              <h3>🏥 {room.nombre_sala}</h3>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(room)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(room.id_sala)}>
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

export default Rooms;
