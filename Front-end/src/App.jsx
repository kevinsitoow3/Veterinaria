import React, { useState } from 'react';
import './styles/App.css';
import Owners from './components/Owners';
import Species from './components/Species';
import Breeds from './components/Breeds';
import Pets from './components/Pets';
import Veterinarians from './components/Veterinarians';
import Services from './components/Services';
import Rooms from './components/Rooms';
import Quotes from './components/Quotes';
import ClinicalHistories from './components/ClinicalHistories';
import Treatments from './components/Treatments';
import AppliedTreatments from './components/AppliedTreatments';

function App() {
  const [activeTab, setActiveTab] = useState('owners');

  const tabs = [
    { id: 'owners', label: 'Dueños', icon: '👤' },
    { id: 'species', label: 'Especies', icon: '🐾' },
    { id: 'breeds', label: 'Razas', icon: '🐕' },
    { id: 'pets', label: 'Mascotas', icon: '🐱' },
    { id: 'veterinarians', label: 'Veterinarios', icon: '👨‍⚕️' },
    { id: 'services', label: 'Servicios', icon: '🩺' },
    { id: 'rooms', label: 'Salas', icon: '🏥' },
    { id: 'quotes', label: 'Citas', icon: '📅' },
    { id: 'clinical-histories', label: 'Historiales', icon: '📋' },
    { id: 'treatments', label: 'Tratamientos', icon: '💊' },
    { id: 'applied-treatments', label: 'Trat. Aplicados', icon: '💉' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'owners':
        return <Owners />;
      case 'species':
        return <Species />;
      case 'breeds':
        return <Breeds />;
      case 'pets':
        return <Pets />;
      case 'veterinarians':
        return <Veterinarians />;
      case 'services':
        return <Services />;
      case 'rooms':
        return <Rooms />;
      case 'quotes':
        return <Quotes />;
      case 'clinical-histories':
        return <ClinicalHistories />;
      case 'treatments':
        return <Treatments />;
      case 'applied-treatments':
        return <AppliedTreatments />;
      default:
        return <Owners />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐾 Sistema de Gestión Veterinaria</h1>
      </header>

      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      <main className="content">
        <div className="section">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
