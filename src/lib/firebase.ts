import { getFirestore } from '@firebase/firestore'
import { initializeApp, getApps } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA8MeNr5CpUvgj_F694hU8IjJ-RRI2C8eE',
  authDomain: 'sarahday-felicitacoes.firebaseapp.com',
  projectId: 'sarahday-felicitacoes',
  storageBucket: 'sarahday-felicitacoes.firebasestorage.app',
  messagingSenderId: '726939288807',
  appId: '1:726939288807:web:4d08ac03d9833e38f84e42',
  measurementId: 'G-6J0QWW2G7X',
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const storage = getStorage(app)

export const db = getFirestore(app)
