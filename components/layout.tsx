import { FunctionComponent } from 'react';
import styles from '../styles/layout.module.scss';
import Header from './header';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

type LayoutProps = {
    children: any
  }
const Layout: FunctionComponent<LayoutProps> = ({children}) => {
    return <div className={styles.contenedorMain}>
        <Head>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.content}>
            {children}
            <Analytics />
        </div>
        
    </div>
}

export default Layout;