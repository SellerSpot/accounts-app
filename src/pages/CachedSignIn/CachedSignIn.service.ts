import { IStoreDetail } from 'typings/store.types';
import { introduceDelay } from 'utilities/general';

export default class CachedSignInService {
    static async getSignedInStore(): Promise<IStoreDetail[]> {
        await introduceDelay(1000);
        return [
            {
                id: 'uniqueidOne',
                name: 'Sreenithi Departmental Store',
                domain: 'sreenithi.sellerspot.in',
            },
            { id: 'uniqueidTwo', name: 'Kumudham Shoppin Mall', domain: 'kumudham.sellerspot.in' },
        ];
    }
}
