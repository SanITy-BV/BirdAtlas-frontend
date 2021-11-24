// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Parameters needed for Azure Active Directory sign in
  msalAppClientId: '5fba7ab6-6f47-43a6-aa23-a7723725b461',
  msalTenantId: '5f672caa-bb37-4efe-906d-484716e32f15',
  redirectUrl: 'http://localhost:4200',
  // Parameters needed for secured API
  apiUrl: 'https://dbrd-appkhecyjjr7t4z2.azurewebsites.net/atlas',
  apiAppIdUri: 'api://907b7b68-e7b0-45e2-bd47-7805a8f09a3a/api.read'  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
