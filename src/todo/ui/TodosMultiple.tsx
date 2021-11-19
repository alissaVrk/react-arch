import React, { useEffect } from "react";
import { useTodoStore } from "../bridge/todoBridgeMultiple"
import { Todo } from "../logic/todosStore";
import TodoItem from "./TodoItem";

const userId = "asdf"
function TodosMultiple(){
    const [data, dispatch] = useTodoStore();
    const titleRef = React.createRef<HTMLInputElement>();
    const descRef = React.createRef<HTMLTextAreaElement>()

    useEffect(() => {
        dispatch({name: "init", userId});
    }, [dispatch]);

    function addTodo() {
        const todo: Omit<Todo, "id"> = {
            title: titleRef.current?.value || "",
            description: descRef.current?.value || "",
            isDone: false
        }
        dispatch({name: "add", todo});
    }

    console.log("render list");
    return (

        <div style={{textAlign: "start"}}>
            <h4>Todos: {userId}</h4>
            <ul>
                {data?.todos?.map(todo => (
                <li key={todo.id}>
                    <TodoItem todoItem={todo} dispatch={dispatch} />
                </li>
                ))}
            </ul>
            <div>
                <h5>Add Todo</h5>
                <label htmlFor="title">title: </label>
                <input type="text" name="title" ref={titleRef}/>
                <label htmlFor="desc">description: </label>
                <textarea name="desc" ref={descRef} />
                <input type="button" value="Add" onClick={addTodo}/>
            </div>
        </div>
    )
}

export default TodosMultiple;