import algosdk from "algosdk";
import { testStateless } from "../teal/testStateless";
/* const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const server = "http://localhost";
const port = 4001; */

import MyAlgoConnect from '@randlabs/myalgo-connect';
 
const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');

export default function Test1(){

    function getUint8Int(number) {
        const buffer = Buffer.alloc(8);
        const bigIntValue = BigInt(number);
        buffer.writeBigUInt64BE(bigIntValue);
        return  [Uint8Array.from(buffer)];
    }
    
    const compileTeal = async(teal) => {
        teal = testStateless;
        const params = await algodClient.getTransactionParams().do();
        const compiled = await algodClient.compile(teal).do();
        let program = new Uint8Array(Buffer.from(compiled.result, "base64"));
        console.log(program);
        let args = getUint8Int(12345);
        let lsig = new algosdk.LogicSigAccount(program);
        console.log(`lsig is: `, lsig);
        //const lsig = algosdk.makeLogicSig(new Uint8Array(Buffer.from(compiled, "base64")));
        //receiver
        let sender = lsig.address();        
        console.log("lsig (receiver) : " + sender);   
        //sender
        let receiver = 'SOEI4UA72A7ZL5P25GNISSVWW724YABSGZ7GHW5ERV4QKK2XSXLXGXPG5Y';
        //connect myAlgo
        const myAlgoConnect = new MyAlgoConnect();
        //
        const settings = {
            shouldSelectOneAccount: false,
            openManager: false
        };
        const accounts = await myAlgoConnect.connect(settings);
        console.log(`accounts: `, accounts);
        //sign logic with myAlgo using lsig address (receiver)
        lsig.sig = await myAlgoConnect.signLogicSig(lsig.logic, receiver);
        
        //create transaction
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: {
                ...params,
            },
            from: sender,
            to: receiver, 
            amount: 10000,
            //note: 'just rying this out'
        });
        //sign the transaction with logic signature
        let rawSignedLsigTxn1 = algosdk.signLogicSigTransactionObject(txn, lsig);
        console.log("Signed transaction with logic signature: " + rawSignedLsigTxn1.blob);
        //send the transaction
        //let tx = await algodClient.sendRawTransaction(rawSignedLsigTxn1.blob).do();
        //console.log("Transaction : " + tx.txId);
    }

    return <div>
        <h1>Test1</h1>
        <button onClick={compileTeal}> Compile Teal</button>
    </div>

}
 
