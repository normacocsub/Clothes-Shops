import { useEffect, useState } from "react";
import TablaConsulta from "../../../../components/tabla";
import styles from "../../../../styles/admin/consulta_clothes.module.scss"
import { apiRestGet } from "../../../../services/auth";
import Layout from "../../../../components/layout";

const ConsultaProveedores = () => {

    const [consultas, setConsultas] = useState([]);
    const columnasTabla = ['cedula', 'nombre', 'genero', 'correo', 'telefono'];

    const getConsultas = async () => {
        const response = await apiRestGet('usuario')
        if (response.length > 0) {
            setConsultas(response)
        }
    }
    useEffect(() => {
        getConsultas()
    }, [])
    return <Layout>
        <div className={styles.content}>
            <h2>Proveedores</h2>
            <TablaConsulta columnas={columnasTabla} datos={consultas} />
        </div>
    </Layout>
}

export default ConsultaProveedores;