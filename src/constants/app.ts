export enum PlatformType {
  IOS = 1,
  ANDROID = 2,
  WINDOW = 3,
}

export enum PlatformTypeName {
  IOS = 'ios',
  ANDROID = 'Android',
  WINDOWS = 'Windows',
}

export enum AppType {
  REACT_NATIVE = 1,
  CORDOVA = 2,
}

export enum AppTypeName {
  REACT_NATIVE = 'React-Native',
  CORDOVA = 'Cordova',
}

export enum DeploymentType {
  PRODUCTION = 'Production',
  STAGING = 'Staging',
}

export enum Manadatory {
  YES = 1,
  NO = 0,
}

export enum Disabled {
  YES = 1,
  NO = 0,
}

export enum ReleaseMethod {
  PROMOTE = 'Promote',
  UPLOAD = 'Upload',
}

export enum DeploymentStatus {
  SUCCESS = 1,
  FAILED = 2,
}

export enum UseDiffText {
  NO = 0,
  YES = 1,
}

export const DIFF_MANIFEST_FILE_NAME = 'hotcodepush.json';
export const CURRENT_DB_VERSION = '0.5.0';
