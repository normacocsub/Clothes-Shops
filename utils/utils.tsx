import { format } from "date-fns";

export const formatDate = (fecha: Date) => {
    return format(fecha, 'dd/MM/yyyy');
};

export const formatPrecio = (precio: number) => {
    return `$${precio.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
  
  