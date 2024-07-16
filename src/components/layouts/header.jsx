import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import logo from "../../assets/logo.png";

function Header() {
    const navigate = useNavigate();

    const goToHome = () => {
        if (window.location.pathname === "/") {
            window.location.reload();
        } else {
            navigate("/");
        }
    };

    return (
        <header className="d-flex justify-content-center align-items-center flex-column">
            <Link to="/" onClick={goToHome}>
                <LazyLoadImage
                    src={logo}
                    alt="Logo"
                    height={150}
                    effect="blur"
                />
            </Link>
        </header>
    );
}

export default Header;
