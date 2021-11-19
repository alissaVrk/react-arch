type User = {
    id: string,
    name?: string
}

type UserAction = {name: "login", id: string} 
| {name: "logout"}
| {name: "changeName", userName: string}

class UserStore {
    private immutableData: User | undefined;

    public handleAction(action: UserAction) {
        let changed = true;
        switch(action.name) {
            case "login":
                this.immutableData = {id: action.id}
                break;
            case "logout":
                this.immutableData = undefined;
                break;
            case "changeName":
                if (!this.immutableData) {
                    throw new Error("there is no user");
                }
                this.immutableData = {...this.immutableData, name: action.userName}
                break;
            default:
                changed = false;
        }
        return changed;
    }
}

export default UserStore;