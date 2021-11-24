import './App.css';
import {Todos, TodosMultiple} from '@todo';
//has todos is global
//user is global
function App() {
  return (
    <div className="App">
     <Todos />
     <TodosMultiple />
     <TodosMultiple />
     {/* <StateParent /> */}
     {/* <ContextParent /> */}
    </div>
  );
}

export default App;
