import { useEffect, useState } from 'react';
import { getPostCodeFromLocation } from 'api/postcode/get-postcode';

type PoseCodeData = Awaited<ReturnType<typeof getPostCodeFromLocation>>;
export function usePostCodeFromLocation() {
  const [postCode, setPostCode] = useState<PoseCodeData>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (location) => {
        const postCodeByLocation = await getPostCodeFromLocation(location.coords.latitude, location.coords.longitude);
        setPostCode(postCodeByLocation);
      },
      () => {},
    );
  }, []);

  return postCode;
}
