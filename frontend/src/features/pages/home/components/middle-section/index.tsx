import ReasonCard from "../reason-card";
import { Section } from "./style";
import { GraduationCapIcon, ShieldIcon, TrendingUpIcon } from "lucide-react";

const MiddleSection = () => {
    return (
        <Section>
            <h2>Por que escolher nosso financiamento</h2>

            <div className="financing-cards-container">
                <ReasonCard>
                    <div className="financing-card-icon">
                        <GraduationCapIcon size={24} />
                    </div>
                    <h3>Educação acessível</h3>
                    <p>
                        Taxas de juros competitivas e prazos flexíveis para
                        tornar sua formação possível
                    </p>
                </ReasonCard>
                <ReasonCard>
                    <div className="financing-card-icon">
                        <TrendingUpIcon size={24} />
                    </div>
                    <h3>Educação acessível</h3>
                    <p>
                        Taxas de juros competitivas e prazos flexíveis para
                        tornar sua formação possível
                    </p>
                </ReasonCard>
                <ReasonCard>
                    <div className="financing-card-icon">
                        <ShieldIcon size={24} />
                    </div>
                    <h3> Processo seguro</h3>
                    <p>
                        Taxas de juros competitivas e prazos flexíveis para
                        tornar sua formação possível
                    </p>
                </ReasonCard>
            </div>
        </Section>
    );
};

export default MiddleSection;
