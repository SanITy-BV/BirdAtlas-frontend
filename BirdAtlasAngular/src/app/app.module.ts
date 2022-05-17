import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DesignModule } from './design/design.module';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeModule } from './home/home.module';
import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor, MsalInterceptorConfiguration, MsalGuardConfiguration, MsalService, MsalBroadcastService, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG} from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication, LogLevel, IPublicClientApplication } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DesignModule,
    AppRoutingModule,
    HomeModule,
    MsalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],  
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
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

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.apiUrl, [ `${environment.apiAppIdUri}` ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    },
  };
}