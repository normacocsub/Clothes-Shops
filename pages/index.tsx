import Image from "next/image";
import Layout from "../components/layout";
import styles from "../styles/home.module.scss"
import CardCategory from "../components/card_category";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  const categorias = [{
    categoria: 'Camisas', urlImage: '/img/categories/camisa.jpg'},
    {categoria: 'Chaquetas', urlImage: '/img/categories/chaquetas.jpg'},
    {categoria: 'Faldas', urlImage: '/img/categories/faldas.jpg'},
    {categoria: 'Pantalones', urlImage: '/img/categories/pantalones.jpg'},
    {categoria: 'Sudaderas', urlImage: '/img/categories/sudaderas.jpg'},
    {categoria: 'Vestidos', urlImage: '/img/categories/vestidos.jpg'}
  ]
  return (
    <Layout>
      <div>
        <div className={styles.imageContainer}>
          <Image src="/img/home.jpg" layout="fill" objectFit="cover" alt="" />
          <div className={styles.textoContainer}>
            <h1 className={styles.textoTitulo}>Tienda de Ropa</h1>
            <h2 className={styles.textoSubTitulo}>Descubre las últimas tendencias</h2>
            <button style={{
              cursor: 'pointer'
            }} onClick={() => router.push('/clothets')}>Explorar</button>
          </div>
        </div>

        <div className={styles.categoriaSection}>
          <h2>Categorias</h2>
          <div className={styles.categorias}>
            {
              categorias?.map((item, index) => {
                return <CardCategory key={index} {...item}/>
              })
            }
            
          </div>
        </div>
      </div>
    </Layout>
  )
}
