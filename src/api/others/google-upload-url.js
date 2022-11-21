import { uploadAndGetPublicFile } from './uploadb64';

export default async function handler(req, res) {
  // const storage = new Storage({
  //   projectId: "tribal-test-e798e",
  //   credentials: {
  //     client_email:
  //       "tribal-test-bucket@tribal-test-e798e.iam.gserviceaccount.com",
  //     private_key:
  //       "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCp3rJI+Jry38ic\nBtOIXpQe1GZ9oSjtz9wLaqP0OJSYNt7JiWhU319anSlLnDput5Kw97/id5h7Jyjc\nQRf0GBoqPSX+f+wAO7idEq2mdPnbmgxEJ3vWb5OooBO3l+RjAwJypxr44WdD9f0A\nDkmFbUV8v/HEoluVduW7OVhcdSnWMHf1kMP0x498aQLWQqR1WfFPubTDU3C90tJv\nRkYcfZwsG+mNyF0TE48rBAw8XoBHJxb3SRTzhNAvWEOSgCyLlYMhtnk1lw1y8C9c\nEefqVlVnX84F5WV4+nCTRBgCtibzZ4+S/cQkkPsJ9fT7mBQ/p+FV9sbp1aCCOKMF\nly/CQRwBAgMBAAECggEABwIyJP6Ehm+10zyDstk5H1utgLKFpxMyiFzi4m8zr/iN\nQQTcnhTVwQi3NOsKF6TsENsLSr9wYNNnqo0RJ+Vsg0Xg2OMOWbTya+D4Mxlu23ub\n1N40AYUlaIQ18Axx/uT3b24mLR2AAS7c5zPPtCk4dYT7XLIuA744jLIZNikGMVO0\ncR8YS98AZWO187OaAOwZAgKcibJy53cxH+ujgkTCZFVs195aPiVUeLMcRPimSUiS\npDgwTZdCKSlzDnFOJoQlX7Fp132g5dxzUlIdH0/AiDSsdY04xGXzzu4FzZRQvfZc\nHA0SM4+cP/j38bTZ2HlBHnvDcbusRd5DU13OfnU9WQKBgQDgu2OH53dtiDTBzA4j\nBxOq4THsJfBh2TKPyTvDz8MPD+2BiusI5QyJI1AXnroNa86kg00gmPh9ybwzO6pO\nF3rQ2fJvexeEw4hI7qoBJjA3ucTHaVBoY9qTMbcNliCL/keOhyFygVKf0V7usVYT\n2+oxdGmEsPEAHBa4ccsd/8us2QKBgQDBgTQydRreLBmmOq2XsnSQAiuYodaFktgu\ngOcylFdtDrEEzmpNflNWS/juEEZsPmTWRusw1kiq9UUhbTY3d0SAmTsgE8G+I384\nbzwISeD6URNnEK9bdIuE+whmuDwvWAElDSc4Hy811f3m4mvsGymOwOVPbgvnmm8C\n9sCrkTqPaQKBgQCF1JItONaST+67Cj3Q9kHsHTeRnfZNDv9hSUFiFrPeoGmcH5Jg\nNacFdBYaOtgpbe4dYmPn6bDxl9WP3RRKdQkanvAVG4Sh95+NbzOmg4trZCGfb0QH\nJo/f4FdWq/St6bvLUQXGHuWJbzHNi6XrJaeN0/mSn5ylqBSPupRvRQmR4QKBgC17\nXPVvKP2HiA/WQu8g9tzSZcTeZTnIJh/oFG+DBnmPtnPWwI2uX5AtEzmBgcv3bmQf\nDzDPbQ0h0TnmHZQz6FoBqjAD9MnoNgLhwk6AbuznGZRkC5OHdTOwfW0HaL4IBVzc\nFpfOXJ5eyer21T8Ns1rmY/+jchDh763WqbqpzAXhAoGAF1L+MmFJzvPmJg8xdYZ6\nS44hlX0I73YT1KLIYcZ7rX7e1nhCqyn/QZdj9xXspy8nJOV4flH3Nf3ZAl9vc36a\nyl2hrEabCrGOKW6e/wzAkQk0p9HPFsRAw1cQJHItnXBX2cFWcH5S1083BuSXdXfQ\ngDYEyjRSE4XJh5ts3DB+0ZE=\n-----END PRIVATE KEY-----\n",
  //   },
  // });
  // const bucket = storage.bucket("tribal-test-2022");

  console.log('ALL OK HERE');
  const fileName = `${Date.now()}.jpg`;

  const data = req.body.file;

  const response = await uploadAndGetPublicFile(fileName, data);

  console.log('###### ' + response.publicUrl);

  res.status(200).json(response);
}

// import { Storage } from "@google-cloud/storage";

