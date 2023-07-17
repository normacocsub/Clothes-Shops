import { useRouter } from 'next/router';
import styles from '../styles/components/header.module.scss';
import Link from 'next/link';

const Header = () => {
    const router = useRouter();

    return <div className={styles.headerContent}>
        <div className={styles.firstSectionMenu}>
            <h2>Clotches Shop</h2>
            <ul>
                <li className={router.route === '/clothets' ? styles.active : ''}><Link href="/clothets">Ropa</Link></li>
                <li><a href="#">Nuevos</a></li>
                <li><a href="#">Ofertas</a></li>
                <li><a href="#">Marcas</a></li>
            </ul>
        </div>
        <div className={styles.secondSectionMenu}> 
            <input type="search" placeholder='Search' />
            <span>Account</span>
            <span>Carrito</span>
        </div>
    </div>
}


export default Header;