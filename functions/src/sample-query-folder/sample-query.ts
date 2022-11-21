import * as functions from "firebase-functions";

export const productImagesImports = functions.https.onRequest(async (req, res) => {
  try {
    res.json({result: `The query is successful.`});
  } catch(error) {
    functions.logger.error('[QUERY ERROR]', error);
    res.status(500).json({ result: "Failed to query." })
  }
});
