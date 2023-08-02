import { useState } from 'react';
import InputGroup from '../../components/input_group';
import styles from '../../styles/login.module.scss'
import { apiRestPost } from '../../services/auth';
import { useRouter } from 'next/router';

const Login = () => {

    const router = useRouter();
    const [formValues, setFormValues] = useState({
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
        const jsonLogin = {
            correo: formValues.correo,
            password: formValues.password,
            cedula: '',
            nombre: '',
            apellido: '',
            genero: '',
            direccion: '',
            telefono: '',
            ciudad: '',
            rolId: 0
        }

        const response = await apiRestPost('usuario/Login', jsonLogin);
        if (response.correo) {
            localStorage.setItem('login', JSON.stringify({correo: response.correo, login: 1, rol: response.rolId}))
            router.push('/');
        } 
    };

    return <div className={styles.content}>
        <section className={styles.secondSectionContent} >
            <p className={styles.textoDescriptivo}>Imagen por Felipe Galvan / Fuente: Unsplash</p>
        </section>
        
        <section className={styles.firstSectionContent}>
            <div className={styles.contentSection}>
                <h3>Iniciar Sesión</h3>
                <form >
                    <InputGroup label='Correo' name='correo' onChange={handleInputChange} value={formValues.correo}/>
                    <InputGroup label='Password' type='password' name='password' onChange={handleInputChange} value={formValues.password}/>

                    <button onClick={handleGuardar} type={'submit'}>Login</button>
                </form>
            </div>

            <span onClick={() => router.push('/registro')}>Registrarse</span>


        </section>
    </div>
}

export default Login;