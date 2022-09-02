import React, {useState, useRef} from 'react';
import {getElement} from '../utils/contractFunctions';

const FrontEndExample = () => {
    const apiNames = useRef(['']);
    const apiIndex = useRef(0);

    const handleApiNameChange = (e,id) => {
        let newArr = [...apiNames.current];
        newArr[id] = e.target.value;
        apiNames.current = newArr;
    }
    const [apiArray, setApiArray] = useState(
        [
            <div id = 'argInput0'>ApiName: <input onChange = {(event) => handleApiNameChange(event,0)} type="text" />
                <button 
                    onClick = {() => {
                        setApiDetails(apiDetail(0));
                    }}
                >
                    Edit
                </button>
                <br/>
            </div>
        ]);
    
    const apiDetail = (i) => {
        return <div>
                    <h2>{apiArray.length > 0 && `ApiName: ${apiNames.current[i]}`}</h2>
                </div>
    }

    const [apiDetails, setApiDetails] = useState(apiDetail(0));
    
    const addApi = () => {
        let l = apiArray.length;
        setApiArray(
            [
                ...apiArray, 
                <div id = {`argInput${l}`}>ApiName: <input onChange = {(event) => handleApiNameChange(event,l)} type="text" />
                    <button 
                        onClick = {() => {
                            setApiDetails(apiDetail(l));
                        }}
                    >
                        Edit
                    </button>
                    <br/>
                </div>          
            ]);
    };
    return (
        <div>
            <h1>Front End Example</h1>
            <div>
                {apiArray}
                <button onClick = {addApi}>Add API</button>
                <br/>
                {apiDetails}
            </div>

        </div>
    );
    };
export default FrontEndExample;