import { KeycloakOptions, KeycloakService } from 'keycloak-angular';
//import { environment } from '../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<boolean> {

    const options: KeycloakOptions = {
      config: {
        url: 'https://auth.cern.ch/auth',
        realm: 'cern',
        clientId: 'dbmon-account-tracking-k8s-dev',
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
