import React from 'react';

function DoSearch() {
  return (
    <div
      style={{
        width: 64,
        height: 64,
        paddingBottom: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <div style={{ width: 24, height: 24, position: 'relative' }}>
        <div
          style={{
            width: 20,
            height: 20,
            background: 'black',
          }}
        ></div>
      </div>
      <div
        style={{
          color: 'black',
          fontSize: 12,
          fontFamily: 'Roboto',
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        検索
      </div>
    </div>
  );
}

export default DoSearch;
