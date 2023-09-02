import { padStart } from 'lodash';

export const strNumInc = (str: string) => `${Number(str) + 1}`;

export const createVersionSerial = (
  major = '0',
  minor = '0',
  patch = '0',
): string => `${major}${padStart(minor, 5, '0')}${padStart(patch, 10, '0')}`;

/*
    bit------
    major {3}
    minor {5}
    patch {10}
   */
export const parseVersion = (versionNo: string): string => {
  let version = '0';
  let data = null;

  if ((data = versionNo.match(/^(\d{1,3}).(\d{1,5}).(\d{1,10})$/))) {
    // "1.2.3"
    version = createVersionSerial(data[1], data[2], data[3]);
  } else if ((data = versionNo.match(/^(\d{1,3}).(\d{1,5})$/))) {
    // "1.2"
    version = createVersionSerial(data[1], data[2], '0');
  }

  return version;
};

/* min <= version < max */
export const validatorVersion = (
  versionNo: string,
): [boolean, string, string] => {
  let isValidate = true;
  let min = '0';
  let max = padStart('1', 19, '0'); /* not belong */
  let data: RegExpMatchArray | null;

  if ((data = versionNo.match(/^(\d{1,3}).(\d{1,5}).(\d{1,10})$/))) {
    // "1.2.3"
    min = createVersionSerial(data[1], data[2], data[3]);
    max = createVersionSerial(data[1], data[2], strNumInc(data[3]));
  } else if ((data = versionNo.match(/^(\d{1,3}).(\d{1,5})(\.\*){0,1}$/))) {
    // "1.2" "1.2.*"
    min = createVersionSerial(data[1], data[2], '0');
    max = createVersionSerial(data[1], strNumInc(data[2]), '0');
  } else if (
    // eslint-disable-next-line no-useless-escape
    (data = versionNo.match(/^~(\d{1,3}).(\d{1,5}).(\d{1,10})$/))
  ) {
    //"~1.2.3"
    min = createVersionSerial(data[1], data[2], data[3]);
    max = createVersionSerial(data[1], strNumInc(data[2]), '0');
  } else if ((data = versionNo.match(/^\^(\d{1,3}).(\d{1,5}).(\d{1,10})$/))) {
    //"^1.2.3"
    min = createVersionSerial(data[1], data[2], data[3]);
    max = createVersionSerial(strNumInc(data[1]), '0', '0');
  } else if (
    (data = versionNo.match(
      /^(\d{1,3}).(\d{1,5}).(\d{1,10})\s?-\s?(\d{1,3}).(\d{1,5}).(\d{1,10})$/,
    ))
  ) {
    // "1.2.3 - 1.2.7"
    min = createVersionSerial(data[1], data[2], data[3]);
    max = createVersionSerial(data[4], data[5], strNumInc(data[6]));
  } else if (
    (data = versionNo.match(
      /^>=(\d{1,3}).(\d{1,5}).(\d{1,10})\s?<(\d{1,3}).(\d{1,5}).(\d{1,10})$/,
    ))
  ) {
    // ">=1.2.3 <1.2.7"
    min = createVersionSerial(data[1], data[2], data[3]);
    max = createVersionSerial(data[4], data[5], data[6]);
  } else if (versionNo !== '*') {
    isValidate = false;
  }

  return [isValidate, min, max];
};
