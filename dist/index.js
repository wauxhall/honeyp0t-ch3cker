"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSafety = void 0;
var web3_1 = __importDefault(require("web3"));
var processorFactory_1 = require("./processorFactory");
var bnbIn = "0.5";
var CheckSafety = function (address, chain) { return __awaiter(void 0, void 0, void 0, function () {
    var result, provider, web3, decoder, bnbIN, encodedAddress, callData, web3Result, decoded, error_1, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = {
                    success: true,
                    msg: "",
                    data: {
                        isHoneypot: false,
                        buyTax: 0,
                        sellTax: 0
                    }
                };
                provider = new web3_1.default.providers.HttpProvider(chain.rpcAddress);
                web3 = new web3_1.default(provider);
                decoder = (0, processorFactory_1.createDecoder)(web3, chain);
                bnbIN = web3.utils.toWei(bnbIn, "ether");
                encodedAddress = web3.eth.abi.encodeParameter("address", address);
                callData = chain.honeypotCheckerMethodSignature + encodedAddress.substring(2);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, web3.eth.call({
                        to: chain.honeypotCheckerAddress,
                        from: chain.fromAddress,
                        value: bnbIN,
                        gas: 45000000,
                        data: callData,
                    })];
            case 2:
                web3Result = _a.sent();
                if (!web3Result) {
                    result.success = false;
                    result.msg = "Empty response from web3...";
                    return [2, result];
                }
                decoded = decoder.decodeCheckerResult(web3Result);
                if (decoded.buyTax + decoded.sellTax > 50) {
                    result.data.isHoneypot = true;
                }
                if (decoded.buyGas + decoded.sellGas >= 45000000 * 0.8) {
                    result.data.isHoneypot = true;
                }
                result.data.buyTax = decoded.buyTax;
                result.data.sellTax = decoded.sellTax;
                return [3, 4];
            case 3:
                error_1 = _a.sent();
                result.data.isHoneypot = true;
                message = error_1.message;
                if (!message.includes("TRANSFER_FROM_FAILED") && !message.includes("TRANSFER_FAILED")) {
                    result.success = false;
                    result.msg = "Unknown error message got: " + message;
                }
                return [3, 4];
            case 4: return [2, result];
        }
    });
}); };
exports.CheckSafety = CheckSafety;
//# sourceMappingURL=index.js.map