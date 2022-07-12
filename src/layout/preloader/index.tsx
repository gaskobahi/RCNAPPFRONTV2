const Preloader =(prop:any)=>{
    return(
        <div className="preloader flex-column justify-content-center align-items-center">
          <img className="animation__shake" src="adminlte/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60"/>
        </div>
    )
}
export default Preloader;