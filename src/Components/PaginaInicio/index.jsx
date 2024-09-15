import { useState } from "react"
import  Register  from "../Register";
import FormAutenticar from "../FormAutenticar";
import "./styles.css"

export const PaginaInicio = () => {

    const [tieneCuenta, setTieneCuenta] = useState(true);

    return (
    
    <div className="paginaInicio auth-page w-screen fixed h-screen">
        <div className="flex flex-col items-center mt-24">
            {tieneCuenta ? <FormAutenticar setTieneCuenta={setTieneCuenta} /> : <Register setTieneCuenta={setTieneCuenta} />}
        </div>
        
    </div>)
}