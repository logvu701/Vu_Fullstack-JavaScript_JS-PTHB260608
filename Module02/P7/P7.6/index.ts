enum OrderStatus {
    Pending,
    Shipped,
    Delivered
}

class Order {
    public status: OrderStatus;

    constructor(status: OrderStatus) {
        this.status = status;
    }
}

function checkOrder(order: Order): void {
    if (order.status === OrderStatus.Delivered) {
        console.log("Order finished");
    }
}

const myOrder = new Order(OrderStatus.Delivered);
checkOrder(myOrder);
