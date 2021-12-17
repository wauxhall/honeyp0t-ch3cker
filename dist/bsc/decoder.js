"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BscResultDecoder = void 0;
var BscResultDecoder = (function () {
    function BscResultDecoder(provider) {
        this.provider = provider;
    }
    BscResultDecoder.prototype.decodeCheckerResult = function (encodedResult) {
        var decoded = this.provider.eth.abi.decodeParameters(["uint256", "uint256", "uint256", "uint256", "uint256", "uint256"], encodedResult);
        var buyExpectedOut = this.provider.utils.toBN(decoded[0]);
        var buyActualOut = this.provider.utils.toBN(decoded[1]);
        var sellExpectedOut = this.provider.utils.toBN(decoded[2]);
        var sellActualOut = this.provider.utils.toBN(decoded[3]);
        var buyTax = Math.round(((buyExpectedOut - buyActualOut) / buyExpectedOut) * 100 * 10) / 10;
        var sellTax = Math.round(((sellExpectedOut - sellActualOut) / sellExpectedOut) * 100 * 10) / 10;
        return {
            buyTax: buyTax,
            sellTax: sellTax,
            buyGas: this.provider.utils.toBN(decoded[4]).toNumber(),
            sellGas: this.provider.utils.toBN(decoded[5]).toNumber(),
        };
    };
    return BscResultDecoder;
}());
exports.BscResultDecoder = BscResultDecoder;
//# sourceMappingURL=decoder.js.map