/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Crypto from 'node:crypto';
import * as fs from 'node:fs';

import * as bcrypto from 'bcrypt';
import * as _ from 'lodash';
import * as RandToken from 'rand-token';

const randToken = RandToken.generator({
  chars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  source: Crypto.randomBytes,
});

export const md5 = (str: string): string => {
  const md5sum = Crypto.createHash('md5');
  md5sum.update(str);

  return md5sum.digest('hex');
};

export const passwordHashSync = (password: string): string =>
  bcrypto.hashSync(password, bcrypto.genSaltSync(12));

export const passwordVerifySync = (password: string, hash: string) =>
  bcrypto.compareSync(password, hash);

export const randomToken = (num: number) => randToken.generate(num);

export const parseToken = (token: string) => ({
  identiacal: token.slice(-9, 9),
  token: token.slice(0, 28),
});

export const fileSha256 = (file: string): Promise<string | void> =>
  new Promise((resolve, reject) => {
    const rs = fs.createReadStream(file);
    const hash = Crypto.createHash('sha256');
    rs.on('data', (data: string) => hash.update(data));
    rs.on('error', (e: never) => reject(e));
    rs.on('end', () => {
      resolve(hash.digest('hex'));
    });
  });

export const stringSha256Sync = (contents: string): string => {
  const sha256 = Crypto.createHash('sha256');
  sha256.update(contents);

  return sha256.digest('hex');
};

export const packageHash = (jsonData: JSONObject): void => {
  /*  */
};

// export const qetag = buffer => {};

// export const sha256AllFiles = files => {};

// export const uploadPackageType = directoryPath => {};

// export const isHashIgnored = relativePath => {};

// export const isPackageHashIgnore = relativePath => {};

// export const calcAllFileSha256 = directoryPath => {};

export const sortJsonToArr = (json: JSONObject): JSONObject[] => {
  const rs: JSONObject[] = [];
  _.forIn(json, (value, key) => {
    rs.push({ path: key, hash: value });
  });

  return _.sortBy(rs, (o: JSONObject) => o.path);
};
