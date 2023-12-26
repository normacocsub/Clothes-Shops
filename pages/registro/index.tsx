import Layout from "../../components/layout"
import UserRegister from "../../components/user_register"

const Registro = () => {
    const Test = () => { 
        console.log("test")
    } 
    return <Layout>
        <UserRegister title="Registro Usuario" />
    </Layout>
}

export default Registro