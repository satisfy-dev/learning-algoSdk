import React, {useState, useRef} from 'react';
import {getElement} from '../utils/contractFunctions';

const FrontEndExample = () => {
    const apiNames = useRef(['']);

    const handleApiNameChange = (e,id) => {
        let newArr = [...apiNames.current];
        newArr[id] = e.target.value;
        apiNames.current = newArr;
    }
    const [apiArray, setApiArray] = useState(
        [<div id = 'argInput0'>ApiName: <input onChange = {(event) => handleApiNameChange(event,0)} type="text" /><br/></div>]
        );
    const apiDetails = [ 
    <div>
        <h2>{apiArray.length > 1 && `ApiName: ${apiNames.current[0]}`}</h2>
    </div>]
    const addApi = () => {
        let l = apiArray.length + 1;
        setApiArray([...apiArray, <div id = {`argInput${l}`}>ApiName: <input onChange = {(e) => handleApiNameChange(e,l)} type="text" /><br/></div>]);
    };
    return (
        <div>
            <h1>Front End Example</h1>
            <div>
                {apiArray}
                <button onClick = {addApi}>Add Argument</button>
                <br/>
                {apiDetails}
            </div>

        </div>
    );
    };
export default FrontEndExample;