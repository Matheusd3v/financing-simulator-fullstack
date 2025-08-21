import { PlusIcon } from "lucide-react";
import Button from "../../../components/button";
import { Container } from "../../../style/container";
import { DashboardContainer } from "./style";
import SimulationCard from "./components/simulationCard";
import { useLayoutEffect, useState } from "react";
import type { ISimulation } from "../../../services/types/simulation.type";
import { Services } from "../../../services/data";
import Pagination from "../../../components/pagination";
import EditSimulationModal from "./components/editSimulationModal";
import CreateSimulationModal from "./components/createSimulationModal";
import { toast } from "react-toastify";

function Dashboard() {
    const [simulations, setSimulations] = useState<ISimulation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [simulationModal, setSimulationModal] = useState<ISimulation | null>(
        null
    );
    const [createModal, setCreateModal] = useState(false);
    const itemsPerPage = 8;
    // deixar paginação em um unico objeto
    // react-query
    // skeleton - transformar card & loading

    const fetchSimulations = async (page: number) => {
        try {
            setIsLoading(true);
            const response = await Services.Simulation.api.list({
                page: page,
                limit: itemsPerPage,
            });

            setSimulations(response.data || response);
            setTotalPages(
                response.lastPage || Math.ceil(response.lastPage / itemsPerPage)
            );
        } catch (error) {
            console.error("Erro ao carregar simulações:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useLayoutEffect(() => {
        fetchSimulations(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const closeModal = () => {
        setSimulationModal(null);
    };

    const onEdit = (simulation: ISimulation) => {
        setSimulationModal(simulation);
    };

    const deleteSimulation = async (uuid: string) => {
        await Services.Simulation.api.delete(uuid);
        toast.success("Simulação excluída!");
        await fetchSimulations(currentPage);
    };

    return (
        <Container>
            <DashboardContainer>
                <div className="dashboard-header">
                    <h1>Minhas Simulações</h1>
                    <Button onClick={() => setCreateModal(!createModal)}>
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
                                simulation={simulation}
                                key={simulation.uuid}
                                onEdit={onEdit}
                                onDelete={deleteSimulation}
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

                {simulationModal && (
                    <EditSimulationModal
                        onClose={closeModal}
                        simulation={simulationModal}
                        fetchSimulations={fetchSimulations}
                    />
                )}

                {createModal && (
                    <CreateSimulationModal
                        onClose={() => setCreateModal(!createModal)}
                        onSuccess={() => fetchSimulations(1)}
                    />
                )}
            </DashboardContainer>
        </Container>
    );
}

export default Dashboard;
