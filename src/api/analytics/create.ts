import { firestore } from 'lib/firebase';

export async function createBarcodeAnalyticRecord(barcode: string, result: string, productId?: string) {
  const analyticsRef = firestore.collection('analytics');
  const query = analyticsRef;
  const productDocs = await query.add({
    type: 'scan_barcode',
    value: barcode,
    createdTime: new Date(),
    result,
    productId: productId ?? null,
  });
  return productDocs;
}
