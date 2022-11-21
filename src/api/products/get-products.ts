import { firestore } from 'lib/firebase';
import { QueryDocumentSnapshot } from '@firebase/firestore-types';
import { ProductItem } from 'types/products/product';

export async function getProducts() {
  const productsRef = firestore.collection('products');
  const query = productsRef;
  const productDocs = (await query.get()).docs as QueryDocumentSnapshot<ProductItem>[];
  return productDocs;
}

export async function getProduct(id: string) {
  const productRef = firestore.collection('products').doc(id);
  const query = productRef;
  const productDocs = await query.get();
  return productDocs;
}

export async function getProductByBarcode(barcode: string) {
  const productRef = firestore.collection('products').where('barcode', '==', barcode);
  const query = productRef;
  const productDocs = await query.get();
  return productDocs;
}
