import React from 'react';
import styles from "../styles/components/tabla.module.scss";
import { formatDate } from '../utils/utils';
import { FaDownload } from 'react-icons/fa';
import GenerarPDF from "./pdf_download";

interface Props {
  columnas: any;
  datos: any;
  linkColumn?: any;
  downloadColumn?: any;
}

const TablaConsulta = ({ columnas, datos, linkColumn, downloadColumn }: Props) => {

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columnas.map((columna, index) => (
            <th key={index}>{columna}</th>
          ))}
          {(linkColumn || downloadColumn) && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {datos.map((fila, index) => (
          <tr key={index}>
            {columnas.map((columna, colIndex) => (
              <td key={colIndex}>
                {columna === 'total'
                  ? Number(fila[columna]).toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'COP',
                  })
                  : columna === 'fecha'
                    ? formatDate(new Date(fila[columna]))
                    : fila[columna]}
              </td>
            ))}
            {linkColumn && (
              <td>
                <a href={`/admin/clothes/registro?id=${fila[linkColumn]}`}>Modificar</a>
              </td>
            )}
            {downloadColumn && (
              <td className={styles['actions-cell']} onClick={() => GenerarPDF(fila)}>
                <FaDownload />
                <span>Download</span>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaConsulta;
