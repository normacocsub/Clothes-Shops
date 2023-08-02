import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { apiRestGet, apiRestPost } from "../../services/auth";
import styles from "../../styles/ver.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import CompraModal from "../../components/modal_compra";

const VerRopa = () => {
    const router = useRouter();
    const [datos, setDatos] = useState(null);
    const [total, setTotal] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const getItems = async () => {
        const response = await apiRestGet('producto/buscar?codigo=' + router.query.id)
        if (response.codigo) {
            setDatos(response)
        }
    }

    const handleReduce = () => {
        if (total > 0) {
            setTotal((prevTotal) => prevTotal - 1);
        }
    };

    // Función para aumentar el contador
    const handleIncrease = () => {
        if (total < datos.stock) {
            setTotal((prevTotal) => prevTotal + 1);
        }
    };

    const comprar = async () => {
        setModalIsOpen(false)
        const login = JSON.parse(localStorage.getItem('login'))

        if (!login) {
            router.push('/login')
            return
        }
        setModalIsOpen(true)
    }



    const addToCarrito = () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) ?? []
        const indexFind = carrito.findIndex(p => Number(p.codigo) === Number(datos.codigo));

        const json = {
            codigo: datos.codigo,
            cantidad: total,
            nombre: datos.nombre,
            precio: datos.precio,
            descripcion: datos.descripcion,
            urlImagen: datos.urlImagen,
            stock: datos.stock,
            categoriaId: datos.categoriaId
        }
        if (indexFind != -1) {
            carrito[indexFind] = json
            localStorage.setItem('carrito', JSON.stringify(carrito))
            router.push('/carrito')
            return
        }
        carrito.push(json)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        router.push('/carrito')
    }
    useEffect(() => {
        if (router.query.id) {
            getItems()
        }
    }, [router.query.id])
    return <Layout>
        <CompraModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            datos={datos}
            total={total}
        />
        {
            datos?.codigo && <div className={styles.content}>
                <section className={styles.firstSection}>
                    <Image src={`https://drive.google.com/uc?export=view&id=${datos.urlImagen}`} width={600} height={600} alt="" className={styles.image} />
                </section>
                <section className={styles.secondSection}>
                    <div>
                        <h2>{datos.nombre}</h2>
                        <p>{datos.descripcion}</p>
                    </div>

                    <div className={styles.precioContainer}>
                        <hr />

                        <div className={styles.precio}>{Number(datos.precio).toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'COP', // Puedes cambiar esto según la moneda que desees mostrar (por ejemplo, 'USD' para dólares)
                        })}</div>

                        <hr />
                    </div>
                    <div className={styles.itemsCount}>
                        <div className={styles.contador}>
                            <div onClick={handleReduce}>
                                -
                            </div>
                            <span>
                                {total}
                            </span>
                            <div onClick={handleIncrease}>
                                +
                            </div>
                        </div>
                        <span>{datos.stock} items restantes</span>
                    </div>

                    <div className={styles.buttonShop}>
                        <button onClick={comprar}>Comprar</button>
                        <button onClick={addToCarrito}>Agregar Carrito</button>
                    </div>
                </section>
            </div>
        }
    </Layout>
}

export default VerRopa;