import React from 'react';

function Player() {
  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
    <div style={{width: 360, height: 21, paddingLeft: 126, paddingRight: 126, left: 0, top: 667, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 108, height: 4, background: '#1D1B20', borderRadius: 12}} />
    </div>
    <div style={{width: 360, paddingLeft: 20, paddingRight: 20, left: 0, top: 629, position: 'absolute', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 24, height: 24, position: 'relative'}}>
            <div style={{width: 24, height: 24, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 18, height: 20, left: 3, top: 2, position: 'absolute', background: 'black'}}></div>
            </div>
            <div style={{width: 4, height: 0, left: 14, top: 4, position: 'absolute', transform: 'rotate(45deg)', transformOrigin: '0 0', border: '1.20px black solid'}}></div>
            <div style={{width: 6, height: 0, left: 17, top: 6.24, position: 'absolute', transform: 'rotate(-45deg)', transformOrigin: '0 0', border: '1.20px black solid'}}></div>
        </div>
        <div style={{width: 24, height: 24, position: 'relative'}}>
            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: 'black'}}></div>
        </div>
        <div style={{width: 24, height: 24, position: 'relative'}}>
            <div style={{width: 22.05, height: 22.02, left: 0.97, top: 1, position: 'absolute', background: 'black'}}></div>
        </div>
    </div>
    <div style={{width: 360, left: 0, top: 500, position: 'absolute', justifyContent: 'center', alignItems: 'center', gap: 30, display: 'inline-flex'}}>
        <div style={{width: 45, height: 30, position: 'relative'}}>
            <div style={{width: 30, height: 30, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 18.75, height: 25, left: 5, top: 2.50, position: 'absolute', background: 'black'}}></div>
            </div>
            <div style={{width: 30, height: 30, left: 15, top: 0, position: 'absolute'}}>
                <div style={{width: 18.75, height: 25, left: 5, top: 2, position: 'absolute', background: 'black'}}></div>
            </div>
        </div>
        <img style={{width: 80, height: 80}} src="https://via.placeholder.com/80x80" />
        <div style={{width: 45, height: 30, position: 'relative'}}>
            <div style={{width: 30, height: 30, left: 45, top: 30, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0'}}>
                <div style={{width: 18.75, height: 25, left: 5, top: 2.50, position: 'absolute', background: 'black'}}></div>
            </div>
            <div style={{width: 30, height: 30, left: 30, top: 30, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0'}}>
                <div style={{width: 18.75, height: 25, left: 5, top: 2, position: 'absolute', background: 'black'}}></div>
            </div>
        </div>
    </div>
    <div style={{height: 28, paddingLeft: 22, paddingRight: 22, left: 0, top: 417, position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
        <div style={{textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Roboto', fontWeight: '700', wordWrap: 'break-word'}}>夜に塗られた水面</div>
    </div>
    <div style={{width: 240, height: 240, left: 60, top: 94, position: 'absolute'}}>
        <div style={{width: 240, height: 240, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(180deg, #FF82C5 0%, #3F00C6 100%)', borderRadius: 9999}} />
        <div style={{width: 230, height: 230, left: 5, top: 5, position: 'absolute', opacity: 0.50, background: 'white', borderRadius: 9999}} />
        <div style={{width: 210.09, height: 210.09, left: 15, top: 14.91, position: 'absolute', background: '#D9D9D9', borderRadius: 9999}} />
        <div style={{width: 210.09, height: 210.09, left: 15, top: 15, position: 'absolute', borderRadius: 9999, border: '1px #FF32C7 solid'}} />
    </div>
    <div style={{width: 296, height: 296, left: 32, top: 66, position: 'absolute'}}>
        <img style={{width: 296, height: 296, left: 0, top: 0, position: 'absolute'}} src="https://via.placeholder.com/296x296" />
        <div style={{width: 24, height: 24, left: 46, top: 21, position: 'absolute'}}>
            <div style={{width: 24, height: 24, left: 0, top: 0, position: 'absolute', background: '#E16AFF', borderRadius: 9999}} />
            <div style={{width: 14, height: 14, left: 5, top: 5, position: 'absolute', background: '#FF9CE3', borderRadius: 9999}} />
        </div>
    </div>
    <div style={{width: 360, height: 24, paddingLeft: 22, paddingRight: 22, left: 0, top: 13, position: 'absolute', justifyContent: 'center', alignItems: 'center', gap: 86, display: 'inline-flex'}}>
        <div style={{width: 24, height: 24, position: 'relative'}}>
            <div style={{width: 12, height: 6, left: 6, top: 9, position: 'absolute', border: '3px black solid'}}></div>
        </div>
    </div>
</div>
  );
}

export default Player;
