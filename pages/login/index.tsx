import InputGroup from '../../components/input_group';
import styles from '../../styles/login.module.scss'

const Login = () => {
    
    return <div className={styles.content}>
        <section className={styles.secondSectionContent} >
            <p className={styles.textoDescriptivo}>Imagen por Felipe Galvan / Fuente: Unsplash</p>
        </section>
        
        <section className={styles.firstSectionContent}>
            <div className={styles.contentSection}>
                <h3>Iniciar Sesión</h3>
                <form >
                    <InputGroup label='Correo' onChange={(e) => console.log(e)}/>
                    <InputGroup label='Password' type='password' onChange={(e) => console.log(e)}/>

                    <button>Login</button>
                </form>
            </div>

            <span>Registrarse</span>


        </section>
    </div>
}

export default Login;