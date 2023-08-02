import { useEffect, useState } from "react"
import CardClothes from "../../components/card_clothes"
import Layout from "../../components/layout"
import { apiRestGet } from "../../services/auth"
import styles from "../../styles/clothets.module.scss"
import Image from "next/image"
const Clotches = () => {
    const [productos, setProductos] = useState([])
    const getProducts = async () => {
        const response = await apiRestGet('producto');
        if (response.length > 0) {
            setProductos(response);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])
    return <Layout>
        
        <div className={styles.content}>
            <div className={styles.imageContainer}>
                {/* reemplazar aleatoreamente */}
                <Image src="/img/clothes.jpg" layout="fill" objectFit="cover" alt="" />
            </div>
            <div>
                <h2>Ropa para ti</h2>
                <div className={styles.cardsContent}>
                    {
                       (productos ?? []).map((item, index)  => {
                        return <CardClothes {...item} key={index}/>
                       }) 
                    }
                </div>
            </div>
        </div>
    </Layout>
}

export default Clotches