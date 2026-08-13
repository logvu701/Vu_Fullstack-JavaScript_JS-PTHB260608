class Employee {
    public name: string;
    private salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    public showInfo(): void {
        console.log(`Name: ${this.name}, Salary: ${this.salary}`);
    }
}

const emp = new Employee("John Doe", 50000);
emp.showInfo();

// emp.salary = 60000;
