import { useReducer, useState } from 'react';
import { cartReducer, initialState } from './reducers/cartReducer';
import type { Course } from './reducers/cartReducer';
import type { FC } from 'react';
import './App.css';

export const App: FC = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [promoInput, setPromoInput] = useState<string>('');
  const [errMessage, setErrMessage] = useState<string | null>(null);

  // Available courses on store
  const [availableCourses] = useState<Course[]>([
    {
      id: 101,
      title: 'Học ReactJS chuyên sâu 2026',
      price: 1200000,
      priceString: '1.200.000đ',
      banner: '⚛️',
      badge: 'React'
    },
    {
      id: 102,
      title: 'Advanced Node.js & Microservices',
      price: 1500000,
      priceString: '1.500.000đ',
      banner: '🟢',
      badge: 'Node.js'
    },
    {
      id: 103,
      title: 'Python for AI & Deep Learning',
      price: 2000000,
      priceString: '2.000.000đ',
      banner: '🐍',
      badge: 'Python'
    },
    {
      id: 104,
      title: 'UI/UX Mobile Design Figma',
      price: 800000,
      priceString: '800.000đ',
      banner: '🎨',
      badge: 'Figma'
    }
  ]);

  const handleAddToCart = (course: Course) => {
    setErrMessage(null);
    const alreadyExists = state.items.some((item) => item.id === course.id);
    
    if (alreadyExists) {
      // Show warning in UI
      setErrMessage(`Khóa học "${course.title}" đã được thêm vào giỏ hàng trước đó!`);
      return;
    }

    dispatch({ type: 'ADD_ITEM', payload: course });
  };

  const handleRemoveFromCart = (id: number) => {
    setErrMessage(null);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setErrMessage(null);
    
    const code = promoInput.toUpperCase().trim();
    if (code !== 'RIKKEI10' && code !== 'RIKKEI20') {
      setErrMessage('Mã giảm giá không hợp lệ! Hãy thử: RIKKEI10 hoặc RIKKEI20');
      return;
    }
    
    dispatch({ type: 'APPLY_PROMO', payload: code });
    setPromoInput('');
  };

  return (
    <div className="cart-app">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo">🛒</span>
          <h1 className="title">Rikkei Cart</h1>
          <span className="badge">State: useReducer</span>
        </div>
      </header>

      <main className="main-content">
        {errMessage && (
          <div className="cart-alert">
            <span className="alert-icon">⚠️</span>
            <span className="alert-text">{errMessage}</span>
            <button onClick={() => setErrMessage(null)} className="alert-close">✕</button>
          </div>
        )}

        <div className="cart-layout">
          {/* Left: Available courses */}
          <div className="store-section">
            <h3 className="section-title">Khóa học công nghệ</h3>
            <div className="store-grid">
              {availableCourses.map((course) => (
                <div key={course.id} className="store-card">
                  <div className="store-card-banner">{course.banner}</div>
                  <div className="store-card-body">
                    <span className="store-card-badge">{course.badge}</span>
                    <h4 className="store-card-title">{course.title}</h4>
                    <p className="store-card-price">{course.priceString}</p>
                    <button 
                      onClick={() => handleAddToCart(course)} 
                      className="add-to-cart-btn"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Shopping Cart Sidebar */}
          <div className="cart-sidebar">
            <div className="sidebar-header">
              <h3>Giỏ hàng của bạn</h3>
              <span className="items-count">{state.items.length} khóa học</span>
            </div>

            {state.items.length === 0 ? (
              <div className="empty-cart">
                <span className="empty-icon">🛒</span>
                <p>Chưa có sản phẩm nào. Hãy chọn khóa học bên trái!</p>
              </div>
            ) : (
              <>
                <ul className="cart-items">
                  {state.items.map((item) => (
                    <li key={item.id} className="cart-item">
                      <span className="item-banner">{item.banner}</span>
                      <div className="item-details">
                        <h4 className="item-title">{item.title}</h4>
                        <span className="item-price">{item.priceString}</span>
                      </div>
                      <button 
                        onClick={() => handleRemoveFromCart(item.id)} 
                        className="remove-item-btn"
                        title="Xóa khóa học"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="checkout-summary">
                  {/* Promo Form */}
                  <form onSubmit={handleApplyPromo} className="promo-form">
                    <input
                      type="text"
                      placeholder="Mã giảm giá (RIKKEI10, RIKKEI20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="promo-input"
                    />
                    <button type="submit" className="promo-btn">Áp dụng</button>
                  </form>

                  {state.promoCode && (
                    <div className="applied-promo">
                      <span>🏷️ Đã áp dụng mã: <strong>{state.promoCode}</strong></span>
                      <span className="discount-tag">Giảm {state.discountPercent}%</span>
                    </div>
                  )}

                  <div className="price-rows">
                    <div className="price-row">
                      <span>Tổng tiền gốc:</span>
                      <span>
                        {state.items.reduce((acc, item) => acc + item.price, 0).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    {state.discountPercent > 0 && (
                      <div className="price-row discount-row">
                        <span>Giảm giá ({state.discountPercent}%):</span>
                        <span>
                          -{(state.items.reduce((acc, item) => acc + item.price, 0) * state.discountPercent / 100).toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    )}
                    <div className="price-row total-row">
                      <span>Thành tiền:</span>
                      <span className="final-total">
                        {state.totalPrice.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => dispatch({ type: 'CLEAR_CART' })} 
                    className="clear-cart-btn"
                  >
                    Xóa tất cả sản phẩm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Rikkei Cart. Quản lý trạng thái phức hợp nguyên tử sử dụng useReducer.</p>
      </footer>
    </div>
  );
};

export default App;
