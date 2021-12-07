import { useState } from "react"


function Parent() {
    const [state, setState] = useState({a: 2, b: 3}) 
    console.log("render parent")
    return (<div>
        <h3>Parent using props</h3>
        <Child data={state.a} label="A"/>
        <Child data={state.b} label="B"/>
        <button onClick={() => {
            setState({...state, a: state.a + 1})}
            }> 
            change a 
        </button>
        <SomeComp />
    </div>)
}

function Child({data, label}: {data: number, label: string}) {
    console.log("render", label);
    return (<div style={{margin: 15}}>this is me {label} {data}</div>)
}

function SomeComp() {
    console.log("render without props")
    return(<div style={{margin: 15}}>this is comp without props</div>)
}

export const StateParent = Parent

