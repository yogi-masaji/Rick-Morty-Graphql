import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Header() {
    const refreshPage = () => {
        window.location.reload();
    };
    return (
        <header className="d-flex justify-content-center align-items-center flex-column">
            <Link to="/" onClick={refreshPage}>
                <img src={logo} alt="Logo" height={150} />
            </Link>
        </header>
    );
}

export default Header;
