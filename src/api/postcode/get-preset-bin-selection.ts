import { MINIMUM_BINSELECTION_CONSENSUS } from 'constants/common';
import { firestore } from 'lib/firebase';

export async function getPresetBinSelection(
  postcode: string,
): Promise<null | { consensus: number; binSelection: { id: string; name: string }[] }> {
  const binSelectionConfigRef = firestore.collection('bin-selection-postcode-config');
  try {
    const binSelectionConfigData = (await binSelectionConfigRef.doc(postcode).get()).data();
    // There is config with submitted postcode
    if (binSelectionConfigData) {
      const configWithMostConsensus = Object.keys(binSelectionConfigData)
        .filter((key) => binSelectionConfigData[key].consensus !== null)
        .reduce((prevKey, currentKey) => {
          return binSelectionConfigData[prevKey].consensus > binSelectionConfigData[currentKey].consensus
            ? prevKey
            : currentKey;
        });

      if (binSelectionConfigData[configWithMostConsensus].consensus >= MINIMUM_BINSELECTION_CONSENSUS) {
        return binSelectionConfigData[configWithMostConsensus];
      } else {
        return null;
      }
    }
  } catch (error) {
    // No config setup
    console.log(error);
    return null;
  }
}
