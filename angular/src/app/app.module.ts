import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor, MsalInterceptorConfiguration, MsalGuardConfiguration, MsalService, MsalBroadcastService, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG} from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication, LogLevel, IPublicClientApplication } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './services/config.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Config } from './models/config';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MsalModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      multi: true,
      deps: [ConfigService, Router],
    },    
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
      deps: [ConfigService]
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
      deps: [ConfigService]
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
      deps: [ConfigService]
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },    
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }

export function configFactory(configService: ConfigService, router: Router): any {
  console.log(`initializerFactory`);
    const promise = configService.init().pipe(map((value) => {
        console.log('Finished getting configurations dynamically');
        router.initialNavigation();
    }));
    return () => promise;
}

export function MSALInstanceFactory(configService: ConfigService): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalAppClientId,
      authority: `https://login.microsoftonline.com/${environment.msalTenantId}`,
      redirectUri: environment.redirectUrl,
      postLogoutRedirectUri: environment.redirectUrl,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInterceptorConfigFactory(configService: ConfigService): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.apiUrl, [ `${environment.apiAppIdUri}` ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(configService: ConfigService): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    },
  };
}