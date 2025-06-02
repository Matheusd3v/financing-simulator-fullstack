import { Link } from "react-router-dom";
import { CardStyle } from "./style";
import { HomeIcon, UserIcon } from "lucide-react";
import { ROUTES } from "../../routes/constants";
import { useRef, useState } from "react";
import { hook } from "../../contexts";
import Button from "../button";
import Dropdown from "../dropdown";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { handleLogout, isAuthenticated } = hook.useAuth();
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <CardStyle>
            <div className="logo-container">
                <Link to={isAuthenticated ? ROUTES.dashboard : "/"}>
                    <HomeIcon />
                    <p>EduFinance</p>
                </Link>
            </div>

            {isAuthenticated ? (
                <Button
                    ref={buttonRef}
                    onClick={() => setShowDropdown(!showDropdown)}
                    variant="primary"
                >
                    <UserIcon size={16} />
                </Button>
            ) : (
                <Link className="sign-container" to={ROUTES.auth.login}>
                    <p>Entrar</p>
                </Link>
            )}
            {showDropdown && (
                <Dropdown
                    isOpen={showDropdown}
                    onClose={() => setShowDropdown(false)}
                    onLogout={handleLogout}
                    triggerRef={buttonRef}
                />
            )}
        </CardStyle>
    );
};

export default Navbar;
