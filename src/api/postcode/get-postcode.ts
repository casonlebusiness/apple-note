import samplePostCodeAPI from '../../assets/data/sample-postcode.json';

export async function getPostCodeFromLocation(lat: number, lng: number) {
  const foundPostCodeData = samplePostCodeAPI.find((instance) => instance.lat === lat && instance.lng === lng);
  if (foundPostCodeData) {
    return foundPostCodeData;
  } else {
    // TODO: for testing, after purchasing the real api, replace this one
    return {
      id: '687',
      postcode: '2540',
      lat,
      lng,
    };
  }
}
