function TextInputBox() {
  return (
    <div
      className="TextInputBox"
      style={{ position: 'relative', width: 320, height: 32 }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#F0F0F0',
          borderRadius: 10,
          display: 'flex', // Use flexbox for centering
          alignItems: 'center', // Vertically center items
          justifyContent: 'left', // Horizontally center items
          marginBottom: 132,
        }}
      >
        <div
          style={{
            color: '#AAAAAA',
            fontSize: 16,
            fontFamily: 'Roboto',
            fontWeight: '400',
            wordWrap: 'break-word',
            paddingLeft: 10,
          }}
        >
          検索
        </div>
      </div>
    </div>
  );
}

export default TextInputBox;
