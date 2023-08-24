import Image from "next/image";
import styles from "../styles/components/card_clothes.module.scss"
import { useRouter } from "next/router";
import LoadingModal from "./modal_loading";
import { useState } from "react";


interface Props {
    urlImagen: string,
    nombre: string,
    precio: number,
    descripcion: string,
    codigo: string,
    stock: number,
    categoriaId: number
}
const CardClothes = ({ urlImagen, nombre, precio, descripcion, codigo, stock, categoriaId }: Props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const addToCarrito = () => {
        setLoading(true)
        let carrito = JSON.parse(localStorage.getItem('carrito')) ?? []
        const indexFind = carrito.findIndex(p => Number(p.codigo) === Number(codigo));
        
        if (indexFind != -1) {
            carrito[indexFind] = {
                codigo,
                cantidad: (Number(carrito[indexFind].cantidad) + 1),
                nombre,
                precio,
                descripcion,
                urlImagen,
                stock,
                categoriaId
            }
            localStorage.setItem('carrito', JSON.stringify(carrito))
            setLoading(false)
            router.push('/carrito')
            return
        }
        carrito.push({
            codigo,
            cantidad: 1,
            nombre,
            precio,
            descripcion,
            urlImagen,
            stock,
            categoriaId
        })
        localStorage.setItem('carrito', JSON.stringify(carrito))
        setLoading(false)
        router.push('/carrito')
    }
    return <div className={styles.container}>
        {loading ? <LoadingModal /> : null}
        <Image onClick={() => router.push('/clothets/ver?id=' + codigo)} src={`https://drive.google.com/uc?export=view&id=${urlImagen}`} width={300} height={300} alt="" className={styles.image} />
        <div className={styles.contentCard}>
            <div className={styles.sectionCard} onClick={() => router.push('/clothets/ver?id=' + codigo)}>
                <div className={styles.headerCard}>
                    <span>{nombre}</span>
                    <span>{precio}</span>
                </div>
                <span>{descripcion}</span>
            </div>

            <button onClick={() => addToCarrito()}>Agregar al carrito</button>
        </div>
    </div>
}

export default CardClothes;