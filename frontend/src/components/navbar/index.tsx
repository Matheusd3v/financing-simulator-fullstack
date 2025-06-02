import { Link } from "react-router-dom";
import { CardStyle } from "./style";
import { HomeIcon } from "lucide-react";
import { ROUTES } from "../../routes/constants";

const Navbar = () => {
    return (
        <CardStyle>
            <div className="logo-container">
                <Link to="/">
                    <HomeIcon />
                    <p>EduFinance</p>
                </Link>
            </div>

            <Link className="sign-container" to={ROUTES.auth.login}><p>Entrar</p></Link>
        </CardStyle>
    );
};

export default Navbar;
