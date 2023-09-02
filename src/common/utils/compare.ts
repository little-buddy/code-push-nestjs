import { eq, isEmpty } from 'lodash';

export const diffCollections = (
  collection1: ObjectValue<unknown>,
  collection2: ObjectValue<unknown>,
) => {
  const diffFiles = [];
  const collection1Only = [];
  const newCollection2 = { ...collection2 };

  if (collection1 instanceof Object) {
    for (const key of Object.keys(collection1)) {
      if (isEmpty(newCollection2[key])) {
        collection1Only.push(key);
      } else {
        if (!eq(collection1[key], newCollection2[key])) {
          diffFiles.push(key);
        }

        delete newCollection2[key];
      }
    }
  }

  return {
    diff: diffFiles,
    collection1Only,
    collection2Only: Object.keys(newCollection2),
  };
};
