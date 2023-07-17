import { FunctionComponent } from 'react';
import styles from '../styles/layout.module.scss';
import Header from './header';


type LayoutProps = {
    children: any
  }
const Layout: FunctionComponent<LayoutProps> = ({children}) => {
    return <div className={styles.contenedorMain}>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.content}>
            {children}
        </div>
        
    </div>
}

export default Layout;