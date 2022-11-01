export const environment = {
  production: false,
  // Parameters needed for Azure Active Directory sign in
  msalAppClientId: '<your-spa-app-client-id>',
  msalTenantId: '<your-tentant-id>',
  redirectUrl: 'http://localhost:4200',
  // Parameters needed for secured API
  apiUrl: 'https://<your-api-url>/atlas', // The secure API endpoint
  apiAppIdUri: 'api://<your-api-app-client-id>/api.read' // The scope uri defined in the expose an API part of the Azure Portal   
};