import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from 'react-router-dom';
function Header(){
    return(
        <>
          <div className="container-fluid p-5 bg-primary text-white">
        <div className="d-flex  align-items-center justify-content-between">
          <h1>Netflix</h1>

          <nav className="d-flex gap-4 ">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-decoration-underline text-black' : 'text-black'
              }
            >
              About
            </NavLink>
            <NavLink
              to="/info"
              className={({ isActive }) =>
                isActive ? 'text-decoration-underline text-black' : 'text-black'
              }
            >
              Info
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'text-decoration-underline text-black' : 'text-black'
              }
            >
              Login
            </NavLink>
          </nav>
        </div>
      </div>




        </>
    )
}
export default Header;