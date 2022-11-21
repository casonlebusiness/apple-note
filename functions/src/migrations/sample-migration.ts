import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import { COLLECTION_NAMES } from '../constants/collections';

export const sampleMigration = functions.https.onRequest(async (req, res) => {
  try {
    res.json({result: `The migration has been successful.`});
  } catch {
    res.status(500).json({ result: "Failed to migrate." })
  }
});
