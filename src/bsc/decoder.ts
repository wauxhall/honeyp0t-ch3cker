import Web3 from "web3";
import {ResultDecoder, CheckerDecodedData} from "../types";

export class BscResultDecoder implements ResultDecoder {
    provider: Web3;

    constructor(provider: Web3) {
        this.provider = provider;
    }

    decodeCheckerResult(encodedResult: string): CheckerDecodedData {
        const decoded = this.provider.eth.abi.decodeParameters(
            ["uint256", "uint256", "uint256", "uint256", "uint256", "uint256"],
            encodedResult
        );
        const buyExpectedOut = this.provider.utils.toBN(decoded[0]) as any;
        const buyActualOut = this.provider.utils.toBN(decoded[1]) as any;
        const sellExpectedOut = this.provider.utils.toBN(decoded[2]) as any;
        const sellActualOut = this.provider.utils.toBN(decoded[3]) as any;
        const buyTax =
            Math.round(
                ((buyExpectedOut - buyActualOut) / buyExpectedOut) * 100 * 10
            ) / 10;
        const sellTax =
            Math.round(
                ((sellExpectedOut - sellActualOut) / sellExpectedOut) * 100 * 10
            ) / 10;

        return {
            buyTax: buyTax,
            sellTax: sellTax,
            buyGas: this.provider.utils.toBN(decoded[4]).toNumber(),
            sellGas: this.provider.utils.toBN(decoded[5]).toNumber(),
        }
    }
}
