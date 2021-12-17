import {CheckSafety} from "../src";
import {BscChain} from "../src/bsc/chain";

CheckSafety("0x33f8ed7d9013f921de6f373608b1d3c21c82c92d", BscChain)
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });

CheckSafety("0x4a5683b0d45f250ea62a8bf651c33283dc3aa552", BscChain)
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });
