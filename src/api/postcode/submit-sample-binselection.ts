import { firestore } from 'lib/firebase';
import { IUserBinSelectionModel } from 'store/models/bin-selection.type';

export async function submitSampleBinSelection(
  postcode: string,
  lat: number,
  lng: number,
  binSelection: IUserBinSelectionModel[],
) {
  const binSelectionRef = firestore.collection('user-bin-selections');
  const result = await binSelectionRef.add({
    createdDate: new Date(),
    postcode,
    lat,
    lng,
    binSelection,
  });
  return result;
}
