//this is a one time bridge
//you cannot render the same component twice
import { useCallback, useState } from "react";
import TodosStore, {TodoAction, TodosStateUI} from "../logic/todosStore";

function createTodosBridge(store: TodosStore) {
    function useTodoStore(): [TodosStateUI, (action: TodoAction) => Promise<void>] {
        const [todos, setTodos] = useState(store.state);

        const dispatch = useCallback(async (action: TodoAction) => {
            const hasChanged = await store.handleAction(action);
            if (hasChanged) {
                setTodos(store.state);
            }
        }, [])

        return [todos, dispatch]
    }
    return {
        useTodoStore
    }
}
//this can be stored in some central nice object
const store = new TodosStore();
//this can be store in a context
const bridge = createTodosBridge(store);
export const useTodoStore = bridge.useTodoStore;

