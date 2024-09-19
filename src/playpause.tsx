import React from 'react';

function Playpause() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        display: 'inline-flex',
      }}
    >
      <div style={{ width: 45, height: 30, position: 'relative' }}>
        <div
          style={{
            width: 30,
            height: 30,
            left: 0,
            top: 0,
            position: 'absolute',
          }}
        >
          <div
            style={{
              width: 18.75,
              height: 25,
              left: 5,
              top: 2.5,
              position: 'absolute',
              background: 'black',
            }}
          ></div>
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            left: 15,
            top: 0,
            position: 'absolute',
          }}
        >
          <div
            style={{
              width: 18.75,
              height: 25,
              left: 5,
              top: 2,
              position: 'absolute',
              background: 'black',
            }}
          ></div>
        </div>
      </div>
      <img
        style={{ width: 80, height: 80 }}
        src="https://via.placeholder.com/80x80"
      />
      <div style={{ width: 45, height: 30, position: 'relative' }}>
        <div
          style={{
            width: 30,
            height: 30,
            left: 45,
            top: 30,
            position: 'absolute',
            transform: 'rotate(-180deg)',
            transformOrigin: '0 0',
          }}
        >
          <div
            style={{
              width: 18.75,
              height: 25,
              left: 5,
              top: 2.5,
              position: 'absolute',
              background: 'black',
            }}
          ></div>
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            left: 30,
            top: 30,
            position: 'absolute',
            transform: 'rotate(-180deg)',
            transformOrigin: '0 0',
          }}
        >
          <div
            style={{
              width: 18.75,
              height: 25,
              left: 5,
              top: 2,
              position: 'absolute',
              background: 'black',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Playpause;
