import { Link } from "react-router-dom";
import Button from "../../../../../components/button";
import { Section } from "./style";
import { ROUTES } from "../../../../../routes/constants";

const BottomSection = () => {
    return (
        <Section>
            <div className="home-bottom-container">
                <h3>Pronto para investir no seu futuro?</h3>
                <p>
                    Faça uma simulação agora e descubra como podemos ajudar você
                    a alcançar seus objetivos educacionais
                </p>
                <Link to={ROUTES.register}>
                    <Button size="max">Simular agora</Button>
                </Link>
            </div>
        </Section>
    );
};

export default BottomSection;
