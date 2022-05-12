// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false
    
// };
export const CONFIG = {
  production: false,
  URL: 'http://localhost:8083/api/v1/',
  
  firebase: {
    apiKey: 'AIzaSyB8djvaircxX1lHIz4GsgVEhrz91O5mBzA',
    authDomain: 'association-e5180.firebaseapp.com',
    projectId: 'association-e5180',
    storageBucket: 'association-e5180.appspot.com',
    messagingSenderId: '540102029731',
    appId: '1:540102029731:web:76cb86a512bba48f442a16',
    measurementId: 'G-PEE2SP08LV'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
