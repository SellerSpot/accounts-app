import { introduceDelay } from 'utilities/general';
import { IStoreDetail } from './CachedSignIn.types';

export default class CachedSignInService {
    static async getSignedInStore(): Promise<IStoreDetail[]> {
        await introduceDelay(2000);
        return [
            { name: 'Sreenithi Departmental Store', domain: 'Sreenithi.sellerspot.in' },
            { name: 'Kumudham Shoppin Mall', domain: 'kumudham.sellerspot.in' },
        ];
    }
}
