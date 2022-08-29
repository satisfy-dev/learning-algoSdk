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
        const data = new Uint8Array(['This signature is just for logging in purpose']);
        //const contractAddress = 'TRXH6GPYZX6VFNKL45UYGVNGUPFHAEZLTJD63MGQ3HDVNAV3NGILO6IFTM'
        const contractAddress = 'SIMRUXJ7KQWFMY62LN2U2S3MAGX2CLYZKQK5WKFH4ZAWBB3LMLKPTI6RYI'; //lsig address
        const signer = 'TUVXETKP3QZYEHLTL3NYHORZUODJUKKDWYYFKL4PQUSZEIYXVHFKRVIXBY';
        const signature = await myAlgoConnect.tealSign(data, contractAddress, signer);
        console.log(signature);
    }
    //[103, 178, 52, 9, 69, 226, 75, 137, 8, 125, 105, 129, 164, 199, 63, 159, 240, 175, 32, 176, 18, 72, 5, 175, 191, 232, 225, 102, 186, 242, 25, 64, 176, 247, 250, 135, 149, 78, 244, 74, 174, 85, 94, 156, 34, 209, 129, 196, 238, 27, 39, 252, 119, 55, 216, 133, 164, 43, 112, 239, 53, 91, 215, 0, buffer: ArrayBuffer(64), byteLength: 64, byteOffset: 0, length: 64, Symbol(Symbol.toStringTag): 'Uint8Array']
