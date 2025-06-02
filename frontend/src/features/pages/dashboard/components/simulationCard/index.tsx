import {
    CalendarIcon,
    ClockIcon,
    EditIcon,
    EyeIcon,
    PercentIcon,
    TrashIcon,
} from "lucide-react";
import { CardContainer } from "./style";
import { useState } from "react";

type CardProps = {
    total: string;
    installments: number;
    monthlyInterest: string;
    monthlyInstallment: string;
    createdAt: string;
};

function SimulationCard({
    createdAt,
    installments,
    monthlyInstallment,
    monthlyInterest,
    total,
}: CardProps) {
    const [showDetails, setShowDetails] = useState(false);
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };
    const formatDate = (date: string) => {
        const jsDate = new Date(date);
        const formatted = jsDate.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "America/Sao_Paulo",
        });
        return formatted;
    };
    return (
        <CardContainer $isExpanded={showDetails}> 
            <div className="simulation-icons">
                <button onClick={() => setShowDetails(!showDetails)}>
                    <EyeIcon size={18} />
                </button>

                <button>
                    <EditIcon size={18} />
                </button>

                <button>
                    <TrashIcon size={18} />
                </button>
            </div>
            <div className="monthly-installment">
                <div>{formatCurrency(+monthlyInstallment)}</div>
                <p>Parcela mensal</p>
            </div>
            <div className="total-value-simulaton">
                <div>
                    <div className="second-values">
                        {formatCurrency(+total)}
                    </div>
                    <p>Valor total</p>
                </div>
                <div>
                    <div className="second-values">{installments}x </div>
                    <p>Parcelas</p>
                </div>
            </div>

            {showDetails && (
                <div className="simulation-details">
                    <span>
                        <div>
                            <PercentIcon size={16} />
                            Taxa de juros
                        </div>
                        <p> {monthlyInterest}% a.a</p>
                    </span>
                    <span>
                        <div>
                            <ClockIcon size={16} />
                            Prazo:
                        </div>
                        <p>{installments} meses</p>
                    </span>
                    <span>
                        <div>
                            <CalendarIcon size={16} />
                            Data da simulação:
                        </div>
                        <p>{formatDate(createdAt)}</p>
                    </span>
                </div>
            )}
        </CardContainer>
    );
}

export default SimulationCard;
