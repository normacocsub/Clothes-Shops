import Image from "next/image";
import styles from "../styles/components/card_clothes.module.scss"

const CardClothes = () => {
    return <div className={styles.container}>
        <Image onClick={() => console.log('')} src="/img/prueba/camisa1.jpg" width={300} height={300} alt="" className={styles.image} />
        <div className={styles.contentCard}>
            <div className={styles.sectionCard} onClick={() => console.log('')}>
                <div className={styles.headerCard}>
                    <span>Titulo</span>
                    <span>Precio</span>
                </div>
                <span>descripcion</span>
            </div>

            <button onClick={() => console.log('')}>Agregar al carrito</button>
        </div>
    </div>
}

export default CardClothes;