import React, { useState } from 'react';
import FAQItem from './FAQItem';

function FAQList() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      question: 'Vite là gì và tại sao nên dùng nó thay cho CRA?',
      answer: 'Vite là một build tool thế hệ mới có tốc độ khởi chạy dự án cực nhanh nhờ sử dụng ESM thuần túy của trình duyệt trong quá trình phát triển dev server và esbuild (viết bằng Go) để biên dịch code siêu tốc.'
    },
    {
      id: 2,
      question: 'Lifting State Up trong React là gì?',
      answer: 'Lifting State Up (nâng cao trạng thái) là kỹ thuật di chuyển trạng thái dùng chung từ các Component con lên Component cha gần nhất của chúng. Từ đó, Component cha đóng vai trò quản lý nguồn dữ liệu tin cậy duy nhất (Single Source of Truth) và phân phối xuống cho các con qua props.'
    },
    {
      id: 3,
      question: 'Sự khác biệt giữa Props và State?',
      answer: 'Props là dữ liệu được truyền từ Component cha xuống Component con và không thể thay đổi trực tiếp từ bên trong Component nhận (Read-Only). State là dữ liệu nội bộ được khởi tạo và quản lý bên trong chính Component đó, có thể thay đổi để kích hoạt việc render lại giao diện.'
    },
    {
      id: 4,
      question: 'Khi nào cần sử dụng Class Component thay vì Functional Component?',
      answer: 'Hầu hết các dự án React hiện đại đều sử dụng Functional Component kết hợp Hooks. Tuy nhiên, Class Component vẫn cần thiết khi bạn bảo trì các hệ thống cũ hoặc cần dùng các phương thức lifecycle chuyên biệt chưa có Hook tương đương hoàn toàn.'
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-list-container">
      {faqData.map((item, index) => (
        <FAQItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={activeIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

export default FAQList;
