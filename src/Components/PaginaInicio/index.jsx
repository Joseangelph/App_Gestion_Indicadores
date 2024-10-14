import { useState } from "react"
import  Register  from "../Register";
import FormAutenticar from "../FormAutenticar";
import Logo from "./Logo.png";
import "./styles.css"

export const PaginaInicio = () => {

    // const [tieneCuenta, setTieneCuenta] = useState(true);
    const logo = Logo

    return (
    
    <div className="paginaInicio auth-page w-screen fixed h-screen">
        <div className="flex flex-col items-center mt-16">
            <img src={logo} alt="Logo" className="w-60 object-contain mb-4" />
            <FormAutenticar/>
            {/* {tieneCuenta ? <FormAutenticar setTieneCuenta={setTieneCuenta} /> : <Register setTieneCuenta={setTieneCuenta} />} */}
        </div>
        
    </div>)
}