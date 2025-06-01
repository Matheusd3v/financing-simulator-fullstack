import Button from "../../../../../components/button";
import { Section } from "./style";

const BottomSection = () => {
    return (
        <Section>
            <div className="home-bottom-container">
                <h3>Pronto para investir no seu futuro?</h3>
                <p>
                    Faça uma simulação agora e descubra como podemos ajudar você
                    a alcançar seus objetivos educacionais
                </p>
                <Button size="max">Simular agora</Button>
            </div>
        </Section>
    );
};

export default BottomSection;
