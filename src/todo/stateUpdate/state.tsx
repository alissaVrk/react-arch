import { useState } from "react"


function Parent() {
    const [state, setState] = useState({a: 2, b: 3}) 
    console.log("render parent")
    return (<div>
        Parent
        <Child data={state.a} label="A"/>
        <Child data={state.b} label="B"/>
        <button onClick={() => {
            setState({...state, a: state.a + 1})}
        }> change a </button>
        <SomeComp />
    </div>)
}

function Child({data, label}: {data: number, label: string}) {
    console.log("render", label);
    return (<div>this is me {data}</div>)
}

function SomeComp() {
    console.log("render some")
    return(<div>hello</div>)
}

export const StateParent = Parent

