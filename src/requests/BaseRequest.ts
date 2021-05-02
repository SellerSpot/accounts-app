export default class BaseRequest {
    private service: string;
    constructor(service: string) {
        this.service = service;
    }
    public getUrl(route: string): string {
        return `${this.service}${route}`;
    }
}
