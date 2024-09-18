import Title from './fixed/Title';
import TextInputBox from './TextInputBox';
import Files from './files';
import Bigbutton from './bigbutton';
import Footer from '../fnb/footer.js';
import Player from './player';

function Library() {
  return (
    <>
      <div>
        <Title />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
          justifyContent: 'flex-start', // Align items to the top
          alignItems: 'flex-start', // Align items to the left
          height: 'calc(100vh - 124px)', // Adjust height to account for header (60px) and footer (64px)
          backgroundColor: 'white',
          width: 360,
          paddingLeft: 22,
          paddingRight: 22,
          boxSizing: 'border-box', // Ensure padding is included in width and height
        }}
      >
        <div>
          <h1>あなたの音</h1>
          <TextInputBox />
          <Bigbutton />
          <Files />
        </div>
      </div>
      <Player />
      <Footer />
    </>
  );
}

export default Library;
