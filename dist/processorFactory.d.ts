import Web3 from "web3";
import { Chain, ResultDecoder } from "./types";
export declare const createDecoder: (provider: Web3, chain: Chain) => ResultDecoder;
