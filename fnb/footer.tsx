import React from 'react';
import GoLib from './library.js';
import DoGen from './gen.js';
import DoSearch from './search.js';

function Footer() {
  return (
    <div
      style={{
        width: 360,
        position: 'fixed', // Makes the footer ignore margins and stick to the bottom
        bottom: 0, // Sticks it to the bottom
        left: 8, // Stretches to the left edge of the viewport
        right: 0, // Stretches to the right edge of the viewport
        background: '#F3EDF7',
        borderTop: '1px #D8D8D8 solid',
        display: 'flex',
        justifyContent: 'space-around', // Space the icons evenly
        alignItems: 'center',
        padding: '12px 0', // Add padding for visual spacing
        zIndex: 1000, // Ensures the footer stays above other content
      }}
    >
      <GoLib />
      <DoGen />
      <DoSearch />
    </div>
  );
}

export default Footer;
