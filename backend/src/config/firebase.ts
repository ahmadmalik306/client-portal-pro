import admin from 'firebase-admin';
import dotenv from 'dotenv';
import serviceAccount from '../secrets/protfolio-f0e58-firebase-adminsdk-fbsvc-196a544ab8.json';
dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    // Or use credential.cert(serviceAccount) if you have a service account JSON
  });
}

export default admin; 