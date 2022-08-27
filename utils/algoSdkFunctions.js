import algosdk from "algosdk";
import MyAlgoConnect from '@randlabs/myalgo-connect';
let myAlgoConnected = false;
let myAlgoConnect

export const signAndSendTxn = async(txn, algodClient, txnType) => {
    if(myAlgoConnected == false){
        myAlgoConnect = new MyAlgoConnect();
        myAlgoConnected = true
    };
    const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
    console.log(`signedTxn: `, signedTxn);
    let tx = await algodClient.sendRawTransaction(signedTxn.blob).do();
    //console.log("Transaction : " + tx.txId);
    let txId = tx.txId;
    let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
    //Get the completed Transaction
    //console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    // display results
    let transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
    let res;
    if (txnType == 'deployContract') {
        res = transactionResponse['application-index'];
        console.log("Created new app-id: ", res);
    }
    else if(txnType == 'optInToContract') {
        res = transactionResponse['txn']['txn']['apid'];
        console.log("Opted in to app-id: ", res);
    }
    return res; //appId: 106857989
}

