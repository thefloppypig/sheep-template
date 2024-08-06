import './App.css'
import { ReactContainer } from './view/Container';
import Panel from './view/Panel';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { sheep } from './state/reducer';
import Nav from './view/Nav';

function App() {

  return (
    <>
      <Provider store={store}>
        <Nav />
        <div className='sheep'>
          <Panel />

          Drag the sheep below to move the camera
          <div>
            <ReactContainer className='canvas' child={sheep.app.view} />
          </div>
        </div>
      </Provider>
    </>
  )
}

export default App
