import React from 'react';
import { AiOutlineHome, AiOutlinePlus, AiOutlinePieChart } from 'react-icons/ai';
import './BottomNav.css';

function BottomNav({ activeTab, setActiveTab, onAddClick }) {
  return (
    <div className="bottom-nav">
      <button 
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        <AiOutlineHome />
        <span>Home</span>
      </button>
      
      <button 
        className="nav-item add-btn"
        onClick={onAddClick}
      >
        <div className="plus-icon">
          <AiOutlinePlus />
        </div>
        <span>Create</span>
      </button>
      
      <button 
        className={`nav-item ${activeTab === 'analysis' ? 'active' : ''}`}
        onClick={() => setActiveTab('analysis')}
      >
        <AiOutlinePieChart />
        <span>Analysis</span>
      </button>
    </div>
  );
}

export default BottomNav;
