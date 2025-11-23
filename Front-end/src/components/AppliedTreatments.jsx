import React, { useState } from 'react';
import { useAppliedTreatments } from '../hooks/useAppliedTreatments';
import { formatNumber, unformatNumber } from '../utils/formatNumber';
import '../styles/AppliedTreatments.css';

const AppliedTreatments = () => {
  const {
    appliedTreatments,
    histories,
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
    toggleForm,
    getTreatmentName,
    handleTreatmentChange
  } = useAppliedTreatments();

  const [displayCantidad, setDisplayCantidad] = useState('');
  const [displayPrecio, setDisplayPrecio] = useState('');
  const [displayTotal, setDisplayTotal] = useState('');

  const handleCantidadChange = (e) => {
    const input = e.target;
    const value = input.value;
    const cursorPosition = input.selectionStart;
    
    // Remover puntos de separadores de miles pero mantener punto decimal
    let rawValue = value;
    const parts = value.split('.');
    if (parts.length > 1) {
      // Si hay más de una parte, el último punto es el decimal
      const integerPart = parts.slice(0, -1).join('').replace(/\./g, '');
      rawValue = integerPart + '.' + parts[parts.length - 1];
    } else {
      rawValue = value.replace(/\./g, '');
    }
    
    // Permitir números y un punto decimal
    if (rawValue === '' || /^\d*\.?\d*$/.test(rawValue)) {
      handleFieldChange('cantidad', rawValue);
      
      if (rawValue === '') {
        setDisplayCantidad('');
      } else {
        const num = parseFloat(rawValue);
        if (!isNaN(num) && rawValue !== '') {
          // Solo formatear si es >= 1000
          if (num >= 1000) {
            const integerPart = Math.floor(num);
            const decimalPart = rawValue.includes('.') ? rawValue.split('.')[1] : '';
            const formatted = formatNumber(integerPart) + (decimalPart ? '.' + decimalPart : '');
            setDisplayCantidad(formatted);
            
            setTimeout(() => {
              // Calcular dígitos antes del cursor (sin contar separadores de miles)
              const beforeCursor = value.substring(0, cursorPosition);
              const digitsBeforeCursor = beforeCursor.replace(/\./g, '').length;
              
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
              
              if (digitCount < digitsBeforeCursor) {
                newPosition = formatted.length;
              }
              
              input.setSelectionRange(newPosition, newPosition);
            }, 0);
          } else {
            setDisplayCantidad(rawValue);
          }
        } else {
          setDisplayCantidad(rawValue);
        }
      }
    }
  };

  const handlePrecioChange = (e) => {
    const input = e.target;
    const value = input.value;
    const cursorPosition = input.selectionStart;
    
    // Remover puntos de separadores de miles pero mantener punto decimal
    let rawValue = value;
    const parts = value.split('.');
    if (parts.length > 1) {
      const integerPart = parts.slice(0, -1).join('').replace(/\./g, '');
      rawValue = integerPart + '.' + parts[parts.length - 1];
    } else {
      rawValue = value.replace(/\./g, '');
    }
    
    // Permitir números y un punto decimal
    if (rawValue === '' || /^\d*\.?\d*$/.test(rawValue)) {
      handleFieldChange('precio_aplicado', rawValue);
      
      if (rawValue === '') {
        setDisplayPrecio('');
      } else {
        const num = parseFloat(rawValue);
        if (!isNaN(num) && rawValue !== '') {
          const integerPart = Math.floor(Math.abs(num));
          const decimalPart = rawValue.includes('.') ? rawValue.split('.')[1] : '';
          const formatted = formatNumber(integerPart) + (decimalPart ? '.' + decimalPart : '');
          setDisplayPrecio(formatted);
          
          setTimeout(() => {
            // Calcular dígitos antes del cursor (sin contar separadores de miles)
            const beforeCursor = value.substring(0, cursorPosition);
            const digitsBeforeCursor = beforeCursor.replace(/\./g, '').length;
            
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
            
            if (digitCount < digitsBeforeCursor) {
              newPosition = formatted.length;
            }
            
            input.setSelectionRange(newPosition, newPosition);
          }, 0);
        } else {
          setDisplayPrecio(rawValue);
        }
      }
    }
  };

  React.useEffect(() => {
    if (formData.cantidad && !showForm) {
      setDisplayCantidad('');
    } else if (formData.cantidad) {
      setDisplayCantidad(formatNumber(formData.cantidad));
    }
    if (formData.precio_aplicado && !showForm) {
      setDisplayPrecio('');
    } else if (formData.precio_aplicado) {
      setDisplayPrecio(formatNumber(formData.precio_aplicado));
    }
    if (formData.total) {
      setDisplayTotal(formatNumber(formData.total));
    } else {
      setDisplayTotal('');
    }
  }, [formData.cantidad, formData.precio_aplicado, formData.total, showForm]);

  return (
    <div className="applied-treatments-container">
      <div className="section-header">
        <h2>Tratamientos Aplicados</h2>
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? 'Cancelar' : '+ Nuevo Tratamiento Aplicado'}
        </button>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Historial Clínico *</label>
            <select
              value={formData.id_historia}
              onChange={(e) => handleFieldChange('id_historia', e.target.value)}
              className={errors.id_historia ? 'error' : ''}
            >
              <option value="">Seleccionar Historial</option>
              {histories.map((history) => (
                <option key={history.id_historia} value={history.id_historia}>
                  Historial #{history.id_historia}
                </option>
              ))}
            </select>
            {errors.id_historia && <span className="error-message">{errors.id_historia}</span>}
          </div>
          <div className="form-group">
            <label>Tratamiento *</label>
            <select
              value={formData.id_tratamiento}
              onChange={(e) => handleTreatmentChange(e.target.value)}
              className={errors.id_tratamiento ? 'error' : ''}
            >
              <option value="">Seleccionar Tratamiento</option>
              {treatments.map((treatment) => (
                <option key={treatment.id_tratamiento} value={treatment.id_tratamiento}>
                  {treatment.nombre_tratamiento}
                </option>
              ))}
            </select>
            {errors.id_tratamiento && <span className="error-message">{errors.id_tratamiento}</span>}
          </div>
          <div className="form-group">
            <label>Cantidad *</label>
            <input
              type="text"
              placeholder="Ej: 1, 2, 5, 10"
              value={displayCantidad}
              onChange={handleCantidadChange}
              className={errors.cantidad ? 'error' : ''}
            />
            {errors.cantidad && <span className="error-message">{errors.cantidad}</span>}
          </div>
          <div className="form-group">
            <label>Precio Aplicado *</label>
            <input
              type="text"
              placeholder="Ej: 100, 500, 1.000"
              value={displayPrecio}
              onChange={handlePrecioChange}
              className={errors.precio_aplicado ? 'error' : ''}
            />
            {errors.precio_aplicado && <span className="error-message">{errors.precio_aplicado}</span>}
          </div>
          <div className="form-group">
            <label>Total (Calculado automáticamente)</label>
            <input
              type="text"
              placeholder="Se calcula automáticamente"
              value={displayTotal}
              className={errors.total ? 'error' : ''}
              readOnly
            />
            {errors.total && <span className="error-message">{errors.total}</span>}
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Actualizar' : 'Crear'} Tratamiento Aplicado
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="cards">
          {appliedTreatments.map((appliedTreatment) => (
            <div key={appliedTreatment.id_aplicacion} className="card">
              <h3>💉 Aplicación #{appliedTreatment.id_aplicacion}</h3>
              <p>Historial: #{appliedTreatment.id_historia}</p>
              <p>Tratamiento: {getTreatmentName(appliedTreatment.id_tratamiento)}</p>
              <p>Cantidad: {appliedTreatment.cantidad}</p>
              <p>Precio: ${formatNumber(appliedTreatment.precio_aplicado)}</p>
              <p className="price">Total: ${formatNumber(appliedTreatment.total)}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={() => handleEdit(appliedTreatment)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(appliedTreatment.id_aplicacion)}>
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

export default AppliedTreatments;
