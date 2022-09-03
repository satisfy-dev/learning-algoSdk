import React, {useState, useRef} from 'react';
import { Dropdown } from 'semantic-ui-react';

const FrontEndExample = () => {
    const apiNames = useRef(['']);

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
    
    //apiDetail is a function that returns a div with the api details and can be used in setApiDetails
    const apiDetail = (i) => {
        const argOptions  = [
            { key: 'string', text: 'string', value: 'string' },
            { key: 'number', text: 'number', value: 'number' },
            { key: 'address', text: 'address', value: 'address' },
            { key: 'token', text: 'token', value: 'token' },
            { key: 'boolean', text: 'boolean', value: 'boolean' },
        ];
        return <div>
                    <h2>{apiArray.length > 0 && `ApiName: ${apiNames.current[i]}`}</h2>
                    <div>
                        <h3>arg</h3>
                        <Dropdown
                            selection={true}
                            placeholder='Select arg'
                            options={argOptions}
                        />
                    </div>
                </div>
    }

    const [apiDetails, setApiDetails] = useState(apiDetail(0));
    
    //function to add a new API name that is editable
    const addApi = () => {
        let index = apiArray.length;
        setApiArray(
            [
                ...apiArray, 
                <div id = {`argInput${index}`}>ApiName: <input onChange = {(event) => handleApiNameChange(event,index)} type="text" />
                    <button //edit API button
                        onClick = {() => {
                            setApiDetails(apiDetail(index));
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