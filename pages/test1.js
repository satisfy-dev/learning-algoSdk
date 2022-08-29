import algosdk from "algosdk";
import { testStateless } from "../teal/testStateless";
import { deployClawback, signArbitraryData } from "../utils/deployClawback";
import {deployController} from "../utils/deployController";
 
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
        let args = getUint8Int(123);
        let lsig = new algosdk.LogicSigAccount(program, args);
        console.log(`lsig is: `, lsig);
        //const lsig = algosdk.makeLogicSig(new Uint8Array(Buffer.from(compiled, "base64")));
        //receiver
        let sender = lsig.address();     //UVBYHRZIHUNUELDO6HWUAHOZF6G66W6T3JOXIIUSV3LDSBWVCFZ6LM6NCA   
        console.log("lsig (sender) : " + sender);   
        //sender
        let receiver = '2K5BFAHT3HBRAIE43KYBPDBCGAQ7RXCK3VKGBUYGD4BQMOJABNTSF4KJIY'; //my acc3
        
        //create transaction
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: {
                ...params,
            },
            from: sender,
            to: receiver, 
            amount: 100000,
            //note: 'just rying this out'
        });
        //sign the transaction with logic signature
        let rawSignedLsigTxn1 = algosdk.signLogicSigTransactionObject(txn, lsig);
        console.log("Signed transaction with logic signature: " + rawSignedLsigTxn1.blob);
        //send the transaction
        let tx = await algodClient.sendRawTransaction(rawSignedLsigTxn1.blob).do();
        console.log("Transaction : " + tx.txId);
    }

    return <div>
        <h1>Test1</h1>
        <button onClick={compileTeal}> Compile Teal</button><br/><br/>
        <button onClick={deployController}> Deploy Controller</button><br/><br/>
        <button onClick={deployClawback}> Deploy Clawback</button><br/><br/>
        <button onClick={signArbitraryData}> Sign Arbitrary Data</button><br/><br/>

    </div>

}
 
