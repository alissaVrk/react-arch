import './App.css';
import { ContextParent } from './todo/stateUpdate/context';
import { StateParent } from './todo/stateUpdate/state';
function App() {
  return (
    <div className="App">
     <StateParent />
     <ContextParent />
    </div>
  );
}

export default App;
