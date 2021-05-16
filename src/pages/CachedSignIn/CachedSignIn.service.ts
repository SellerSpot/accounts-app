import { IStoreDetails } from '@sellerspot/universal-types';

import { CONFIG } from 'config/config';

export default class CachedSignInService {
    static getCachedStoresObject(): { [key: string]: IStoreDetails } {
        let cachedStores = JSON.parse(localStorage.getItem(CONFIG.CACHED_STORES));
        cachedStores = cachedStores ?? {};
        return cachedStores;
    }

    static makeACachedStoreEntry(storeDetails: IStoreDetails): void {
        const cachedStores = CachedSignInService.getCachedStoresObject();
        const { id } = storeDetails;
        cachedStores[id] = storeDetails;
        localStorage.setItem(CONFIG.CACHED_STORES, JSON.stringify(cachedStores));
    }

    static getAllCachedStores(): IStoreDetails[] {
        try {
            const cachedStores = CachedSignInService.getCachedStoresObject();
            const cachedStoresList = <IStoreDetails[]>Object.values(cachedStores) ?? [];
            return cachedStoresList;
        } catch (error) {
            return [];
        }
    }

    static removeACachedStore(tenantId: string): void {
        const cachedStores = CachedSignInService.getCachedStoresObject();
        delete cachedStores[tenantId];
        localStorage.setItem(CONFIG.CACHED_STORES, JSON.stringify(cachedStores));
    }
}
