import React from 'react';

class CartCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleAddToCart = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div className="cart-counter-card">
        <div className="cart-header">
          <svg className="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span className="cart-badge">{this.state.count}</span>
        </div>
        <div className="cart-body">
          <h2 className="cart-title">Giỏ Hàng Của Bạn</h2>
          <p className="cart-description">Nhấp vào nút bên dưới để thêm sản phẩm vào giỏ hàng.</p>
          <button className="cart-button" onClick={this.handleAddToCart}>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    );
  }
}

export default CartCounter;
