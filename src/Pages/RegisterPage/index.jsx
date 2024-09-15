
import Register from "../../Components/Register";
// import Logo from "./Logo.jpeg"
import './styles.css'


function RegisterPage() {


    return (
      <div className="register-page w-screen fixed h-screen ">
        <div className="flex flex-col items-center">
          <Register />
        </div>
      </div>
        
    )
}
  
  export default RegisterPage;