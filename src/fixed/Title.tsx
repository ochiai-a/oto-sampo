import React from 'react';

function Title() {
  return (
    <div
      style={{
        width: 360,
        height: 48,
        background: 'white',
        borderBottom: '1px #A0A0A0 solid',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'inline-flex',
      }}
    >
      <div
        style={{
          color: '#393939',
          fontSize: 24,
          fontFamily: 'Roboto',
          fontWeight: '200',
          letterSpacing: 2.88,
          paddingLeft: 24,
          wordWrap: 'break-word',
        }}
      >
        OTOSANPO♪
      </div>
      <div
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex',
          }}
        >
          <div
            style={{
              borderRadius: 100,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
            }}
          >
            <div
              style={{
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
                display: 'flex',
              }}
            >
              <div style={{ width: 24, height: 24, position: 'relative' }}>
                <div
                  style={{
                    width: 20.1,
                    height: 20,
                    left: 1.95,
                    top: 2,
                    position: 'absolute',
                    background: '#49454F',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Title;
