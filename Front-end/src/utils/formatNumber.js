// Función para formatear números con separador de miles usando punto
export const formatNumber = (number) => {
  if (number === null || number === undefined || number === '') {
    return '0';
  }
  const num = typeof number === 'string' ? parseFloat(number) : number;
  if (isNaN(num)) {
    return '0';
  }
  // Convertir a entero y formatear con separador de miles
  const integerPart = Math.floor(Math.abs(num));
  const formatted = integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return num < 0 ? `-${formatted}` : formatted;
};

