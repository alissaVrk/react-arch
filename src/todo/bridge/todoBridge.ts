import { useEffect, useState } from "react";
import TodosStore from "../logic/todosStore";

export function createTodosBridge(store: TodosStore) {
    function useTodoStore(userId: string) {
        const [todos, setTodos] = useState(store.defaultStateUI);
    
        useEffect(() => {
            store.handleAction({name: "init", userId});
        }, [])
    }
    return {
        useTodoStore
    }
}
