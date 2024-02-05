import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hazyvt.branch',
  appName: 'branch',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
