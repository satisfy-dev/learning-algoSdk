import algosdk from "algosdk";
import { signAndSendTxn } from "./algoSdkFunctions";
import { controller } from "../pyteal/controller";
import {clearState} from "../pyteal/clearState";

const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');


export const deployController = async() => {
    const params = await algodClient.getTransactionParams().do();
    const sender = 'TUVXETKP3QZYEHLTL3NYHORZUODJUKKDWYYFKL4PQUSZEIYXVHFKRVIXBY';
    const compiledController = await algodClient.compile(controller).do();
    const compiledClearState = await algodClient.compile(clearState).do();
    const txn = algosdk.makeApplicationCreateTxnFromObject({
        suggestedParams: {
            ...params,
        },
        from: sender,
        numLocalByteSlices: 4,
        numGlobalByteSlices: 2,
        numLocalInts: 0,
        numGlobalInts: 2,
        approvalProgram: new Uint8Array(Buffer.from(compiledController.result, "base64")),
        clearProgram: new Uint8Array(Buffer.from(compiledClearState.result, "base64")),
        onComplete: 0,
        foreignAssets: [106819526],
    });
    
    let appId = await signAndSendTxn(txn, algodClient, 'deployContract'); //106884955
    alert(`AppId: ${appId}`);

    const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
        suggestedParams: {
            ...params,
        },
        from: sender,
        appIndex: appId, //106884955
    });

    let optInRes = await signAndSendTxn(optInTxn, algodClient, 'optInToContract');
    alert(`OptInRes: ${optInRes}`);
    
}
