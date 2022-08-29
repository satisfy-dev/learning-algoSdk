export const clawBack = `#pragma version 5
global GroupSize
int 2
==
bnz main_l2
global GroupSize
int 3
>=
gtxn 0 TypeEnum
int appl
==
&&
gtxn 1 TypeEnum
int axfer
==
&&
gtxn 2 TypeEnum
int pay
==
&&
txn GroupIndex
int 1
==
&&
gtxn 0 RekeyTo
global ZeroAddress
==
gtxn 1 RekeyTo
global ZeroAddress
==
&&
gtxn 0 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 1 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 0 AssetCloseTo
global ZeroAddress
==
&&
gtxn 1 AssetCloseTo
global ZeroAddress
==
&&
&&
gtxn 0 ApplicationID
int 106884955
==
&&
gtxn 1 XferAsset
int 106819526
==
&&
gtxn 1 Sender
gtxn 2 Receiver
==
gtxn 2 Amount
gtxn 1 Fee
>=
&&
gtxn 2 RekeyTo
global ZeroAddress
==
&&
gtxn 2 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 2 AssetCloseTo
global ZeroAddress
==
&&
&&
b main_l3
main_l2:
gtxn 0 RekeyTo
global ZeroAddress
==
gtxn 1 RekeyTo
global ZeroAddress
==
&&
gtxn 0 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 1 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 0 AssetCloseTo
global ZeroAddress
==
&&
gtxn 1 AssetCloseTo
global ZeroAddress
==
&&
global GroupSize
int 2
==
&&
gtxn 0 TypeEnum
int appl
==
&&
gtxn 0 ApplicationID
int 106884955
==
&&
gtxn 0 Sender
gtxn 1 AssetSender
==
&&
gtxn 1 TypeEnum
int axfer
==
&&
gtxn 1 XferAsset
int 106819526
==
&&
main_l3:
return`