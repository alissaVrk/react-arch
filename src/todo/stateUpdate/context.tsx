import React, { useMemo } from "react";
import { ReactNode, useContext, useState } from "react";

type StateType = {a: number, b: number, changeA: () => void}
const val = {a: 1, b:2, changeA: () => {}}
const ccc = React.createContext(val);

function ParentC() {

    console.log("render parent")
    return (<div>
        <ProviderCC con={ccc}>
            Parent
            <ChildA label="A" con={ccc} />
            <ChildB label="B" con={ccc}/>
            <SomeComp />
        </ProviderCC>
    </div>)
}

function ProviderCC({con, children}: {con: React.Context<StateType>, children: ReactNode}) {
    const [state, setState] = useState({a: 1, b:2})
    console.log("render provider");
    const vv = useMemo(() => {
        return {
            a: state.a,
            b: state.b,
            changeA: () => setState({...state, a: state.a + 1})
        }
    }, [state]);
    return (<con.Provider value={vv}>{children} </con.Provider>)
}

function SomeComp() {
    const [state, setState] = useState(1)
    console.log("render some")
    return(<div>
        hello {state}
        <button onClick={() => setState(state + 1)}>do some</button>    
        </div>)
}
function ChildA({con, label}: {con: React.Context<StateType>, label: string}) {
    console.log("render", label);
    const {a, changeA} = useContext(con)
    return (<div>
        this is me {a}
        <button onClick={() => changeA() }> change a </button>
        </div>)
}
function ChildB({con, label}: {con: React.Context<StateType>, label: string}) {
    console.log("render", label);
    const {b} = useContext(con)
    return (<div>
        this is me {b}
        <SomeComp />
        </div>)
}
export const ContextParent = ParentC