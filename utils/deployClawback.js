import algosdk from "algosdk";
import {clawBack} from "../pyteal/clawBack"; 
const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');
const MyAlgoConnect = require('@randlabs/myalgo-connect');


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
        let senderSender = 'TUVXETKP3QZYEHLTL3NYHORZUODJUKKDWYYFKL4PQUSZEIYXVHFKRVIXBY'; //my acc2
        let receiver = senderSender; //change this for lsig if needed
        
        //create transaction
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: {
                ...params,
            },
            from: senderSender,
            to: receiver, 
            amount: 0,
            //note: 'just rying this out'
        });
        //trying to sign 0 payment transaction real quickly
        /* const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
        console.log("Signed transaction: " , signedTxn);
        alert("Signed transaction : " + signedTxn.blob); */

        //sign the transaction with logic signature
        /* let rawSignedLsigTxn1 = algosdk.signLogicSigTransactionObject(txn, lsig);
        console.log("Signed transaction with logic signature: " + rawSignedLsigTxn1.blob);
        //send the transaction
        let tx = await algodClient.sendRawTransaction(rawSignedLsigTxn1.blob).do();
        console.log("Transaction : " + tx.txId); */
    }


    //sign arbitrary data
    export const signArbitraryData = async() => {
        const myAlgoConnect = new MyAlgoConnect();
        const data = new Uint8Array(['ifnuefae']);
        const contractAddress = 'SIMRUXJ7KQWFMY62LN2U2S3MAGX2CLYZKQK5WKFH4ZAWBB3LMLKPTI6RYI'; //lsig address
        const signer = 'TUVXETKP3QZYEHLTL3NYHORZUODJUKKDWYYFKL4PQUSZEIYXVHFKRVIXBY';
        const signature = await myAlgoConnect.tealSign(data, contractAddress, signer);
        console.log(signature);
    }
