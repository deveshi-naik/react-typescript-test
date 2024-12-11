import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

interface Employee {
    id: number;
    name: string;
    position: string;
    department: string;
}

interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onView: (employee: Employee) => void;
    onDelete: (id: number) => void;
}

function EmployeeTable({ employees, onEdit, onView, onDelete }: EmployeeTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    color="primary"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => onView(employee)}
                                >
                                    {employee.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={() => onEdit(employee)}
                                    sx={{ mr: 1 }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={() => onDelete(employee.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeTable;
