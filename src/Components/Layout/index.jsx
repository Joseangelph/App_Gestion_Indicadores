import './styles.css'

function Layout( { children }){

    return(
        <div className="layout relative flex flex-col items-center w-4/5">
            {children}
        </div>
    )

}

export default Layout