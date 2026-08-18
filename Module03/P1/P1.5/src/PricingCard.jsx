import React from 'react';

function PricingCard({ tier, price, features, isHighlighted, accentColor }) {
  const cardStyle = isHighlighted 
    ? { borderColor: accentColor, transform: 'scale(1.03)', boxShadow: `0 15px 35px -10px ${accentColor}1A` } 
    : { borderColor: 'rgba(99, 102, 241, 0.15)' };

  const buttonStyle = isHighlighted
    ? { background: `linear-gradient(135deg, ${accentColor} 0%, #4f46e5 100%)` }
    : { background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)' };

  return (
    <div className={`pricing-card ${isHighlighted ? 'highlighted' : ''}`} style={cardStyle}>
      {isHighlighted && <span className="popular-badge" style={{ backgroundColor: accentColor }}>BÁN CHẠY</span>}
      <div className="card-header">
        <h3 className="card-tier">{tier}</h3>
        <div className="card-price">
          {price && price > 0 ? (
            <>
              <span className="price-amount">{price.toLocaleString('vi-VN')}</span>
              <span className="price-currency"> VND</span>
              <span className="price-period">/tháng</span>
            </>
          ) : (
            <span className="price-contact">Liên hệ</span>
          )}
        </div>
      </div>
      <div className="card-divider"></div>
      <ul className="card-features">
        {features.map((feature, index) => (
          <li key={index} className="feature-item">
            <svg className="feature-check" fill="none" stroke={accentColor || '#6366f1'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="feature-text">{feature}</span>
          </li>
        ))}
      </ul>
      <button className="card-btn" style={buttonStyle}>
        {price && price > 0 ? 'Bắt đầu ngay' : 'Liên hệ ngay'}
      </button>
    </div>
  );
}

export default PricingCard;
