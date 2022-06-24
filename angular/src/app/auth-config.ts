/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

 import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

 const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 
 /**
  * Configuration object to be passed to MSAL instance on creation. 
  * For a full list of MSAL.js configuration parameters, visit:
  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
  */
 export const msalConfig: Configuration = {
     auth: {
         clientId: '5fba7ab6-6f47-43a6-aa23-a7723725b461', // This is the ONLY mandatory field that you need to supply.
         authority: 'https://login.microsoftonline.com/5f672caa-bb37-4efe-906d-484716e32f15', // Defaults to "https://login.microsoftonline.com/common"
         redirectUri: 'http://localhost:4200', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
     },
     cache: {
         cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
         storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
     },
     system: {
         loggerOptions: {
             loggerCallback(logLevel: LogLevel, message: string) {
                 console.log(message);
             },
             logLevel: LogLevel.Verbose,
             piiLoggingEnabled: false
         }
     }
 }
 
 /**
  * Scopes you add here will be prompted for user consent during sign-in.
  * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
  * For more information about OIDC scopes, visit: 
  * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
  */
 export const loginRequest = {
   scopes: []
 };