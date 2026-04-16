import { KeycloakOptions, KeycloakService } from 'keycloak-angular';
//import { environment } from '../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<boolean> {

    const options: KeycloakOptions = {
      config: {
        url: 'https://example.com',
        realm: 'example-realm',
        clientId: 'example-id',
      },
      loadUserProfileAtStartUp: false,
      initOptions: {
          //onLoad: 'check-sso',
          onLoad: 'login-required',
          checkLoginIframe: false
      },
      bearerExcludedUrls: []
    };

    return () => keycloak.init(options);
}
