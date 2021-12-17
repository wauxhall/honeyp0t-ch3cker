export interface Chain {
    id: string;
    rpcAddress: string;
    fromAddress: string;
    honeypotCheckerAddress: string;
    honeypotCheckerMethodSignature: string;
}
export interface CheckerDecodedData {
    buyTax: number;
    sellTax: number;
    buyGas: number;
    sellGas: number;
}
export interface ResultDecoder {
    decodeCheckerResult(encodedResult: string): CheckerDecodedData;
}
export interface CheckerResult {
    success: boolean;
    msg: string;
    data: HoneypotData;
}
export interface HoneypotData {
    isHoneypot: boolean;
    buyTax: number;
    sellTax: number;
}
