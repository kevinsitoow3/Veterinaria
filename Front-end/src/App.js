import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8000/api';

function App() {
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('owners');

  // Form states
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const [newOwner, setNewOwner] = useState({
    nombre_dueño: '',
    telefono_dueño: '',
    correo_dueño: '',
    direccion_dueño: ''
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'owners') {
        const response = await axios.get(`${API_URL}/owners/`);
        setOwners(response.data.owners || []);
      } else if (activeTab === 'pets') {
        const response = await axios.get(`${API_URL}/pets/`);
        setPets(response.data.mascotas || []);
      } else if (activeTab === 'veterinarians') {
        const response = await axios.get(`${API_URL}/veterinarians/`);
        setVeterinarians(response.data.veterinarios || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOwner = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/owners/`, newOwner);
      setNewOwner({
        nombre_dueño: '',
        telefono_dueño: '',
        correo_dueño: '',
        direccion_dueño: ''
      });
      setShowOwnerForm(false);
      fetchData();
      alert('Dueño creado exitosamente');
    } catch (error) {
      console.error('Error creating owner:', error);
      alert('Error al crear el dueño');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐾 Sistema de Gestión Veterinaria</h1>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'owners' ? 'active' : ''}
          onClick={() => setActiveTab('owners')}
        >
          Dueños
        </button>
        <button
          className={activeTab === 'pets' ? 'active' : ''}
          onClick={() => setActiveTab('pets')}
        >
          Mascotas
        </button>
        <button
          className={activeTab === 'veterinarians' ? 'active' : ''}
          onClick={() => setActiveTab('veterinarians')}
        >
          Veterinarios
        </button>
      </nav>

      <main className="content">
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : (
          <>
            {activeTab === 'owners' && (
              <div className="section">
                <div className="section-header">
                  <h2>Dueños</h2>
                  <button
                    className="btn-primary"
                    onClick={() => setShowOwnerForm(!showOwnerForm)}
                  >
                    {showOwnerForm ? 'Cancelar' : '+ Nuevo Dueño'}
                  </button>
                </div>

                {showOwnerForm && (
                  <form className="form" onSubmit={handleCreateOwner}>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={newOwner.nombre_dueño}
                      onChange={(e) =>
                        setNewOwner({ ...newOwner, nombre_dueño: e.target.value })
                      }
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      value={newOwner.telefono_dueño}
                      onChange={(e) =>
                        setNewOwner({ ...newOwner, telefono_dueño: e.target.value })
                      }
                      required
                    />
                    <input
                      type="email"
                      placeholder="Correo"
                      value={newOwner.correo_dueño}
                      onChange={(e) =>
                        setNewOwner({ ...newOwner, correo_dueño: e.target.value })
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Dirección"
                      value={newOwner.direccion_dueño}
                      onChange={(e) =>
                        setNewOwner({ ...newOwner, direccion_dueño: e.target.value })
                      }
                      required
                    />
                    <button type="submit" className="btn-submit">
                      Crear Dueño
                    </button>
                  </form>
                )}

                <div className="cards">
                  {owners.map((owner) => (
                    <div key={owner.id_dueño} className="card">
                      <h3>{owner.nombre_dueño}</h3>
                      <p>📞 {owner.telefono_dueño}</p>
                      <p>📧 {owner.correo_dueño}</p>
                      <p>📍 {owner.direccion_dueño}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pets' && (
              <div className="section">
                <h2>Mascotas</h2>
                <div className="cards">
                  {pets.map((pet) => (
                    <div key={pet.id_mascota} className="card">
                      <h3>{pet.nombre_mascota}</h3>
                      <p>Sexo: {pet.sexo_animal}</p>
                      <p>Color: {pet.color}</p>
                      <p>Estado: {pet.estado}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'veterinarians' && (
              <div className="section">
                <h2>Veterinarios</h2>
                <div className="cards">
                  {veterinarians.map((vet) => (
                    <div key={vet.id_veterinario} className="card">
                      <h3>{vet.nombre_veterinario}</h3>
                      <p>📧 {vet.correo_veterinario}</p>
                      <p>📞 {vet.telefono_veterinario}</p>
                      <p>Especialidad: {vet.especialidad_veterinario}</p>
                      <p>
                        Estado: {vet.estado_veterinario ? '✅ Activo' : '❌ Inactivo'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;

