import { CardStyle } from "./style";
import { HomeIcon } from "lucide-react";

const Navbar = () => {
    return (
        <CardStyle>
            <div className="logo-container">
                {/* <Link to="/"> */}
                <HomeIcon />
                <p>EduFinance</p>
                {/* </Link> */}
            </div>

            {/* <Link className="sign-container">Entrar</Link> */}
        </CardStyle>
    );
};

export default Navbar;
