import { BinKey } from './enums/bin-setting';

interface BinConfig {
  textColor: string;
  iconPath: string;
}
export const BIN_CONFIG: Record<BinKey, BinConfig> = {
  [BinKey.Blue]: {
    textColor: '#FFFFFF',
    iconPath: '/assets/images/bin/mixed.svg',
  },
  [BinKey.Yellow]: {
    textColor: '#000000',
    iconPath: '/assets/images/bin/mixed.svg',
  },
  [BinKey.Purple]: {
    textColor: '#FFFFFF',
    iconPath: '/assets/images/bin/glass.svg',
  },
  [BinKey.DarkGreen]: {
    textColor: '#FFFFFF',
    iconPath: '/assets/images/bin/trash.svg',
  },
  [BinKey.Red]: {
    textColor: '#FFFFFF',
    iconPath: '/assets/images/bin/trash.svg',
  },
  [BinKey.LightGreen]: {
    textColor: '#FFFFFF',
    iconPath: '/assets/images/bin/apple.svg',
  },
  [BinKey.Maroon]: {
    textColor: '#000000',
    iconPath: '/assets/images/bin/trash.svg',
  },
  [BinKey.BatteryBack]: {
    textColor: '#000000',
    iconPath: '/assets/images/bin/other.svg',
  },
  [BinKey.RedCycle]: {
    textColor: '#000000',
    iconPath: '',
  },
};
