 import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44388/',
  redirectUri: baseUrl,
  clientId: 'SyriaShomoos_App',
  responseType: 'code',
  scope: 'offline_access SyriaShomoos',
  requireHttps: true,
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'SyriaShomoos',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44388',
      rootNamespace: 'SyriaShomoos',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
