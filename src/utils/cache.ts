import NodeCache from 'node-cache';

export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
  }

  setCache(key: string, value: any, ttl?: number) {
    this.cache.set(key, value); 
  }

  getCache(key: string) {
    return this.cache.get(key);
  }

  delCache(key: string) {
    this.cache.del(key);
  }
}

export const cacheService = new CacheService();
