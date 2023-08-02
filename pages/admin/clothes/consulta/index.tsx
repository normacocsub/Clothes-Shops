import { useEffect, useState } from "react";
import TablaConsulta from "../../../../components/tabla";
import styles from "../../../../styles/admin/consulta_clothes.module.scss"
import Layout from "../../../../components/layout";
import { apiRestGet } from "../../../../services/auth";

const ConsultaClothes = () => {
    const [consultas, setConsultas] = useState([]);
    const columnasTabla = ['codigo', 'nombre', 'stock', 'precio'];
    const [rol, setRol] = useState(0);
    const getConsultas = async () => {
        let response;
        if (rol === 2) {
            response = await apiRestGet('producto/proveedores?correo='+ (JSON.parse(localStorage.getItem('login'))).correo)
        } else {
           response = await apiRestGet('producto')
        }
        
        if (response.length > 0) {
            setConsultas(response)
        }
    }
    useEffect(() => {

        setRol((JSON.parse(localStorage.getItem('login'))).rol)
        getConsultas()
    }, [])
    return <Layout>
        <div className={styles.content}>
            <h2>Consulta Ropa</h2>
            <TablaConsulta columnas={columnasTabla} datos={consultas} linkColumn={'codigo'} />
        </div>
    </Layout>
}

export default ConsultaClothes;