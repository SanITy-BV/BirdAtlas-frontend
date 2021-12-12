import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ConfigService {
    private httpClient: HttpClient;

    constructor(private readonly httpHandler: HttpBackend) {
        this.httpClient = new HttpClient(httpHandler);
    }

    init() {
        return this.httpClient.get('./assets/config.json');
    }
}