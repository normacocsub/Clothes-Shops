import { useEffect, useState } from "react";
import Layout from "../../components/layout"
import TablaConsulta from "../../components/tabla";
import styles from "../../styles/admin/consulta_clothes.module.scss"
import { apiRestGet } from "../../services/auth";

const MisCompras = () => {
    const [consultas, setConsultas] = useState([]);
    const columnasTabla = ['id', 'fecha', 'total', 'estado'];

    const getFacturas = async () => {
        const login = JSON.parse(localStorage.getItem('login'))
        if (!login) return;
        const response = await apiRestGet('factura?correo='+login.correo)
        if (response.length > 0 ) {
            setConsultas(response)
        }
    }

    useEffect(() => {
        getFacturas()
    }, [])
    return <Layout>
        <div className={styles.content}>
            <h2>Consulta Ropa</h2>
            <TablaConsulta columnas={columnasTabla} datos={consultas} downloadColumn />
        </div>
    </Layout>
}

export default MisCompras;