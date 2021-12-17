# Honeypot-checker

Checks if crypto-token is scam. Currently, supports only bsc chain

This is refactored version of https://github.com/valamidev/web3-honeypot-checker

## Install

```npm i honeyp0t-ch3cker```

## How to use

```ts
import {CheckSafety} from 'honeyp0t-ch3cker';
import {BscChain} from "honeyp0t-ch3cker/dist/bsc/chain.js";

const address = "0x0000000000000000000000000000000000000000";
const res = await CheckSafety(address, BscChain);
if (res.success) {
    if (res.data.isHoneypot) {
        console.log('SCAM')
    } else {
        console.log('NOT SCAM')
    }
    
    if (res.data.buyTax > 0 || res.data.sellTax > 0) {
        console.log('WARNING, SOME EXTRA FEES ARE TAKEN')
    }
} else {
    console.error(res.msg);
}
```
