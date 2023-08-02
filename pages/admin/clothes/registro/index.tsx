import InputGroup from "../../../../components/input_group";
import Layout from "../../../../components/layout";
import styles from "../../../../styles/admin/register_clothes.module.scss"
import PhotoUploader from "../../../../components/photo_upload";
import { useEffect, useState } from "react";
import { apiRestGet, apiRestPost } from "../../../../services/auth";
import { useRouter } from "next/router";
import LoadingModal from "../../../../components/modal_loading";

const RegistroClothes = () => {

        const router = useRouter();
        const [loading, setLoading] = useState(false);
        const [formValues, setFormValues] = useState({
            nombre: '',
            stock: '',
            categoria: '',
            precio: '',
            descripcion: '',
            foto: null,
        });

        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        };

        const handlePhotoChange = (photoData) => {
            setFormValues((prevValues) => ({
                ...prevValues,
                foto: photoData,
            }));
        };

        const handleGuardar = async (event) => {
            event.preventDefault();
            setLoading(true);
            const formData = new FormData();
            const correo = (JSON.parse(localStorage.getItem('login'))).correo;
            formData.append('nombre', formValues.nombre);
            formData.append('stock', formValues.stock);
            formData.append('categoriaId', formValues.categoria);
            formData.append('precio', formValues.precio);
            formData.append('foto', formValues.foto);
            formData.append('descripcion', formValues.descripcion);
            formData.append('usuarioId', correo)
            const response = await apiRestPost('producto', formData)
            if (response.nombre) {
                router.push('/admin/clothes/consulta')
                setLoading(false)
            }
        };

        const getData = async () => {
            const response = await apiRestGet('producto/buscar?codigo='+router.query.id);
            setFormValues(response);
            setFormValues((prevValues) => ({
                ...prevValues,
                categoria: response.categoriaId,
            }));
        }

        

        useEffect(() => {
            if (router.query.id) {
                getData()
            }
        }, [router.query.id])
        return <Layout>
            {loading ? <LoadingModal /> : null}
            <div className={styles.container}>
                <h2>Registro Ropa</h2>
                <form className={styles.formContainer}>
                    <PhotoUploader onPhotoChange={handlePhotoChange} value={formValues.foto}/>
                    <InputGroup label="Nombre" onChange={handleInputChange} name="nombre" value={formValues.nombre}/>
                    <InputGroup label="Descripcion" onChange={handleInputChange} name="descripcion" value={formValues.descripcion}/>
                    <InputGroup label="Stock" onChange={handleInputChange} name="stock" value={formValues.stock}/>
                    <select name="categoria" id="" onChange={handleInputChange} value={formValues.categoria}>
                        <option value={null} selected>Seleccionar</option>
                        <option value={1}>Camisas</option>
                        <option value={2}>Chaquetas</option>
                        <option value={3}>Faldas</option>
                        <option value={4}>Pantalones</option>
                        <option value={5}>Sudaderas</option>
                        <option value={6}>Vestidos</option>
                    </select>
                    <InputGroup label="Precio" onChange={handleInputChange} name="precio" value={formValues.precio}/>
                    <button onClick={handleGuardar}>Guardar</button>
                </form>
            </div>
        </Layout>
    }

    export default RegistroClothes;