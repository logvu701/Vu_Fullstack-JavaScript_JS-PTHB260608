import React from 'react';
import PricingCard from './PricingCard';
import './App.css';

function App() {
  const plans = [
    {
      id: 1,
      tier: 'Gói Cơ Bản (Basic)',
      price: 199000,
      features: [
        'Truy cập tối đa 5 dự án',
        'Lưu trữ đám mây 10 GB',
        'Hỗ trợ qua Email (24h)',
        'Giao diện thống kê cơ bản'
      ],
      isHighlighted: false,
      accentColor: '#38bdf8'
    },
    {
      id: 2,
      tier: 'Gói Chuyên Nghiệp (Pro)',
      price: 499000,
      features: [
        'Không giới hạn số lượng dự án',
        'Lưu trữ đám mây 100 GB',
        'Hỗ trợ ưu tiên 24/7',
        'Phân tích chi tiết bằng AI',
        'Tích hợp API không giới hạn'
      ],
      isHighlighted: true,
      accentColor: '#6366f1'
    },
    {
      id: 3,
      tier: 'Gói Doanh Nghiệp (Enterprise)',
      price: 0,
      features: [
        'Hạ tầng máy chủ chuyên biệt',
        'Lưu trữ đám mây Custom',
        'Cam kết băng thông mạng SLA 99.9%',
        'Hỗ trợ quản lý chuyên trách riêng',
        'Tùy biến bảo mật nâng cao'
      ],
      isHighlighted: false,
      accentColor: '#ec4899'
    }
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Bảng Giá Dịch Vụ SaaS</h1>
        <p className="header-subtitle">Module Tái Sử Dụng Thành Phần Pricing Card</p>
      </header>
      <main className="main-content">
        <div className="pricing-grid">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              tier={plan.tier}
              price={plan.price}
              features={plan.features}
              isHighlighted={plan.isHighlighted}
              accentColor={plan.accentColor}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
