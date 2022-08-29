import algosdk from "algosdk";
import {clawBack} from "../pyteal/clawBack"; 
const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');


    function getUint8Int(number) {
        const buffer = Buffer.alloc(8);
        const bigIntValue = BigInt(number);
        buffer.writeBigUInt64BE(bigIntValue);
        return  [Uint8Array.from(buffer)];
    }
    
    export const deployClawback = async() => {
        let teal = clawBack;
        const params = await algodClient.getTransactionParams().do();
        const compiled = await algodClient.compile(teal).do();
        let program = new Uint8Array(Buffer.from(compiled.result, "base64"));
        console.log(program);
        //let args = getUint8Int(123);
        let lsig = new algosdk.LogicSigAccount(program);
        console.log(`lsig is: `, lsig);
        let sender = lsig.address();     //SIMRUXJ7KQWFMY62LN2U2S3MAGX2CLYZKQK5WKFH4ZAWBB3LMLKPTI6RYI   
        console.log("lsig address(sender) : " + sender);  
        alert("lsig address(sender) : " + sender);
        //receiver
        //let receiver = ''; //my acc3
        
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
        /* let rawSignedLsigTxn1 = algosdk.signLogicSigTransactionObject(txn, lsig);
        console.log("Signed transaction with logic signature: " + rawSignedLsigTxn1.blob);
        //send the transaction
        let tx = await algodClient.sendRawTransaction(rawSignedLsigTxn1.blob).do();
        console.log("Transaction : " + tx.txId); */
    }

