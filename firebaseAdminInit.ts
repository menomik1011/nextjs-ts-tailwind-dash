import admin from 'firebase-admin';

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FBA_PROJECT_ID,
                clientEmail: process.env.NEXT_PUBLIC_FBA_CLIENT_EMAIL,
                privateKey: process.env.NEXT_PUBLIC_FBA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
            databaseURL: "https://test-53011-default-rtdb.firebaseio.com"
        })
    } catch (error: any) {
        console.error('Firebase admin initialization error ', error.stack);
    }
}
export const adminDatabase = admin.database();
export const adminFirestore = admin.firestore();