import React, { useState } from 'react';
import { useServices } from '../hooks/useServices';
import { formatNumber, unformatNumber } from '../utils/formatNumber';
import '../styles/Services.css';

const Services = () => {
  const {
    services,
    loading,
    showForm,
    editingId,
    formData,
    errors,
    handleFieldChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleForm
  } = useServices();

  const [displayPrice, setDisplayPrice] = useState('');
  const priceInputRef = React.useRef(null);

  const handlePriceChange = (e) => {
    const input = e.target;
    const value = input.value;
    const cursorPosition = input.selectionStart;
    
    // Remover todos los puntos (separadores de miles) para obtener el número puro
    const rawValue = value.replace(/\./g, '');
    
    // Solo permitir números
    if (rawValue === '' || /^\d+$/.test(rawValue)) {
      // Guardar el valor sin formato
      handleFieldChange('precio_servicio', rawValue);
      
      // Formatear el número para mostrar
      if (rawValue === '') {
        setDisplayPrice('');
      } else {
        const formatted = formatNumber(rawValue);
        setDisplayPrice(formatted);
        
        // Restaurar la posición del cursor después del formateo
        setTimeout(() => {
          // Calcular cuántos dígitos hay antes del cursor en el valor original
          const digitsBeforeCursor = value.substring(0, cursorPosition).replace(/\./g, '').length;
          
          // Encontrar la posición correspondiente en el número formateado
          let newPosition = 0;
          let digitCount = 0;
          for (let i = 0; i < formatted.length; i++) {
            if (formatted[i] !== '.') {
              digitCount++;
            }
            if (digitCount === digitsBeforeCursor) {
              newPosition = i + 1;
              break;
            }
            newPosition = i + 1;
          }
          
          // Si no encontramos la posición exacta, poner al final
          if (digitCount < digitsBeforeCursor) {
            newPosition = formatted.length;
          }
          
          input.setSelectionRange(newPosition, newPosition);
        }, 0);
      }
    } else {
      // Si no es válido, mantener el valor anterior
      setDisplayPrice(formatNumber(formData.precio_servicio || ''));
    }
  };

  React.useEffect(() => {
    if (formData.precio_servicio && !showForm) {
      setDisplayPrice('');
    } else if (formData.precio_servicio) {
      setDisplayPrice(formatNumber(formData.precio_servicio));
    }
  }, [formData.precio_servicio, showForm]);

  return (
    <div className="services-container">
      <div className="section-header">
        <h2>Servicios</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nuevo Servicio'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Servicio *</label>
            <input
              type="text"
              placeholder="Ej: Consulta General, Vacunación, Cirugía"
              value={formData.nombre_servicio}
              onChange={(e) => handleFieldChange('nombre_servicio', e.target.value)}
              className={errors.nombre_servicio ? 'error' : ''}
            />
            {errors.nombre_servicio && <span className="error-message">{errors.nombre_servicio}</span>}
          </div>
          <div className="form-group">
            <label>Descripción *</label>
            <textarea
              placeholder="Ej: Consulta médica general para evaluación del estado de salud del animal"
              value={formData.descripcion_servicio}
              onChange={(e) => handleFieldChange('descripcion_servicio', e.target.value)}
              className={errors.descripcion_servicio ? 'error' : ''}
              rows="3"
            />
            {errors.descripcion_servicio && <span className="error-message">{errors.descripcion_servicio}</span>}
          </div>
          <div className="form-group">
            <label>Precio * (Mínimo: $20.000)</label>
            <input
              ref={priceInputRef}
              type="text"
              placeholder="Ej: 20.000, 50.000, 100.000"
              value={displayPrice}
              onChange={handlePriceChange}
              className={errors.precio_servicio ? 'error' : ''}
            />
            {errors.precio_servicio && <span className="error-message">{errors.precio_servicio}</span>}
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Servicio
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {services.map((service) => (
            <div key={service.id_servicio} className="card">
              <h3>{service.nombre_servicio}</h3>
              <p>{service.descripcion_servicio}</p>
              <p className="price">${formatNumber(service.precio_servicio)}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(service)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(service.id_servicio)}>
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

export default Services;
