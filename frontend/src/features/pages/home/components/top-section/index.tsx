import { Section } from "./style";
import Button from "../../../../../components/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../../routes/constants";
import { UserPlusIcon } from "lucide-react";

const TopSection = () => {
    return (
        <Section>
            <h1>Invista no seu futuro acadêmico</h1>
            <div className="home-top-p">
                <p>
                    Financiamento estudantil acessível e flexível para
                    impulsionar sua carreira.
                </p>
                <p>Cadastre-se e faça uma simulação agora mesmo!</p>
            </div>

            <div className="top-section-btn-container">
                <Link to={ROUTES.register}>
                    <Button variant="secondary" fullWidth={true}>
                        <UserPlusIcon size={20} />
                        Criar conta
                    </Button>
                </Link>

                <Button variant="outline">Área do cliente</Button>
            </div>
        </Section>
    );
};

export default TopSection;
