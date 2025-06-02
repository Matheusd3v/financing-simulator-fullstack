import React, { useRef, useEffect } from "react";
import { Settings, LogOut } from "lucide-react";
import { DropdownButton, DropdownContainer, DropdownItem } from "./style";
import { ROUTES } from "../../routes/constants";

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
    triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

const Dropdown: React.FC<DropdownProps> = ({
    isOpen,
    onClose,
    onLogout,
    triggerRef,
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const clickedOutsideDropdown =
                dropdownRef.current && !dropdownRef.current.contains(target);
            const clickedOutsideTrigger =
                triggerRef?.current && !triggerRef.current.contains(target);

            if (clickedOutsideDropdown && clickedOutsideTrigger) {
                onClose();
            }
        };

        if (isOpen) {
            const timeoutId = setTimeout(() => {
                document.addEventListener("mousedown", handleClickOutside);
            }, 0);

            return () => {
                clearTimeout(timeoutId);
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose, triggerRef]);

    if (!isOpen) return null;

    const handleLogoutClick = () => {
        onClose();
        onLogout();
    };

    return (
        <DropdownContainer ref={dropdownRef}>
            <DropdownItem to={ROUTES.student.profile} onClick={onClose}>
                <Settings size={16} />
                Editar Perfil
            </DropdownItem>

            <DropdownButton onClick={handleLogoutClick}>
                <LogOut size={16} />
                Sair
            </DropdownButton>
        </DropdownContainer>
    );
};

export default Dropdown;
