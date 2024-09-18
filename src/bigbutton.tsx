function Bigbuttonitem({ title }) {
  return (
    <div
      style={{
        width: 152,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F0F0F0',
        borderRadius: 10,
        marginTop: 12,
        marginBottom: 12,
      }}
    >
      <span
        style={{
          color: '#FF0000',
          fontSize: 14,
          fontFamily: 'Roboto',
          fontWeight: '700',
          wordWrap: 'break-word',
        }}
      >
        {title}
      </span>
    </div>
  );
}

// Functional component for rendering multiple buttons
function Bigbutton() {
  const items = [{ title: '再生' }, { title: 'シャフル' }]; // Example array of items

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between', // Align buttons on left and right
        width: '100%',
      }}
    >
      {items.map((item, index) => (
        <div key={index}>
          <Bigbuttonitem title={item.title} />
        </div>
      ))}
    </div>
  );
}

export default Bigbutton;
