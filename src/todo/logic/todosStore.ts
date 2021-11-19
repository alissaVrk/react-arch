import { addDesc, addTodo, getTodosDescs, getUserTodos, TodoDB, TodoDescriptionDB, updateTodo } from "../../server/todos";

export type Todo = {
    id: string,
    title: string,
    description: string,
    isDone: boolean
}

export type TodoAction = 
        {name: 'init', userId: string} | 
        {name: 'add', todo: Omit<Todo, "id">} |
        {name: 'delete', todoId: string} |
        {name: "markAsDone", todoId: string};

export type TodosStateUI = {
    loading: boolean,
    todos: Array<Todo>,
    error: null
}

const defaultState = {
    loading: true,
    todos: [],
    error: null
};
function getTodo(todo: TodoDB, desc: TodoDescriptionDB): Todo {
    return {...todo, description: desc.description}
}
export default class TodosStore {
    private userId: string | undefined;
    private immutableData: TodosStateUI = defaultState;
    
    async load(userId: string) {
        if (this.userId && userId !== this.userId) {
            this.immutableData = defaultState;
        }
        this.userId = userId;
        const todos = await getUserTodos(userId)
        const descIds = todos.map(t => t.descId);
        const descs = await getTodosDescs(descIds);
        this.immutableData.todos = todos.map((t, index) => getTodo(t, descs[index]))
        this.immutableData.loading = false;
        return true;
    }

    async add(todo: Omit<Todo, "id">) {
        if (!this.userId) {
            throw new Error("");
        }
        this.immutableData = {...this.immutableData, loading:true};
        const desc = await addDesc({description: todo.description});
        const newTodo = await addTodo({...todo, userId: this.userId, descId: desc.id});
        this.immutableData = {...this.immutableData, todos: [...this.immutableData.todos, getTodo(newTodo, desc)], loading: false}
        return true;
    }

    async markAsDone(todoId: string) {
        this.immutableData = {...this.immutableData, loading:true};
        updateTodo({id: todoId, isDone: true});
        const todoIndex = this.immutableData.todos.findIndex(t => t.id === todoId);
        const newTodos = [...this.immutableData.todos];
        newTodos[todoIndex] = {...newTodos[todoIndex], isDone: true};
        this.immutableData = {...this.immutableData, todos: newTodos, loading: false}
        return true;
    }

    async handleAction(action: TodoAction) {
        let hasChanged = false;
        switch(action.name) {
            case "init": 
                hasChanged = await this.load(action.userId);
                break;
            case "add":
                hasChanged = await this.add(action.todo);
                break;
            case "delete": 
                break;
            case "markAsDone":
                hasChanged = await this.markAsDone(action.todoId);
        }
        return hasChanged;
    }

    get state() {
        return this.immutableData;
    }
}