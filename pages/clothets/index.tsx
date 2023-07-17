import CardClothes from "../../components/card_clothes"
import Layout from "../../components/layout"
import styles from "../../styles/clothets.module.scss"
import Image from "next/image"
const Clotches = () => {
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
                       [1,2,3,4,5,6,7,8,9,0,1,3].map((item, index)  => {
                        return <CardClothes key={index}/>
                       }) 
                    }
                </div>
            </div>
        </div>
    </Layout>
}

export default Clotches