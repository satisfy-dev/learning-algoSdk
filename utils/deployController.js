import algosdk from "algosdk";
import MyAlgoConnect from '@randlabs/myalgo-connect';
 
const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');

export const deployController = async() => {
    const params = await algodClient.getTransactionParams().do();
    const sender = 'TUVXETKP3QZYEHLTL3NYHORZUODJUKKDWYYFKL4PQUSZEIYXVHFKRVIXBY'
    const txn = {
        ...params,
        type: "appl",
        from: sender,
        appLocalByteSlices: 0,
        appGlobalByteSlices: 2,
        appLocalInts: 0,
        appGlobalInts: 2,
        appApprovalProgram: new Uint8Array(Buffer.from("AiADAAEFIjEYEkEAAiNDMRkkEg==", "base64")),
        appClearProgram: new Uint8Array(Buffer.from("AiABASJD", "base64")),
        appOnComplete: 0,
    }

    const myAlgoConnect = new MyAlgoConnect();
    const signedTxn = await myAlgoConnect.signTransaction(txn);
    console.log(`signedTxn: `, signedTxn);
    let tx = await algodClient.sendRawTransaction(signedTxn.blob).do();
    console.log("Transaction : " + tx.txId);
}
