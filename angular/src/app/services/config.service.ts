import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Config } from "../models/config";

@Injectable({
    providedIn: "root"
})
export class ConfigService {
    private httpClient: HttpClient;
    config: Config | undefined;

    constructor(private readonly httpHandler: HttpBackend) {
        this.httpClient = new HttpClient(httpHandler);
    }

    init() {
        return this.httpClient.get<Config>('./assets/config.json')
        .pipe(tap(value => {
            this.config = value;
            console.log("Loaded config:");
            console.log(this.config);
          }));
    }
}