// src/components/LayoutTester.jsx
// Temporary component for testing layout switching

import { useState, useEffect } from 'react';
import axios from 'axios';

function LayoutTester() {
  const [currentLayout, setCurrentLayout] = useState('loading...');
  const [bodyClass, setBodyClass] = useState('');

  useEffect(() => {
    checkCurrentLayout();
  }, []);

  const checkCurrentLayout = async () => {
    try {
      const response = await axios.get('http://26.41.72.16:5000/api/layout');
      setCurrentLayout(response.data.layout);
      setBodyClass(document.body.className);
    } catch (error) {
      console.error('Error fetching layout:', error);
    }
  };

  const switchLayout = async (newLayout) => {
    try {
      await axios.post('http://26.41.72.16:5000/api/layout', { layout: newLayout });
      alert(`Layout switched to ${newLayout}! Refreshing page...`);
      window.location.reload();
    } catch (error) {
      console.error('Error switching layout:', error);
      alert('Error switching layout. Make sure POST endpoint exists.');
    }
  };

  const manualSwitch = (layout) => {
    // Manually apply for testing without backend
    document.body.className = layout;
    document.getElementById('root').className = layout;
    setBodyClass(layout);
    alert(`Manually applied "${layout}" class. Check if styles changed!`);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      zIndex: 9999,
      minWidth: '280px',
      border: '2px solid #4f9cf9'
    }}>
      <h4 style={{ 
        margin: '0 0 15px 0', 
        color: '#043873',
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        🎨 Layout Control Panel
      </h4>

      <div style={{ marginBottom: '15px' }}>
        <strong style={{ fontSize: '13px', color: '#666' }}>Backend Layout:</strong>
        <div style={{ 
          background: currentLayout === 'modern' ? '#10b981' : '#ef4444',
          color: 'white',
          padding: '8px',
          borderRadius: '6px',
          marginTop: '5px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {currentLayout}
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong style={{ fontSize: '13px', color: '#666' }}>Body Class:</strong>
        <div style={{ 
          background: '#f3f4f6',
          padding: '8px',
          borderRadius: '6px',
          marginTop: '5px',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          {bodyClass || 'none'}
        </div>
      </div>

      <div style={{ 
        borderTop: '1px solid #e5e7eb',
        paddingTop: '15px',
        marginTop: '15px'
      }}>
        <p style={{ fontSize: '12px', margin: '0 0 10px 0', color: '#666' }}>
          <strong>Backend Switch:</strong>
        </p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
          <button
            onClick={() => switchLayout('classic')}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: '#043873',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            Classic
          </button>
          <button
            onClick={() => switchLayout('modern')}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: '#4f9cf9',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            Modern
          </button>
        </div>

        <p style={{ fontSize: '12px', margin: '15px 0 10px 0', color: '#666' }}>
          <strong>Manual Test (No Reload):</strong>
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => manualSwitch('classic')}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            Test Classic
          </button>
          <button
            onClick={() => manualSwitch('modern')}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            Test Modern
          </button>
        </div>
      </div>

      <button
        onClick={checkCurrentLayout}
        style={{
          width: '100%',
          padding: '8px',
          marginTop: '15px',
          background: '#ffe492',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '11px',
          fontWeight: 'bold'
        }}
      >
        🔄 Refresh Status
      </button>
    </div>
  );
}

export default LayoutTester;