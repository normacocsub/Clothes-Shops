import { useState } from "react";
import styles from "../styles/components/user_register.module.scss"
import InputGroup from "./input_group";
import { apiRestPost } from "../services/auth";
import { useRouter } from "next/router";
import LoadingModal from "./modal_loading";

interface Props {
    title: string,
    isProveedor?: boolean
}

const UserRegister = ({title, isProveedor = false}: Props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        genero: '',
        direccion: '',
        telefono: '',
        ciudad: '',
        correo: '',
        password: ''
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleGuardar = async (event) => {
        event.preventDefault();
        setLoading(true)
        const jsonData = {
            cedula: formValues.cedula,
            nombre: formValues.nombre,
            apellido: formValues.apellido,
            genero: formValues.genero,
            direccion: formValues.direccion,
            telefono: formValues.telefono,
            ciudad: formValues.ciudad,
            correo: formValues.correo,
            password: formValues.password,
            rolId: 0
        };

        if (isProveedor) {
            jsonData.rolId = 2
        } else {
            jsonData.rolId = 3
        }
        const response = await apiRestPost('usuario', jsonData)
        if (response.correo && !isProveedor){
            router.push('/login')
            setLoading(false)
            return
        }
        setLoading(false)
        router.push('/admin/proveedores/consulta')
    };
    return <div className={styles.content}>
        {loading ? <LoadingModal /> : null}
        <h2>{title}</h2>
        <form action="" className={styles.formContainer}>
            <InputGroup label="Cedula" onChange={handleInputChange} name="cedula" value={formValues.cedula}/>
            <InputGroup label="Nombre" onChange={handleInputChange} name="nombre" value={formValues.nombre} />
            <InputGroup label="Apellido" onChange={handleInputChange} name="apellido" value={formValues.apellido}/>
            <select name="genero" id="" onChange={handleInputChange} value={formValues.genero}>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
            </select>
            <InputGroup label="Direccion" onChange={handleInputChange} name="direccion" value={formValues.direccion}/>
            <InputGroup label="Telefono" onChange={handleInputChange} name="telefono" value={formValues.telefono}/>
            <InputGroup label="Ciudad" onChange={handleInputChange} name="ciudad" value={formValues.ciudad}/>
            <InputGroup label="Correo" onChange={handleInputChange} name="correo" value={formValues.correo}/>
            <InputGroup label="Password" onChange={handleInputChange} name="password" type="password" value={formValues.password}/>

            <button onClick={handleGuardar}>Registrar</button>
        </form>
    </div>
}

export default UserRegister;