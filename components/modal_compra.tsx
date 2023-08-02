import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles/components/modal_compra.module.scss';
import { apiRestPost } from '../services/auth';
import { useRouter } from 'next/router';


const CompraModal = ({ isOpen, onRequestClose, datos, total }) => {
    const router = useRouter()

    const confirmCompra = async () => {

        let detalles = []
        var json = {
            id: 0,
            cantidad: total,
            precioUnitario: datos.precio,
            fecha: (new Date()).toISOString(),
            producto: datos,
            productoId: datos.codigo,
            
        }
        
        detalles.push(json);

        const login = JSON.parse(localStorage.getItem('login'))
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
        json.producto.usuarioId = jsonUser.correo
        json.producto.usuario = jsonUser
        let jsonCompra = { id: 0, fecha: (new Date()).toISOString(), total: (Number(datos.precio) * total), 
            detalles: detalles, cliente: jsonUser, idCliente: jsonUser.correo, estado: "Activo" }

        const response = await apiRestPost('factura', jsonCompra)
        if (response.total) {
            router.push('/compras/mis_compras')
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Resumen de la compra</h2>
                    <button onClick={onRequestClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <p>Resumen de la compra:</p>
                    <ul>
                        <li>Precio: {Number((datos?.precio * total) ?? 0).toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'COP', 
                        })}</li>

                    </ul>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmar} onClick={confirmCompra}>Confirmar</button>
                </div>
            </div>
        </Modal>
    );
};

export default CompraModal;
