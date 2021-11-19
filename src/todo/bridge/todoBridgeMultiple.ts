import { useEffect, useState } from "react";
import TodosStore, { TodoAction, TodosStateUI } from "../logic/todosStore";

function createBridge(store: TodosStore){
    const listeners: Array<Function> = [];

    async function dispatch(action: TodoAction) {
        const hasChanged = await store.handleAction(action);
        if (hasChanged) {
            listeners.forEach(fn => fn(store.state));
        }
    }

    function useTodoStore(): [TodosStateUI, (action: TodoAction) => Promise<void>]{
        const [totos, setTodos] = useState(store.state);

        useEffect(() => {
            listeners.push(setTodos);
            return () => {
                const index = listeners.indexOf(setTodos);
                listeners.splice(index, 1);
            }
        }, []);

        return [totos, dispatch];
    }

    return {useTodoStore};
}

//this can be stored in some central nice object
const store = new TodosStore();
//this can be store in a context
const bridge = createBridge(store);
export const useTodoStore = bridge.useTodoStore;