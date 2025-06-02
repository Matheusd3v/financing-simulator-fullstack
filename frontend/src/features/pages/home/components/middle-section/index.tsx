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
                    <h3>Processo simplificado</h3>
                    <p>
                       Simulação online personalizada e aprovação rápida para começar seus estudos
                    </p>
                </ReasonCard>
                <ReasonCard>
                    <div className="financing-card-icon">
                        <ShieldIcon size={24} />
                    </div>
                    <h3> Suporte completo</h3>
                    <p>
                        Acompanhamento durante toda sua jornada acadêmica com nossa equipe especializada
                    </p>
                </ReasonCard>
            </div>
        </Section>
    );
};

export default MiddleSection;
