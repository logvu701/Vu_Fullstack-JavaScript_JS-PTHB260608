abstract class PaymentMethod {
    public abstract processPayment(amount: number): void;
}

class CreditCardPayment extends PaymentMethod {
    public processPayment(amount: number): void {
        console.log(`Processing credit card payment of $${amount}`);
    }
}

class PaypalPayment extends PaymentMethod {
    public processPayment(amount: number): void {
        console.log(`Processing PayPal payment of $${amount}`);
    }
}

const creditCard = new CreditCardPayment();
creditCard.processPayment(100);

const paypal = new PaypalPayment();
paypal.processPayment(250);
