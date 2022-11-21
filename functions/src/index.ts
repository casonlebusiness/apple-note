import * as admin from 'firebase-admin';
import { migrations } from './migrations';
import { productImagesImports } from './sample-query-folder/sample-query';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();

export { 
  productImagesImports,
  migrations
};