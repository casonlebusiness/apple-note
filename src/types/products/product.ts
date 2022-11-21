export interface FirestoreDate {
  seconds: number;
  nanoseconds: number;
}

export interface ProductItem {
  id: string;
  imageRight: string;
  gcpImageSpare: string;
  description: string;
  recycleGlassText: string;
  gcpImageRight: string;
  recycleRedCycle: boolean;
  gcpImageLeft: string;
  gcpImageBack: string;
  imageFront: string;
  recycleWaste: boolean;
  category: string;
  imageSpare: string;
  uid: string;
  subCategory: string;
  url: string;
  labels: any[];
  dateCreated: FirestoreDate;
  dateLastUpdated: FirestoreDate;
  imageLeft: string;
  recycleWasteText: string;
  gcpImageFront: string;
  recycleGlass: boolean;
  recycleRedCycleText: string;
  recyclePlasticText: string;
  dateLastSynced: FirestoreDate;
  brand: string;
  imageBack: string;
  recycleOrganic: boolean;
  recycleOrganicText: string;
  recyclePlastic: boolean;
  name: string;
}
