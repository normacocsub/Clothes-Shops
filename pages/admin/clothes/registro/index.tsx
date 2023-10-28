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
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState(false);
    const [formValues, setFormValues] = useState({
        nombre: '',
        stock: '',
        categoria: '',
        precio: '',
        descripcion: '',
        proveedor: ''
    });
    const [isFormValid, setIsFormValid] = useState({
        nombre: false,
        stock: false,
        categoria: false,
        precio: false,
        descripcion: false,
        proveedor: false
    });
    const [formFoto, setFormFoto] = useState(null);

    const handleInputChange = (event, isValid) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        setIsFormValid((prevIsFormValid: any) => ({
            ...prevIsFormValid,
            [name]: isValid,
        }));
    };

    const calculateFormValidity = () => {
        for (const [name, isValid] of Object.entries(isFormValid)) {
            if (!isValid) {
                return false;
            }
        }
        return true;
    };

    const handlePhotoChange = (photoData) => {
        setFormFoto(photoData)
    };

    const handleGuardar = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(false)
        const formData = new FormData();
        formData.append('nombre', formValues.nombre);
        formData.append('stock', formValues.stock);
        formData.append('categoriaId', formValues.categoria);
        formData.append('precio', formValues.precio);
        formData.append('foto', formFoto);
        formData.append('descripcion', formValues.descripcion);
        formData.append('proveedorId', formValues.proveedor)
        const response = await apiRestPost('producto', formData)
        if (response.nombre) {
            router.push('/admin/clothes/consulta')
            setLoading(false)
            return
        }
        setError(true)
    };

    const consultarProveedores = async () => {
        const response = await apiRestGet('proveedor');
        if (response.length > 0) {
            setProveedores(response);
        }
    }

    const getData = async () => {
        const response = await apiRestGet('producto/buscar?codigo=' + router.query.id);
        setFormValues(response);
        setFormValues((prevValues) => ({
            ...prevValues,
            categoria: response.categoriaId,
        }));


    }

    useEffect(() => {
        consultarProveedores();
    }, [])

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
                <PhotoUploader onPhotoChange={handlePhotoChange} value={formFoto} />
                <InputGroup id="nombre" label="Nombre" onChange={handleInputChange} name="nombre" value={formValues.nombre}
                    required max={25} min={4} />
                <InputGroup id="descripcion" label="Descripcion" onChange={handleInputChange} name="descripcion" value={formValues.descripcion}
                    required max={50} min={10} />
                <InputGroup id="stock" label="Stock" onChange={handleInputChange} name="stock" value={formValues.stock}
                    required min={1} type="number" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="categoria">Categoria</label>
                    <select name="categoria" id="categoria" onChange={(e) => handleInputChange(e, true)} value={formValues.categoria}>
                        <option value={null} selected>Seleccionar</option>
                        <option value={1}>Camisas</option>
                        <option value={2}>Chaquetas</option>
                        <option value={3}>Faldas</option>
                        <option value={4}>Pantalones</option>
                        <option value={5}>Sudaderas</option>
                        <option value={6}>Vestidos</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="proveedor">Proveedor</label>
                    <select name="proveedor" id="proveedorSelect" onChange={(e) => handleInputChange(e, true)} value={formValues.proveedor}>
                        <option value={null} selected>Seleccionar</option>
                        {proveedores?.map((item, key) => {
                            return <option key={key} value={item.nit}>{item.nombre} {item.apellido}</option>
                        })}
                    </select>
                </div>
                <InputGroup label="Precio" id="precio" onChange={handleInputChange} name="precio" value={formValues.precio}
                    required min={1} type="number" />
                {error && <p>No se pudo guardar el producto, intente mas tarde</p>}
                <button id="registro" onClick={handleGuardar} disabled={!formFoto ? true : !calculateFormValidity()}>Guardar</button>
            </form>
        </div>
    </Layout>
}

export default RegistroClothes;