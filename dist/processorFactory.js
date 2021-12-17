"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDecoder = void 0;
var decoder_1 = require("./bsc/decoder");
var createDecoder = function (provider, chain) {
    switch (chain.id) {
        case 'binance':
            return new decoder_1.BscResultDecoder(provider);
        default:
            throw new Error('Unsupported chain!');
    }
};
exports.createDecoder = createDecoder;
//# sourceMappingURL=processorFactory.js.map