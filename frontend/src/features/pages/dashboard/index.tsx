import { PlusIcon } from "lucide-react";
import Button from "../../../components/button";
import { Container } from "../../../style/container";
import { DashboardContainer } from "./style";
import SimulationCard from "./components/simulationCard";
import { useEffect, useState } from "react";
import type { ISimulation } from "../../../services/types/simulation.type";
import { Services } from "../../../services/data";
import Pagination from "../../../components/pagination";

function Dashboard() {
    const [simulations, setSimulations] = useState<ISimulation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    const fetchSimulations = async (page: number) => {
        try {
            setIsLoading(true);
            const response = await Services.Simulation.api.list({
                page: page,
                limit: itemsPerPage,
            });

            setSimulations(response.data || response); 
            setTotalPages(
                response.total || Math.ceil(response.total / itemsPerPage)
            );
        } catch (error) {
            console.error("Erro ao carregar simulações:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSimulations(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Container>
            <DashboardContainer>
                <div className="dashboard-header">
                    <h1>Minhas Simulações</h1>
                    <Button>
                        <PlusIcon size={16} />
                        Nova Simulação
                    </Button>
                </div>

                <div className="cards-container">
                    {isLoading ? (
                        <div>Carregando simulações...</div>
                    ) : simulations.length > 0 ? (
                        simulations.map((simulation) => (
                            <SimulationCard
                                createdAt={simulation.createdAt}
                                installments={simulation.installments}
                                monthlyInstallment={
                                    simulation.monthlyInstallment
                                }
                                monthlyInterest={simulation.monthlyInterest}
                                total={simulation.total}
                                key={simulation.uuid}
                            />
                        ))
                    ) : (
                        <div>Nenhuma simulação encontrada</div>
                    )}
                </div>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </DashboardContainer>
        </Container>
    );
}

export default Dashboard;
