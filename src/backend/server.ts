import { createServer, Model, Factory } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      employee: Model,
    },

    factories: {
      employee: Factory.extend({
        id(i: number) {
          return i + 1;
        },
        name(i: number) {
          return `Employee ${i + 1}`;
        },
        position(i: number) {
          const positions = ["Software Engineer", "Developer", "Designer", "Manager"];
          return positions[i % positions.length];
        },
        department(i: number) {
          const departments = ["Engineering", "HR", "Sales", "Marketing"];
          return departments[i % departments.length];
        },
      }),
    },

    seeds(server) {
      server.createList("employee", 10);
    },

    routes() {
      this.namespace = "api";

      this.get("/employees", (schema) => {
        return schema.all("employee");
      });

      this.post("/employees", (schema, request) => {
        const newEmployee = JSON.parse(request.requestBody);
        return schema.create("employee", newEmployee);
      });

      this.put("/employees/:id", (schema, request) => {
        const id = request.params.id;
        const updatedEmployee = JSON.parse(request.requestBody);
        const employee = schema.find("employee", id);
        return employee.update(updatedEmployee);
      });

      this.delete("/employees/:id", (schema, request) => {
        const id = request.params.id;
        schema.find("employee", id)?.destroy();
        return { message: "Employee deleted successfully" };
      });
    },
  });
}
