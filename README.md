This is just a repo for me to practice and learn building transactions with AlgoSDK and direclty using myAlgo Connect, instead of using Reach abstraction. The front end is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

**Developed by**: [Sunday Akinbowale](https://github.com/asolpshinning)

## Activity Log

**08/27/2022** 
    - generated the clawback address and set it as the claw back of the frozen ASA using myAlgo
    - was able to deploy `controller.py` and opted in successfully... loaded the argument foreign asset (which is default frozen token)
    - now able to compile pyTeal directly on vs code instead of going to replit to do it... installed pyteal and yaml successfully
**08/26/2022** 
    - was able to make `lsig` a sender to send some algo to my testnet account/address. Found out does not require signing by myAlgo if you are using the lsig as a contract account (it just works). 
    - `pyteal/controller.js` exported TEAL code compiled from pyTeal (on my replit) compiled `controller.py` from algobuilder security token or permissioned ASA
    - `utils/deployController.js` front-end code to deploy controller stateful smart contract
    - `pyteal/controller.py` this is the controller for algobuilder security token or permissioned ASA
**08/25/2022** 
    - `rsh/index.rsh` decided to add a test transfer function to the reach contract to see if the address of the contract can be used as a clawback address on an ASA .I found out it can be used. But then there was no way to make the asset frozen again for all accounts, and no way to go back to default frozen. 
**08/24/2022** 
    - `pages/test1` is the main page I am currently performing my tests, while learning. Most transactions are working well, except myAlgo is not able to sign logic signatures
    - `teal/testStateless.js` - this is the teal code exported as a javascript constant


## Next Plan (Possibly)

- [] Use AlgoSDK to interact with a Reach smart contract
- [] Interact with a deployed TEAL stateful contract using algoSDK
- [X] Use logic signatures in transaction without an account signature
- [X] Deploy a test stateful contract using algoSDK
- [X] Deploy one or two contracts from AlgoBuilder
- [] Try to sign logic signatures with sk
- [] Get a logic signature in a group transaction and see how everything works together
- [] See what other wallets can be used to sign lsig
- [] Try the myAlgo way of signing arbitrary data, and see if this would be useful for login/logout functionality
- [] build a wallet that does everything you want it to do (start by forking myAlgo Connect and rewrite it)



