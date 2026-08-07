const oldHardware = ["CPU", "RAM"];
const newHardware = ["SSD", "GPU"];
const allHardware = [...oldHardware, ...newHardware];
const updatedHardware = [...allHardware, "Monitor"];

console.log("Old Hardware:", oldHardware);
console.log("New Hardware:", newHardware);
console.log("All Hardware:", allHardware);
console.log("Updated Hardware:", updatedHardware);
