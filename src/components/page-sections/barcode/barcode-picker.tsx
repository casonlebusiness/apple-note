import React, { useEffect, useRef } from 'react';
import { Barcode, BarcodePicker as ScanditSDKBarcodePicker, configure, ScanSettings } from 'scandit-sdk';

// Configure the library and activate it with a license key
const configurationPromise = configure(
  'AalhtRM9MbTUHiTU9SneBEQ6NGjcFBzdq1Bu9v52bVqde6yjAzoMas9ETwqqPb613UOSfe8+n1raPdP320P2hmN84+GSJM/yY1JJXywKND2CZoozuWeEWV55RGGhewLqp3kd1Ataql6ITKnCtHffZRseo5FpYCOCSh/EYVcwJG/We3V5GW5KBDA7DdJ8cKUT6lUjvAYOKcNzET5LUi+ypqoUStjJLegAaDvL9LJ+vy2F9mHQpvHNU/c0Md8LXM9rnNXIl+Lz48m1d2Hwl/DJ0YkL+iBnb7PI5GVgbGEDmy2B+fGz92cJrtk1oSxNfGdORa8cYRe2oOxw4yYPlcrL/dDZO4WeNufx5juHGZQw00Cr/1AR6tNdNY7QrQdasXNd4vVvS3LDvm/k5c5BriFgbUjK1rFwGM1Aq7YK+oSZ68xoARTWOfaKNsc0v+WGQFTzYMh60BKiKyUZVgCkSVPbXtSrCS+tkBTj0EX2+e750vHjAuvOJ8lbYoJYIy2NqLycjXEYF/K0sYK2pJqLmR1hGAQQ2F2/yvP1rLXDPB8vFWoeNJ8c9lM4iZLMXftLbGqe6f8bWR2mO0tHM8DM4qZfMvMjvkWKYSsqQx4uP7PRaJwbSPqL4HYLmJUhf36UYqJuo1c0CTcT1Ku5/Ba2eaYhKtcoqQowDMt2aQCKJ84IPe3Usnw7KiJ33ZGV8K8+dZ++eDnaZhVkbEk8bq2FVl/xC1+xLO7R4ttiajDyBuWdyoxROVswKV3q/5PXwBn9IJAwZ0hDQszOVnScYzvyYUX0cXsEZpAJ7E9G6q8pNmBZwpfuXoPLPJacGnksZom7Y9G7NryHMl31oylOCnEve28BzvNuP0jwoxHpa7qXSFQ7hoqxhjUf5I3h3vHbHBUwstOI3dsVbqrB1PdwFQ==',
  { engineLocation: 'https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/' },
).catch((error) => {
  alert(error);
});

const style: any = {
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  margin: 'auto',
  maxWidth: '1280px',
  maxHeight: '80%',
};

const scanSettings = new ScanSettings({
  codeDuplicateFilter: 2000,
  enabledSymbologies: [
    Barcode.Symbology.CODABAR,
    Barcode.Symbology.CODE128,
    Barcode.Symbology.CODE11,
    Barcode.Symbology.CODE25,
    Barcode.Symbology.EAN13,
    Barcode.Symbology.EAN8,
    Barcode.Symbology.UPCA,
    Barcode.Symbology.UPCE,
    Barcode.Symbology.QR,
  ],
});

export const BarcodePicker = (props) => {
  const ref = useRef(null);
  const { onScan } = props;

  useEffect(() => {
    configurationPromise.then(() => {
      ScanditSDKBarcodePicker.create(ref.current, { scanSettings }).then((barcodePicker) => {
        if (barcodePicker) {
          barcodePicker.on('scan', (scanResult) => onScan(barcodePicker, scanResult), true);
          barcodePicker.on('scanError', () => {
            alert('Scanning Error');
          });
        }
      });
    });
  }, []);

  return <div ref={ref} style={style as any} />;
};

export default BarcodePicker;
