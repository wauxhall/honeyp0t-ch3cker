import Web3 from "web3";
import { ResultDecoder, CheckerDecodedData } from "../types";
export declare class BscResultDecoder implements ResultDecoder {
    provider: Web3;
    constructor(provider: Web3);
    decodeCheckerResult(encodedResult: string): CheckerDecodedData;
}
