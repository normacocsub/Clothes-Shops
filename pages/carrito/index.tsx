import styles from '../../styles/carrito.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsXCircle } from "react-icons/bs"
import { apiRestPost } from '../../services/auth';
import { useEffect, useState } from 'react';

const Carrito = () => {
    const router = useRouter();
    const [carrito, setCarrito] = useState([])
    const [total, setTotal] = useState(0)

    const confirmCompra = async () => {
        const login = JSON.parse(localStorage.getItem('login'))
        if (!login) {
            router.push('/login')
            return
        }
        const jsonUser = {
            cedula: '',
            nombre: '',
            apellido: '',
            direccion: '',
            correo: login.correo,
            hashPassword: '',
            genero: '',
            telefono: ''
        }


        let detalles = []
        carrito.forEach((item) => {
            var json = {
                id: 0,
                cantidad: item.cantidad,
                precioUnitario: item.precio,
                fecha: (new Date()).toISOString(),
                producto: item,
                productoId: item.codigo
            }
            json.producto.usuarioId = jsonUser.correo
            json.producto.usuario = jsonUser
            detalles.push(json);
        })





        let jsonCompra = {
            id: 0, fecha: (new Date()).toISOString(), total: total,
            detalles: detalles, cliente: jsonUser, idCliente: jsonUser.correo, estado: "Activo"
        }

        const response = await apiRestPost('factura', jsonCompra)
        if (response.total) {
            localStorage.removeItem("carrito")
            router.push('/compras/mis_compras')
        }
    }

    const deleteProduct = (index) => {
        const carritoD = [...carrito];
        carritoD.splice(index, 1);
        setCarrito(carritoD);
    }

    const handleReduce = (index) => {
        if (carrito[index].cantidad > 0) {
            const updatedCarrito = [...carrito];
            updatedCarrito[index] = {
                ...updatedCarrito[index],
                cantidad: updatedCarrito[index].cantidad - 1
            };
            setCarrito(updatedCarrito);
        }
    };

    const handleIncrease = (index, item) => {
        if (carrito[index].cantidad < item.stock) {
            const updatedCarrito = [...carrito];
            updatedCarrito[index] = {
                ...updatedCarrito[index],
                cantidad: updatedCarrito[index].cantidad + 1
            };
            setCarrito(updatedCarrito);
        }
    };


    useEffect(() => {
        
        const carritoLocal = JSON.parse(localStorage.getItem("carrito")) ?? []
        
        
        setCarrito(carritoLocal)
    }, [])

    useEffect(() => {
        let totalCarrito = 0;
        carrito.forEach(element => {
            totalCarrito += Number(element.precio * element.cantidad)
            setTotal(totalCarrito)
        });
    }, [carrito])
    return <div className={styles.content}>
        <div className={styles.closeCarrito}>
            <BsXCircle onClick={() => { router.push('/') }} />
        </div>
        <div className={styles.containerSection}>
            <div className={styles.firstSection}>
                <section className={styles.items}>
                    <h2>Resumen Compra</h2>
                    {
                        (carrito ?? []).map((item, index) => {
                            return <div className={styles.item} key={index}>
                                <Image src={`https://drive.google.com/uc?export=view&id=${item.urlImagen}`} width={200} height={200} alt="" />
                                <h2>{item.nombre}</h2>
                                <div className={styles.info}>
                                    <span>{Number(item.precio).toLocaleString('es-ES', {
                                        style: 'currency',
                                        currency: 'COP', // Puedes cambiar esto según la moneda que desees mostrar (por ejemplo, 'USD' para dólares)
                                    })}</span>
                                    <div className={styles.contador}>
                                        <div onClick={() => handleReduce(index)}>
                                            -
                                        </div>
                                        <span>
                                            {item.cantidad}
                                        </span>
                                        <div onClick={() => handleIncrease(index, item)}>
                                            +
                                        </div>
                                    </div>
                                </div>
                                <BsXCircle className={styles.iconDelete} onClick={() => deleteProduct(index)}/>
                            </div>
                        })
                    }
                </section>
            </div>
            <div className={styles.secondSection}>
                <div>
                    Total: {Number(total).toLocaleString('es-ES', {
                        style: 'currency',
                        currency: 'COP',
                    })}
                </div>
                <div className={styles.buttons}>
                    <button onClick={confirmCompra}>Comprar</button>
                    <button onClick={() => router.push('/clothets')}>Seguir Compra</button>
                </div>
            </div>
        </div>

    </div>
}

export default Carrito;