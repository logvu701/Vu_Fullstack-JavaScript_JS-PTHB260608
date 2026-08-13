class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public makeSound(): void {
        console.log("Some generic animal sound");
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    public makeSound(): void {
        console.log("Woof!");
    }
}

const myDog = new Dog("Buddy");
console.log(myDog.name);
myDog.makeSound();
