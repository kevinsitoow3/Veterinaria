import React, { useState } from 'react';
import { useTreatments } from '../hooks/useTreatments';
import { formatNumber, unformatNumber } from '../utils/formatNumber';
import '../styles/Treatments.css';

const Treatments = () => {
  const {
    treatments,
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
  } = useTreatments();

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
      handleFieldChange('precio_tratamiento', rawValue);
      
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
      setDisplayPrice(formatNumber(formData.precio_tratamiento || ''));
    }
  };

  React.useEffect(() => {
    if (formData.precio_tratamiento && !showForm) {
      setDisplayPrice('');
    } else if (formData.precio_tratamiento) {
      setDisplayPrice(formatNumber(formData.precio_tratamiento));
    }
  }, [formData.precio_tratamiento, showForm]);

  return (
    <div className="treatments-container">
      <div className="section-header">
        <h2>Tratamientos</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nuevo Tratamiento'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Tratamiento *</label>
            <input
              type="text"
              placeholder="Ej: Antibiótico, Analgésico, Antiinflamatorio"
              value={formData.nombre_tratamiento}
              onChange={(e) => handleFieldChange('nombre_tratamiento', e.target.value)}
              className={errors.nombre_tratamiento ? 'error' : ''}
            />
            {errors.nombre_tratamiento && <span className="error-message">{errors.nombre_tratamiento}</span>}
          </div>
          <div className="form-group">
            <label>Descripción *</label>
            <textarea
              placeholder="Ej: Tratamiento con antibiótico para infecciones bacterianas"
              value={formData.descripcion_tratamiento}
              onChange={(e) => handleFieldChange('descripcion_tratamiento', e.target.value)}
              className={errors.descripcion_tratamiento ? 'error' : ''}
              rows="3"
            />
            {errors.descripcion_tratamiento && <span className="error-message">{errors.descripcion_tratamiento}</span>}
          </div>
          <div className="form-group">
            <label>Precio * (Mínimo: $100)</label>
            <input
              ref={priceInputRef}
              type="text"
              placeholder="Ej: 100, 500, 1.000"
              value={displayPrice}
              onChange={handlePriceChange}
              className={errors.precio_tratamiento ? 'error' : ''}
            />
            {errors.precio_tratamiento && <span className="error-message">{errors.precio_tratamiento}</span>}
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Tratamiento
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {treatments.map((treatment) => (
            <div key={treatment.id_tratamiento} className="card">
              <h3>{treatment.nombre_tratamiento}</h3>
              <p>{treatment.descripcion_tratamiento}</p>
              <p className="price">${formatNumber(treatment.precio_tratamiento)}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(treatment)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(treatment.id_tratamiento)}>
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

export default Treatments;
