import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { BinColor, BinKey, BinRecycleType } from 'constants/enums/bin-setting';

export interface IBinSetting {
  recycleType: BinRecycleType[];
  enabled: boolean;
  name: string;
  description: string;
  color: string;
  dedicated?: boolean;
}

export type IBinSettingState = {
  [key in BinKey]: IBinSetting;
};

export const binSettingInitialState: IBinSettingState = {
  [BinKey.Blue]: {
    recycleType: [BinRecycleType.Paper],
    enabled: false,
    name: 'Blue',
    color: BinColor.Blue,
    description: 'Paper & Cardboard recycling',
  },
  [BinKey.Yellow]: {
    recycleType: [BinRecycleType.Glass, BinRecycleType.Mixed, BinRecycleType.Paper, BinRecycleType.Plastic],
    enabled: true,
    name: 'Yellow',
    color: BinColor.Yellow,
    description: 'Mixed recycling',
  },
  [BinKey.Purple]: {
    recycleType: [BinRecycleType.Glass],
    enabled: false,
    name: 'Purple',
    color: BinColor.Purple,
    description: 'Glass waste',
  },
  [BinKey.DarkGreen]: {
    recycleType: [BinRecycleType.Waste],
    enabled: false,
    name: 'Dark Green',
    color: BinColor.DarkGreen,
    description: 'General waste',
  },
  [BinKey.Red]: {
    recycleType: [BinRecycleType.Waste],
    enabled: true,
    name: 'Red',
    color: BinColor.Red,
    description: 'General waste',
  },
  [BinKey.LightGreen]: {
    recycleType: [],
    enabled: true,
    name: 'Light Green',
    color: BinColor.LightGreen,
    description: 'Green waste',
  },
  [BinKey.Maroon]: {
    recycleType: [],
    enabled: false,
    name: 'Maroon',
    color: BinColor.Maroon,
    description: 'Green waste',
  },
  [BinKey.BatteryBack]: {
    recycleType: [BinRecycleType.Other],
    enabled: true,
    name: 'Batteryback',
    color: BinColor.BatteryBack,
    dedicated: true,
    description: 'Dedicated Recycling',
  },
  [BinKey.RedCycle]: {
    recycleType: [BinRecycleType.RedCycle],
    enabled: true,
    name: 'RedCycle',
    color: BinColor.Pink,
    dedicated: true,
    description: 'RedCycle Recycling',
  },
};

export const binSettingSlice = createSlice({
  name: 'image',
  initialState: binSettingInitialState,
  reducers: {
    setBinEnableStatus: (state, action: PayloadAction<{ binId: string; enabled: boolean }>) => {
      state[action.payload.binId].enabled = action.payload.enabled;
    },
  },
});

export const getEnabledBins = (state: RootState) => {
  return Object.keys(state.binSetting)
    .filter((binKey, index) => {
      return state.binSetting[binKey].enabled == true;
    })
    .map((binKey) => state.binSetting[binKey]) as IBinSetting[];
};

export const { setBinEnableStatus } = binSettingSlice.actions;

export default binSettingSlice.reducer;
