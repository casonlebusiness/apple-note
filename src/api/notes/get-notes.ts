import { QueryDocumentSnapshot } from '@firebase/firestore-types';
import { auth, firestore } from 'lib/firebase';
import { appSlice } from 'store/slices/appSlice';
import { store } from 'store/store';
import { Note } from 'types/notes/note';
import { postNote } from './post-note';

export async function getNotes() {
    const notesRef = firestore.collection('notes');
    const query = notesRef;
    const noteDocs = (await query.get()).docs as QueryDocumentSnapshot<Note>[];
    return noteDocs;
}

export async function getNote(id: string) {
    const noteRef = firestore.collection('notes').doc(id);
    const query = noteRef;
    const noteDocs = await query.get();
    return noteDocs;
}

export async function getNotesByUid(uid: string) {
    const noteRef = firestore.collection('notes').where('uid', '==', uid);
    const query = noteRef;
    const noteDocs = (await query.get()).docs as QueryDocumentSnapshot<Note>[];
    if (noteDocs.length == 0) {
        let note: Note = {
            createdDate: new Date().getTime(),
            updatedDate: new Date().getTime(),
            mdContent: "",
            uid: auth.currentUser.uid
        }
        postNote(note).then(data => {
            store.dispatch(appSlice.actions.setSelectedNote(0))
        })
    }
    return noteDocs;
}

export async function subscribeNotes(uid: string) {
    const noteRef = firestore.collection('notes').where('uid', '==', uid);
    const query = noteRef;
    const unsubscribe = query.onSnapshot(snap => {
        if (document.hasFocus()) {
            const data = snap.docs.sort((a: any, b: any) => {
                return b.data().updatedDate - a.data().updatedDate
            })
            store.dispatch(appSlice.actions.setNotes(data))
        }
    })
    return unsubscribe;
}