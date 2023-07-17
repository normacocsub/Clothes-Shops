import styles from '../styles/components/card_category.module.scss'
import Image from 'next/image';


interface Props {
    categoria: string
    urlImage: string
}
const CardCategory = ({categoria, urlImage}: Props) => {
    return <div className={styles.content}>
        <Image className={styles.image} src={urlImage} width={200} height={300}  objectFit={'cover'} alt="" />
        <h2 className={styles.textoCategoria}>{categoria}</h2>
    </div>
}

export default CardCategory;