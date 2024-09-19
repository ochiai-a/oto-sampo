import React from 'react';

function GoLib() {
  return (
    <div
      style={{
        width: 64,
        height: 64,
        paddingBottom: 4,
        display: 'flex',
        flexDirection: 'column', // Ensures icon and text are arranged vertically
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <div style={{ width: 32, height: 32, position: 'relative' }}>
        <div
          style={{
            width: 32,
            height: 32,
            position: 'absolute',
            background: '#2C2C2C',
            borderRadius: '50%', // Circular icon
          }}
        />
        <div
          style={{
            width: 20,
            height: 20,
            position: 'absolute',
            left: 6,
            top: 6,
            background: 'white',
          }}
        ></div>
      </div>
      <div
        style={{
          color: 'black',
          fontSize: 12,
          fontFamily: 'Roboto',
          fontWeight: '600',
          textAlign: 'center', // Center the text
        }}
      >
        ライブラリ
      </div>
    </div>
  );
}

export default GoLib;