// export default async function handler(req, res) {
//   const storage = new Storage({
//     projectId: "tribal-test-e798e",
//     credentials: {
//       client_email:
//         "tribal-test-bucket@tribal-test-e798e.iam.gserviceaccount.com",
//       private_key:
//         "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCp3rJI+Jry38ic\nBtOIXpQe1GZ9oSjtz9wLaqP0OJSYNt7JiWhU319anSlLnDput5Kw97/id5h7Jyjc\nQRf0GBoqPSX+f+wAO7idEq2mdPnbmgxEJ3vWb5OooBO3l+RjAwJypxr44WdD9f0A\nDkmFbUV8v/HEoluVduW7OVhcdSnWMHf1kMP0x498aQLWQqR1WfFPubTDU3C90tJv\nRkYcfZwsG+mNyF0TE48rBAw8XoBHJxb3SRTzhNAvWEOSgCyLlYMhtnk1lw1y8C9c\nEefqVlVnX84F5WV4+nCTRBgCtibzZ4+S/cQkkPsJ9fT7mBQ/p+FV9sbp1aCCOKMF\nly/CQRwBAgMBAAECggEABwIyJP6Ehm+10zyDstk5H1utgLKFpxMyiFzi4m8zr/iN\nQQTcnhTVwQi3NOsKF6TsENsLSr9wYNNnqo0RJ+Vsg0Xg2OMOWbTya+D4Mxlu23ub\n1N40AYUlaIQ18Axx/uT3b24mLR2AAS7c5zPPtCk4dYT7XLIuA744jLIZNikGMVO0\ncR8YS98AZWO187OaAOwZAgKcibJy53cxH+ujgkTCZFVs195aPiVUeLMcRPimSUiS\npDgwTZdCKSlzDnFOJoQlX7Fp132g5dxzUlIdH0/AiDSsdY04xGXzzu4FzZRQvfZc\nHA0SM4+cP/j38bTZ2HlBHnvDcbusRd5DU13OfnU9WQKBgQDgu2OH53dtiDTBzA4j\nBxOq4THsJfBh2TKPyTvDz8MPD+2BiusI5QyJI1AXnroNa86kg00gmPh9ybwzO6pO\nF3rQ2fJvexeEw4hI7qoBJjA3ucTHaVBoY9qTMbcNliCL/keOhyFygVKf0V7usVYT\n2+oxdGmEsPEAHBa4ccsd/8us2QKBgQDBgTQydRreLBmmOq2XsnSQAiuYodaFktgu\ngOcylFdtDrEEzmpNflNWS/juEEZsPmTWRusw1kiq9UUhbTY3d0SAmTsgE8G+I384\nbzwISeD6URNnEK9bdIuE+whmuDwvWAElDSc4Hy811f3m4mvsGymOwOVPbgvnmm8C\n9sCrkTqPaQKBgQCF1JItONaST+67Cj3Q9kHsHTeRnfZNDv9hSUFiFrPeoGmcH5Jg\nNacFdBYaOtgpbe4dYmPn6bDxl9WP3RRKdQkanvAVG4Sh95+NbzOmg4trZCGfb0QH\nJo/f4FdWq/St6bvLUQXGHuWJbzHNi6XrJaeN0/mSn5ylqBSPupRvRQmR4QKBgC17\nXPVvKP2HiA/WQu8g9tzSZcTeZTnIJh/oFG+DBnmPtnPWwI2uX5AtEzmBgcv3bmQf\nDzDPbQ0h0TnmHZQz6FoBqjAD9MnoNgLhwk6AbuznGZRkC5OHdTOwfW0HaL4IBVzc\nFpfOXJ5eyer21T8Ns1rmY/+jchDh763WqbqpzAXhAoGAF1L+MmFJzvPmJg8xdYZ6\nS44hlX0I73YT1KLIYcZ7rX7e1nhCqyn/QZdj9xXspy8nJOV4flH3Nf3ZAl9vc36a\nyl2hrEabCrGOKW6e/wzAkQk0p9HPFsRAw1cQJHItnXBX2cFWcH5S1083BuSXdXfQ\ngDYEyjRSE4XJh5ts3DB+0ZE=\n-----END PRIVATE KEY-----\n",
//     },
//   });

//   const bucket = storage.bucket("tribal-test-2022");
//   const file = bucket.file(Date.now() + "_" + req.query.file);
//   const options = {
//     expires: Date.now() + 1 * 60 * 1000, //  1 minute,
//     success_action_status: "201",
//     fields: { "x-goog-meta-test": "data" },
//   };

//   const [response] = await file.generateSignedPostPolicyV4(options);
//   console.log("###### " + response.url + response.fields.key);
//   response.filePath = response.url + response.fields.key;
//   res.status(200).json(response);
// }
