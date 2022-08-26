export const controller = `#pragma version 5
txn ApplicationID
int 0
==
bnz main_l26
txn OnCompletion
int UpdateApplication
==
bnz main_l25
txn OnCompletion
int DeleteApplication
==
bnz main_l24
txn OnCompletion
int CloseOut
==
bnz main_l23
txn OnCompletion
int OptIn
==
bnz main_l22
txna ApplicationArgs 0
byte "set_permission"
==
bnz main_l21
txna ApplicationArgs 0
byte "issue"
==
bnz main_l20
txna ApplicationArgs 0
byte "kill"
==
bnz main_l19
txna ApplicationArgs 0
byte "transfer"
==
bnz main_l18
txna ApplicationArgs 0
byte "force_transfer"
==
bnz main_l11
err
main_l11:
txna Assets 0
int 101980751
==
assert
int 0
asset_params_get AssetManager
store 1
store 0
int 0
asset_params_get AssetReserve
store 3
store 2
byte "killed"
app_global_get
int 0
==
txn GroupIndex
int 0
==
gtxn 1 TypeEnum
int axfer
==
&&
gtxn 1 XferAsset
int 101980751
==
&&
&&
global GroupSize
int 3
>=
&&
txn Sender
load 0
==
&&
assert
gtxn 1 AssetReceiver
load 2
==
global GroupSize
int 3
>
bnz main_l17
int 0
main_l13:
||
bnz main_l16
gtxn 3 TypeEnum
int appl
==
gtxn 3 ApplicationID
byte "perm_app"
app_global_get
==
&&
main_l15:
return
main_l16:
int 1
b main_l15
main_l17:
gtxn 1 AssetReceiver
gtxn 3 ConfigAssetReserve
==
b main_l13
main_l18:
byte "killed"
app_global_get
int 0
==
gtxn 1 AssetSender
txn Sender
==
&&
global GroupSize
int 3
>=
&&
txn GroupIndex
int 0
==
gtxn 1 TypeEnum
int axfer
==
&&
gtxn 1 XferAsset
int 101980751
==
&&
&&
gtxn 3 TypeEnum
int appl
==
gtxn 3 ApplicationID
byte "perm_app"
app_global_get
==
&&
&&
assert
int 1
return
main_l19:
int 0
asset_params_get AssetManager
store 1
store 0
global GroupSize
int 1
==
txn NumAssets
int 1
==
&&
txna Assets 0
int 101980751
==
&&
txn TypeEnum
int appl
==
&&
txn Sender
load 0
==
&&
assert
byte "killed"
int 1
app_global_put
int 1
return
main_l20:
int 0
asset_params_get AssetReserve
store 3
store 2
txna Assets 0
int 101980751
==
txn Sender
load 2
==
&&
gtxn 1 AssetSender
load 2
==
&&
byte "killed"
app_global_get
int 0
==
&&
assert
int 1
return
main_l21:
int 0
asset_params_get AssetManager
store 1
store 0
global GroupSize
int 1
==
txn NumAppArgs
int 2
==
&&
txn NumAssets
int 1
==
&&
txna Assets 0
int 101980751
==
&&
txn Sender
load 0
==
&&
assert
byte "perm_app"
txna ApplicationArgs 1
btoi
app_global_put
int 1
return
main_l22:
global GroupSize
int 1
==
txn NumAppArgs
int 0
==
&&
txn GroupIndex
int 0
==
&&
assert
int 1
return
main_l23:
int 1
return
main_l24:
int 0
return
main_l25:
int 0
return
main_l26:
int 0
asset_params_get AssetManager
store 1
store 0
global GroupSize
int 1
==
txn RekeyTo
global ZeroAddress
==
&&
txn NumAssets
int 1
==
&&
txna Assets 0
int 101980751
==
&&
txn Sender
load 0
==
&&
assert
byte "killed"
int 0
app_global_put
int 1
return`