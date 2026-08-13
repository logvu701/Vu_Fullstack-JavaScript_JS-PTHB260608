class Shape {
    public calculateArea(): number {
        return 0;
    }
}

class Circle extends Shape {
    public radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    public calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    public width: number;
    public height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    public calculateArea(): number {
        return this.width * this.height;
    }
}

const circle = new Circle(5);
console.log(circle.calculateArea());

const rectangle = new Rectangle(4, 6);
console.log(rectangle.calculateArea());
