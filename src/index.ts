import Web3 from "web3";
import {Chain, CheckerResult} from "./types";
import {createDecoder} from "./decodersFactory";

const bnbIn = "0.5"

export const CheckSafety = async (address: string, chain: Chain): Promise<CheckerResult> => {
    const result = {
        success: true,
        msg: "",
        data: {
            isHoneypot: false,
            buyTax: 0,
            sellTax: 0
        }
    };

    const provider = new Web3.providers.HttpProvider(chain.rpcAddress);
    const web3 = new Web3(provider);

    const decoder = createDecoder(web3, chain)

    const bnbIN = web3.utils.toWei(bnbIn, "ether");
    const encodedAddress = web3.eth.abi.encodeParameter("address", address);
    const callData = chain.honeypotCheckerMethodSignature + encodedAddress.substring(2);

    try {
        const web3Result = await web3.eth.call({
            to: chain.honeypotCheckerAddress, // Honeypot checker contract
            from: chain.fromAddress,
            value: bnbIN,
            gas: 45000000,
            data: callData,
        });

        if (!web3Result) {
            result.success = false;
            result.msg = "Empty response from web3...";

            return result;
        }

        let decoded = decoder.decodeCheckerResult(web3Result)

        // Extreme high tax
        if (decoded.buyTax + decoded.sellTax > 50) {
            result.data.isHoneypot = true;
        }

        // Extreme high gas
        if (decoded.buyGas + decoded.sellGas >= 45000000 * 0.8) {
            result.data.isHoneypot = true;
        }

        result.data.buyTax = decoded.buyTax;
        result.data.sellTax = decoded.sellTax;
    } catch (error) {
        result.data.isHoneypot = true;

        const message = (error as any).message as string;

        if (!message.includes("TRANSFER_FROM_FAILED") && !message.includes("TRANSFER_FAILED")) {
            result.success = false;
            result.msg = "Unknown error message got: " + message;
        }
    }

    return result;
};
