import * as admin from 'firebase-admin'

const firebasePrivateKey = process.env.firebasePrivateKey?.replace(/\\n/g, '\n')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.firebaseClientEmail,
      privateKey: firebasePrivateKey,
      projectId: process.env.firebaseProjectId,
    }),
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  })
}
export const adminStorage = admin.storage()
