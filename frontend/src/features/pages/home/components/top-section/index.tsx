import { Section } from "./style";
import Button from "../../../../../components/button";

const TopSection = () => {
    return (
        <Section>
            <h1>Realize seu sonho de formação acadêmica</h1>
            <p>
                Financiamento estudantil acessível e flexível para impulsionar
                sua carreira
            </p>

            <Button variant="secondary">Simular financiamento</Button>
            
        </Section>
    );
};

export default TopSection;
