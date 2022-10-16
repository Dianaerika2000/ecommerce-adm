import NavBarOption from './NavBarOption';

/**
 * Displays a Bootstrap Navbar
 * @param navBarOptions
 * @returns {JSX.Element}
 * @constructor
 */
export default function NavBar({ navBarOptions }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-ligth custom-nav">
      <div className="container custom-nav">
        <a className="navbar-brand" href="">
          <span className="material-symbols-outlined custom-color">restaurant</span>
          <h5 className="">Comida Tipica Suarez</h5>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto d-flex flex-wrap">
            {navBarOptions.main.map((navBarOption, index) => (
              <NavBarOption key={index} navBarOption={navBarOption} />
            ))}
          </ul>
          <ul className="navbar-nav">
            {navBarOptions.right.map((navBarOption, index) => (
              <NavBarOption key={index} navBarOption={navBarOption} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
