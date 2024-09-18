import React from 'react';

function Player() {
  return (
    <div
      style={{
        width: 360,
        height: 64,
        paddingRight: 20,
        background: '#F3EDF7',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        position: 'fixed', // Fixed position to the bottom
        bottom: 85,
        left: 8,
        zIndex: 1000, // Ensure it's on top of other content
        overflow: 'hidden', // Prevent content overflow
        boxSizing: 'border-box', // Include padding and border in element's total width and height
      }}
    >
      <div
        style={{
          width: 264,
          paddingLeft: 22,
          paddingRight: 11,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'relative', // Ensure overlay positioning is relative to this container
        }}
      >
        <div
          style={{
            display: 'flex',
            top: 0,
            left: 0,
            color: 'black',
            fontSize: 14,
            fontFamily: 'Roboto',
            fontWeight: '400',
            lineHeight: 20,
            letterSpacing: 0.25,
            wordWrap: 'break-word',
          }}
        >
          夜に塗られた水面
        </div>
        <div
          style={{
            display: 'flex',
            top: 20, // Adjust based on the text height
            left: 0,
            color: '#595959',
            fontSize: 12,
            fontFamily: 'Roboto',
            fontWeight: '400',
            lineHeight: 16,
            letterSpacing: 0.4,
            wordWrap: 'break-word',
          }}
        >
          ☆ ☆ ☆ ☆ ☆
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          position: 'relative', // Ensure icons are relative to this container
        }}
      >
        <div style={{ width: 24, height: 24, position: 'relative' }}>
          <div
            style={{
              width: 14,
              height: 14,
              position: 'absolute',
              transform: 'rotate(90deg)',
              transformOrigin: '0 0',
              background: 'black',
            }}
          ></div>
        </div>
        <div style={{ width: 24, height: 24, position: 'relative' }}>
          <div
            style={{
              width: 13,
              height: 12,
              position: 'absolute',
              background: '#1D1B20',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Player;
