import './App.css';
import { ContextParent } from './stateUpdate/context';
import { NestedParent } from './stateUpdate/nestedState';
import { StateParent } from './stateUpdate/state';
function App() {
  return (
    <div className="App">
     <StateParent />
     <ContextParent />
     <NestedParent />
    </div>
  );
}

export default App;
