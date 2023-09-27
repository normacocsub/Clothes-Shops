import { useRouter } from 'next/router';
import styles from '../styles/components/header.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import classNames from 'classnames';


const menuAdmin = [{
    texto: '', link: ''
}]
const Header = () => {
    const router = useRouter();
    const [login, setLogin] = useState(false);
    const [rol, setRol] = useState(3);

    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú desplegable

    const handleMouseEnter = (index, event) => {
        setActiveSubMenu(index);
        setMenuPosition({ x: event.clientX, y: event.clientY });
        setIsSubMenuVisible(true); // Mostrar el menú desplegable al hacer hover
    };

    const handleMouseLeave = () => {
        setActiveSubMenu(null);
        setIsSubMenuVisible(false); // Ocultar el menú desplegable al quitar el hover
    };
    const logOut = () => {
        localStorage.removeItem('login')
        setLogin(false)
        setRol(0)
    }

    useEffect(() => {
        const loginD = JSON.parse(localStorage.getItem('login'))
        if (loginD) {
            setLogin(true);
            setRol(loginD.rol)
            return
        }
        setLogin(false)
    }, [])

    return (
        <nav className={styles.menu}>
            <div className={styles.headerContent}>
                <div className={styles.firstSectionMenu}>
                    <h2 onClick={() => router.push('/')}>Clotches Shop</h2>
                    {
                        rol === 3 &&
                        <ul className={styles.ul}>
                            <li className={router.route === '/clothets' ? classNames(styles.active, styles.liS) : styles.liS}><Link href="/clothets">Ropa</Link></li>
                        </ul>
                    }
                    {(rol === 1 || rol === 2) &&
                        <ul className={styles.ul}>

                            <li
                                onMouseEnter={(e) => handleMouseEnter(1, e)}
                                className={styles.liSDropw}
                            >
                                <a href="#" id='ropa'>Ropa</a>
                                {isSubMenuVisible && activeSubMenu === 1 && (
                                    <div
                                        className={styles.dropdown}
                                        style={{
                                            top: menuPosition.y, // Posicionar el menú desplegable debajo del elemento padre en la posición del eje Y del mouse
                                            left: menuPosition.x, // Posicionar el menú desplegable alineado con el elemento padre en la posición del eje X del mouse
                                        }}
                                    >
                                        {/* Aquí puedes agregar más elementos para el menú desplegable de "Marcas" */}
                                        <ul onMouseLeave={handleMouseLeave}>
                                            <li className={styles.liS}>
                                                <Link href="/admin/clothes/registro">Registrar Ropa</Link>
                                            </li>
                                            <li className={styles.liS}>
                                                <Link href="/admin/clothes/consulta">Consultar Ropa</Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>

                            {
                                rol === 1 && <li
                                    onMouseEnter={(e) => handleMouseEnter(2, e)}
                                    className={styles.liSDropw}
                                >
                                    <a href="#" id='proveedor'>Proveedores</a>
                                    {isSubMenuVisible && activeSubMenu === 2 && (
                                        <div
                                            className={styles.dropdown}
                                            style={{
                                                top: menuPosition.y, // Posicionar el menú desplegable debajo del elemento padre en la posición del eje Y del mouse
                                                left: menuPosition.x, // Posicionar el menú desplegable alineado con el elemento padre en la posición del eje X del mouse
                                            }}
                                        >
                                            {/* Aquí puedes agregar más elementos para el menú desplegable de "Marcas" */}
                                            <ul onMouseLeave={handleMouseLeave} id='register-proveedor'>
                                                <li className={styles.liS} >
                                                    <Link href="/admin/proveedores/registro" >Registrar Proveedor</Link>
                                                </li>
                                                <li className={styles.liS}>
                                                    <Link href="/admin/proveedores/consulta">Consultar Proveedores</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            }
                        </ul>
                    }
                </div>
                <div className={styles.secondSectionMenu}>
                    <input type="search" placeholder='Search' />
                    {!login && <span id='login-button' onClick={() => router.push('/login')}>Log in</span>}
                    {login && <span onClick={logOut}>Log Out</span>}
                    {rol === 3 && <span onClick={() => router.push('/carrito')}>Carrito</span>}
                    {rol === 3 && <span onClick={() => router.push('/compras/mis_compras')}>Mis Compras</span>}
                </div>
            </div>
        </nav>
    );
}

export default Header;