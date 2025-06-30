import React, { useState, useRef, useEffect } from 'react';
import './Menu.css';

function Menu({onClose}: {onClose: () => void}) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="menu-container" ref={menuRef}>
        <ul className="menu-dropdown">
          <li className="menu-item" onClick={() => alert('Profile clicked')}>Profile</li>
          <li className="menu-item" onClick={() => alert('Settings clicked')}>Settings</li>
          <li className="menu-item" onClick={() => alert('Logout clicked')}>Logout</li>
        </ul>
    </div>
  );
}

export default Menu;
