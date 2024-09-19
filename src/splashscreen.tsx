function SplashScreen() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 61px)', // ヘッダーの高さ分を引く
        position: 'relative',
        fontFamily: 'Roboto, sans-serif',
        color: 'black',
        backgroundColor: 'yellow',
      }}
    >
      <div
        style={{
          width: 240,
          height: 240,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 240,
            height: 240,
            position: 'absolute',
            background: 'rgba(255, 222.06, 245.78, 0.08)',
            borderRadius: '9999px',
            border: '0.91px solid white',
          }}
        />
        <div
          style={{
            width: 230,
            height: 230,
            position: 'absolute',
            background: 'linear-gradient(242deg, #FF32C7 0%, #5642DD 100%)',
            borderRadius: '9999px',
            border: '0.91px solid white',
            top: 5,
            left: 5,
          }}
        />
        <div
          style={{
            width: 210,
            height: 210,
            position: 'absolute',
            borderRadius: '9999px',
            border: '1px solid white',
            top: 15,
            left: 15,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          color: 'white',
          fontSize: 24,
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 200,
          letterSpacing: 2.88,
          textAlign: 'center',
        }}
      >
        OTOSANPO♪
      </div>
    </div>
  );
}

export default SplashScreen;
