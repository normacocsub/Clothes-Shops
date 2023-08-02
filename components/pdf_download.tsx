import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatDate } from '../utils/utils';
pdfMake.vfs = pdfFonts.pdfMake.vfs;





const GenerarPDF = (factura) => {

  // Función para formatear la fecha en formato dd/MM/yyyy
  const formatearFecha = (fecha) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return formatDate(new Date(fecha))
  };

  // Función para formatear el precio en formato COP
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(precio);
  };

  const content = [
    { text: 'Resumen de la compra', style: 'header' },
    { text: 'Fecha: ' + formatearFecha(factura.fecha), style: 'subheader' },
    { text: 'Cliente: ' + factura.cliente.nombre + ' ' + factura.cliente.apellido, style: 'subheader' },
    { text: 'Detalles de la compra:', style: 'subheader' },
    {
      ul: factura.detalles.map((detalle) => {
        return `${detalle.cantidad} x ${detalle.producto.nombre}: ${formatearPrecio(detalle.precioUnitario)}`
      })
    },
    { text: 'Total: ' + formatearPrecio(factura.total), style: 'subheader' },
  ];

  

   // Define los estilos del PDF
   const styles = {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10]
    },
    subheader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 5]
    }
  };

  // Genera el PDF
  const docDefinition = {
    content: content,
    styles: styles
  };
  

  pdfMake.createPdf(docDefinition).open();
};

export default GenerarPDF;
