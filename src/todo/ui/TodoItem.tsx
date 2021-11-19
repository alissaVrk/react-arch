import React from "react";
import { Todo, TodoAction } from "../logic/todosStore";


function TodoItem({todoItem, dispatch}: {todoItem: Todo, dispatch: (action: TodoAction) => Promise<void>}){
    console.log("render item", todoItem.id);

    return (
        <div key={todoItem.id}>
            <h5>{todoItem.title}</h5>
            <input type="checkbox" 
                checked={todoItem.isDone} 
                onChange={(event) => event.target.checked ? dispatch({name: "markAsDone", todoId: todoItem.id }) : alert("not supported")}/>
            <span>{todoItem.description}</span>
        </div>
    )
}

// export default React.memo(TodoItem);
export default TodoItem;