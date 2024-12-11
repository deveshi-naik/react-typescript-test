import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import EmployeeTable from "./Table";
import EmployeeModal from "./Modal";
import axios from "axios";

interface Employee {
    id: number;
    name: string;
    position: string;
    department: string;
}

function ListOfEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

    const fetchEmployees = async () => {
        const response = await axios.get("/api/employees");
        setEmployees(response.data.employees);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleOpenModal = (employee: Employee | null, isViewingMode: boolean) => {
        setCurrentEmployee(employee);
        setIsViewing(isViewingMode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentEmployee(null);
        setIsViewing(false);
    };

    const handleSaveEmployee = async (employee: Employee) => {
        if (employee.id === 0) {
            await axios.post("/api/employees", employee);
        } else {
            await axios.put(`/api/employees/${employee.id}`, employee);
        }
        fetchEmployees();
    };

    const handleDeleteEmployee = async (id: number) => {
        await axios.delete(`/api/employees/${id}`);
        fetchEmployees();
    };

    return (
        <Box sx={{ maxWidth: 1000, margin: "auto", mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal(null, false)}
                >
                    Add Employee
                </Button>
            </Box>

            <EmployeeTable
                employees={employees}
                onEdit={(employee: Employee) => handleOpenModal(employee, false)}
                onView={(employee: Employee) => handleOpenModal(employee, true)}
                onDelete={handleDeleteEmployee}
            />

            <EmployeeModal
                isOpen={isModalOpen}
                isViewing={isViewing}
                employee={currentEmployee}
                onClose={handleCloseModal}
                onSave={handleSaveEmployee}
            />
        </Box>
    );
};

export default ListOfEmployees;
