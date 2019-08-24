
import * as crypto from 'crypto';
import { fixedTimeComparison } from 'cryptiles';

export const verifySignature = async (req) => {
  if (req.rawBody && req.headers['x-hub-signature']) {
    const signature = crypto.createHmac('sha1', process.env.GITHUB_HOOK_SECRET || '')
    .update(req.rawBody)
    .digest('hex');
    return fixedTimeComparison(`sha1=${signature}`, req.headers['x-hub-signature'])
  }
  return false;
}
