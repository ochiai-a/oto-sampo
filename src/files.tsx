function ListItem({ title }) {
  return (
    <div
      style={{
        width: 320,
        height: 40, // Increased height to accommodate title and date
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px #DEDEDE solid',
        paddingRight: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // Stack title and date vertically
          justifyContent: 'center',
          alignItems: 'flex-start', // Align items to the left
          flex: 1,
        }}
      >
        <div
          style={{
            color: '#1D1B20',
            fontSize: 14,
            fontFamily: 'Roboto',
            fontWeight: '400',
            lineHeight: 20,
            letterSpacing: 0.25,
            wordWrap: 'break-word',
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            marginRight: 10,
            background: '#555555',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: 13.33, height: 2.67, background: '#fff' }}></div>
        </div>
        <div
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'Roboto',
            fontWeight: '400',
          }}
        >
          ♡
        </div>
      </div>
    </div>
  );
}

// Functional component for the main app
function Files() {
  const items = [
    { title: '午前2時の踏切', date: '2022.8.3' },
    { title: '夜に塗られた水面', date: '2022.8.3' },
    { title: '月が引いた白金道', date: '2022.8.3' },
    { title: 'あなたに穿たれた心の穴', date: '2022.8.3' },
    { title: 'Kawasaki Factory', date: '2022.8.3' },
    { title: 'Strawberry', date: '2022.8.3' },
    { title: '邂逅', date: '2022.8.3' },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {items.map((item, index) => (
        <ListItem key={index} title={item.title} date={item.date} />
      ))}
    </div>
  );
}

export default Files;
