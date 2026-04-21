import { Environment } from '@abp/ng.core';

const baseUrl = 'https://ssf.marhaba-syria.sy';

const oAuthConfig = {
  issuer: 'https://ssb.marhaba-syria.sy/',
  redirectUri: baseUrl,
  clientId: 'SyriaShomoos_App',
  responseType: 'code',
  scope: 'offline_access SyriaShomoos',
  requireHttps: true,
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'SyriaShomoos',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://ssb.marhaba-syria.sy',
      rootNamespace: 'SyriaShomoos',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;
