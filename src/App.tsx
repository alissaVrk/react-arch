import './App.css';
import Todos from './todo/ui/Todos';
import TodosMultiple from './todo/ui/TodosMultiple';
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
