import React from 'react';

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button className="faq-question-btn" onClick={onToggle}>
        <span className="faq-question-text">{question}</span>
        <svg
          className={`faq-icon ${isOpen ? 'rotate' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div className={`faq-answer-wrapper ${isOpen ? 'expanded' : ''}`}>
        <div className="faq-answer-content">
          <p className="faq-answer-text">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FAQItem;
