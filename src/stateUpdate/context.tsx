import React, { useMemo } from "react";
import { ReactNode, useContext, useState } from "react";

type StateType = {a: number, b: number, changeA: () => void}
const val = {a: 1, b:2, changeA: () => {}}
const ccc = React.createContext(val);

function ParentC() {
    console.log("render parent")
    return (<div>
        <h3>Parent with context</h3>
        <ProviderCC con={ccc}>
            <ChildA label="A" con={ccc} />
            <ChildB label="B" con={ccc}/>
            <SomeComp label="Parent"/>
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
    return (
        <div>
            <SomeComp label="Provider" />
            <con.Provider value={vv}>{children} </con.Provider>
        </div>
    )
}

function SomeComp({label}: {label: string}) {
    const [state, setState] = useState(1)
    console.log("render component no context", label)
    return(
        <div style={{margin: 15}}>
            {label} component not using context {state} <br/>
            <button onClick={() => setState(state + 1)}>change inner state</button>    
        </div>
    )
}
const SomeCompMemo = React.memo(SomeComp);

function ChildA({con, label}: {con: React.Context<StateType>, label: string}) {
    console.log("render", label);
    const {a, changeA} = useContext(con)
    return (
        <div style={{margin: 15}}>
            this is me {label} {a} <br />
            <button onClick={() => changeA() }> change a </button>
        </div>
    )
}
const ChildAMemo = React.memo(ChildA);


function ChildB({con, label}: {con: React.Context<StateType>, label: string}) {
    console.log("render", label);
    const {b} = useContext(con)
    return (
        <div style={{margin: 15, border:"1px solid"}}>
            this is me {label} {b}
            <SomeComp label="B" />
        </div>
    )
}

const ChildBMemo = React.memo(ChildB);

export const ContextParent = ParentC