import { BinColor } from 'constants/enums/bin-setting';
import Image from 'next/image';

export function getTextColorByBackgroundColor(backgroundColor: string): string {
  switch (backgroundColor) {
    case BinColor.LightGreen:
    case BinColor.Yellow:
    case BinColor.BatteryBack:
    case BinColor.Pink:
      return '#000';
    default:
      return '#fff';
  }
}

export function getBinIconByBinColor(color: BinColor) {
  let alt = '';
  let assetPath = '';
  switch (color) {
    case BinColor.Red:
    case BinColor.DarkGreen:
    case BinColor.Maroon:
      alt = 'Trash';
      assetPath = '/assets/images/bin/trash.svg';
      break;
    case BinColor.LightGreen:
      alt = 'Green Waste';
      assetPath = '/assets/images/bin/apple.svg';
      break;
    case BinColor.Blue:
    case BinColor.Yellow:
      alt = 'Mixed Waste';
      assetPath = '/assets/images/bin/mixed.svg';
      break;
    case BinColor.Purple:
      alt = 'Glass Waste';
      assetPath = '/assets/images/bin/glass.svg';
      break;
    case BinColor.BatteryBack:
      alt = 'Other';
      assetPath = '/assets/images/bin/other.svg';
      break;
    default:
      alt = 'Trash';
      assetPath = '/assets/images/bin/trash.svg';
  }

  return <Image src={assetPath} alt={alt} width={16} height={16} />;
}

export const getGuidingLabelFromGuidingParts = (listParts: string[]) => {
  if (listParts.length <= 0) {
    return '';
  }
  return listParts.reduce((prevVal, currentVal, index) => {
    if (index < listParts.length - 1) {
      return prevVal + ', ' + currentVal;
    }

    return prevVal + ' and ' + currentVal;
  });
};
