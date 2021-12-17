import Web3 from "web3";
import {Chain, ResultDecoder} from "./types";
import {BscResultDecoder} from "./bsc/decoder";

export const createDecoder = function (provider: Web3, chain: Chain): ResultDecoder {
    switch (chain.id) {
        case 'binance':
            return new BscResultDecoder(provider);
        default:
            throw new Error('Unsupported chain!');
    }
}