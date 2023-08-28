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

const UserRegister = ({ title, isProveedor = false }: Props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isFormValid, setIsFormValid] = useState({
        cedula: false,
        nombre: false,
        apellido: false,
        direccion: false,
        ciudad: false,
        correo: false,
        password: false,
        nit: false
    });
    const [formValues, setFormValues] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        ciudad: '',
        correo: '',
        password: '',
        nit: ''
    });

    const calculateFormValidity = () => {
        for (const [name, isValid] of Object.entries(isFormValid)) {
            if (!isValid) {
                return false;
            }
        }
        return true;
    };

    const handleInputChange = (event, isValid) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        setIsFormValid((prevIsFormValid: any) => ({
            ...prevIsFormValid,
            [name]: isValid,
        }));
    };

    const handleGuardar = async (event) => {
        event.preventDefault();
        setLoading(true)
        setError(false)
        const jsonData = {
            cedula: formValues.cedula,
            nombre: formValues.nombre,
            apellido: formValues.apellido,
            direccion: formValues.direccion,
            telefono: formValues.telefono,
            ciudad: formValues.ciudad,
            correo: formValues.correo,
            password: formValues.password,
            rolId: 0,
            nit: formValues.nit
        };

        if (!isProveedor) {
            jsonData.rolId = 3
        }
        const response = await apiRestPost(isProveedor ? 'proveedor' : 'usuario', jsonData)
        if (response.correo && !isProveedor) {
            router.push('/login')
            setLoading(false)
            return
        }
        setLoading(false)
        if (response.nit) {
            router.push('/admin/proveedores/consulta')
            return
        }
        setError(true)
    };
    return <div className={styles.content}>
        {loading ? <LoadingModal /> : null}
        <h2>{title}</h2>
        <form action="" className={styles.formContainer}>
            <InputGroup label={isProveedor ? "NIT" : "Cedula"} onChange={handleInputChange} name={isProveedor ? "nit" : "cedula"}
                value={isProveedor ? formValues.nit : formValues.cedula} required max={11} min={8} type="number" />
            <InputGroup label="Nombre" onChange={handleInputChange} name="nombre" value={formValues.nombre}
                required min={3} max={20} />
            <InputGroup label="Apellido" onChange={handleInputChange} name="apellido" value={formValues.apellido}
                required min={3} max={20} />
            <InputGroup label="Direccion" onChange={handleInputChange} name="direccion" value={formValues.direccion}
                required min={10} max={30} />
            <InputGroup label="Telefono" onChange={handleInputChange} name="telefono" value={formValues.telefono}
                min={10} max={10} type="number" required={false} />
            <InputGroup label="Ciudad" onChange={handleInputChange} name="ciudad" value={formValues.ciudad}
                required min={3} max={20} />
            <InputGroup label="Correo" onChange={handleInputChange} name="correo" value={formValues.correo}
                required min={15} max={30} type="email" />
            {!isProveedor && <InputGroup label="Password" onChange={handleInputChange} name="password" type="password" value={formValues.password}
                required min={7} max={20} />}
            {error && <p>Fallo al guardar intente mas tarde</p>}
            <button onClick={handleGuardar} disabled={!calculateFormValidity()}>Registrar</button>
        </form>
    </div>
}

export default UserRegister;