import { useEffect, useState } from "react";
let sharedState = {a: 1, b: "a"};
type State = typeof sharedState;
type SetState = (s: State) => void

let listeners: Array<SetState> = [];

function useSharedState(): [State, () => void]{
    const [state, setState] = useState(sharedState)
    useEffect(() => {
        listeners.push(setState);
    }, []);

    function incrementA() {
        const newState = {...sharedState, a: sharedState.a + 1 };
        sharedState = newState;
        listeners.forEach(cb => cb(sharedState));
    }

    return [state, incrementA]
}

function Parent() {
    const [state, increment] = useSharedState();
    console.log("render parent");
    return (
        <div>
            <h3>nested set states</h3>
            <p>my state is {state.a}</p>
            <Child />
            <button onClick={increment}>increment</button>
        </div>
    )
}

function Child() {
    const [state] = useSharedState();
    console.log("render child");
    return (
        <div>
            <p>I am a child with same state as parent</p>
            <p>my state is {state.a}</p>
        </div>
    )
}

export const NestedParent = Parent;