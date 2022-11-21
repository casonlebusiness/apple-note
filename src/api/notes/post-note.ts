import { firestore } from 'lib/firebase';
import { Note } from 'types/notes/note';

export async function postNote(note: Note) {
  const analyticsRef = firestore.collection('notes');
  const query = analyticsRef;
  const noteDocs = await query.add(note);
  return noteDocs;
}

export async function updateNote(note: Note, id: string) {
  note.updatedDate = new Date().getTime()
  const analyticsRef = firestore.collection('notes').doc(id);
  const query = analyticsRef;
  const noteDoc = await query.update(note);
  return noteDoc;
}

export async function deleteNote(id: string) {
  const analyticsRef = firestore.collection('notes').doc(id);
  const query = analyticsRef;
  const note = await query.delete();
  return note;
}