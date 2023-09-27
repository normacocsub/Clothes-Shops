import { useState } from 'react';
import InputGroup from '../../components/input_group';
import styles from '../../styles/login.module.scss'
import { apiRestPost } from '../../services/auth';
import { useRouter } from 'next/router';
import LoadingModal from '../../components/modal_loading';

const Login = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false);
    const [formValues, setFormValues] = useState({
        correo: '',
        password: ''
    });
    
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
        setLoading(false)
        if (response.correo) {
            localStorage.setItem('login', JSON.stringify({correo: response.correo, login: 1, rol: response.rolId}))
            router.push('/');
            return
        } 
        setError(true)
    };

    return <div className={styles.content}>
        {loading ? <LoadingModal /> : null}
        <section className={styles.secondSectionContent} >
            <p className={styles.textoDescriptivo}>Imagen por Felipe Galvan / Fuente: Unsplash</p>
        </section>
        
        <section className={styles.firstSectionContent}>
            <div className={styles.contentSection}>
                <h3>Iniciar Sesión</h3>
                <form >
                    <InputGroup id='email' label='Correo' name='correo' onChange={handleInputChange} value={formValues.correo} 
                        required min={15} max={30} type='email'/>
                    <InputGroup id='password' label='Password' type='password' name='password' onChange={handleInputChange} value={formValues.password}
                        required min={8} max={20}/>
                    {error && <p style={{
                        fontSize: '16px',
                        color: 'red'
                    }}>Error al iniciar sesion, credenciales incorrectas</p>}
                    <button id='login' onClick={handleGuardar} type={'submit'} disabled={!isFormValid}>Login</button>
                </form>
            </div>

            <span id='registro' onClick={() => router.push('/registro')}>Registrarse</span>


        </section>
    </div>
}

export default Login;