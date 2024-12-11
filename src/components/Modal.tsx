import { Box, Modal, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { useState, useEffect } from "react";

interface Employee {
    id: number;
    name: string;
    position: string;
    department: string;
}

interface EmployeeModalProps {
    isOpen: boolean;
    isViewing: boolean;
    employee: Employee | null;
    onClose: () => void;
    onSave: (employee: Employee) => void;
}

function EmployeeModal({ isOpen, isViewing, employee, onClose, onSave }: EmployeeModalProps) {
    const [formData, setFormData] = useState<Employee>({
        id: 0,
        name: "",
        position: "",
        department: "",
    });

    useEffect(() => {
        if (employee) {
            setFormData(employee);
        } else {
            setFormData({ id: 0, name: "", position: "", department: "" });
        }
    }, [employee]);

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    width: 400,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {isViewing ? "Employee Details" : employee ? "Edit Employee" : "Add Employee"}
                </Typography>

                {isViewing && employee && (
                    <div>
                        <p><strong>Name:</strong> {employee.name}</p>
                        <p><strong>Position:</strong> {employee.position}</p>
                        <p><strong>Department:</strong> {employee.department}</p>
                    </div>
                )}

                {!isViewing && (
                    <>
                        <TextField
                            label="Name"
                            fullWidth
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Position</InputLabel>
                            <Select
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            >
                                <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                                <MenuItem value="Developer">Developer</MenuItem>
                                <MenuItem value="Designer">Designer</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Department</InputLabel>
                            <Select
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            >
                                <MenuItem value="Engineering">Engineering</MenuItem>
                                <MenuItem value="HR">HR</MenuItem>
                                <MenuItem value="Sales">Sales</MenuItem>
                                <MenuItem value="Marketing">Marketing</MenuItem>
                            </Select>
                        </FormControl>

                        <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>
                            {formData.id === 0 ? "Add" : "Save"}
                        </Button>
                    </>
                )}

                <Button onClick={onClose} variant="outlined" sx={{ mt: 2 }}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default EmployeeModal;
