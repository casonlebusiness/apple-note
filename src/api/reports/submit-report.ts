import { firestore } from 'lib/firebase';

export async function submitReport(enabledBins: string[], feedback: string) {
  const analyticsRef = firestore.collection('reports');
  const query = analyticsRef;
  const productDocs = await query.add({
    createdTime: new Date(),
    enabledBins,
    feedback,
  });
  return productDocs;
}
