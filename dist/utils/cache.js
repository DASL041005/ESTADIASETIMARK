"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheService = exports.CacheService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
class CacheService {
    constructor() {
        this.cache = new node_cache_1.default({ stdTTL: 60, checkperiod: 120 });
    }
    setCache(key, value, ttl) {
        this.cache.set(key, value);
    }
    getCache(key) {
        return this.cache.get(key);
    }
    delCache(key) {
        this.cache.del(key);
    }
}
exports.CacheService = CacheService;
exports.cacheService = new CacheService();
