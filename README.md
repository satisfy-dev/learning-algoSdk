This is just a repo for me to practice and learn building transactions with AlgoSDK and direclty using myAlgo Connect, instead of using Reach abstraction. The front end is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

**Developed by**: [Sunday Akinbowale](https://github.com/asolpshinning)

## Activity Log
**08/24/2022** 
    - `rsh/index.rsh` decided to add a test transfer function to the reach contract to see if the address of the contract can be used as a clawback address on an ASA .I found out it can be used. But then there was no way to make the asset frozen again for all accounts, and no way to go back to default frozen. 
**08/24/2022** 
    - `pages/test1` is the main page I am currently performing my tests, while learning. Most transactions are working well, except myAlgo is not able to sign logic signatures
    - `teal/testStateless.js` - this is the teal code exported as a javascript constant


## Next Plan (Possibly)

- Try to sign logic signatures with sk
- Get a logic signature in a group transaction and see how everything works together
- See what other wallet can be used to sign lsig
- Try the myAlgo way of signing arbitrary data, and see if this would be useful for signing in functionality
- build a wallet that does everything you want it to do (start by forking myAlgo Connect and rewrite it)


## To Run This Project

First, run the development server:

```bash
cd src
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
