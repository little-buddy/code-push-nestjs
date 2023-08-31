import { createMock } from '@golevelup/ts-jest';
import { Test, type TestingModule } from '@nestjs/testing';
import * as shellJs from 'shelljs';

import { FileUploadService } from './file-upload.service';

describe('FileUploadService', () => {
  let fileService: FileUploadService;
  const temp = 'temp';
  const tempFile = 'temp/t';
  beforeAll(() => {
    shellJs.mkdir(temp);
    shellJs.touch(tempFile);
  });

  afterAll(() => {
    shellJs.rm('-rf', temp);
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [FileUploadService],
    })
      .useMocker(createMock)
      .compile();

    fileService = app.get<FileUploadService>(FileUploadService);
  });

  describe('uploadFileToLocal', () => {
    // error need wrap function
    it('Check flow"', () => {
      // check key
      expect(() => fileService.uploadFileToLocal('12', 'testPath')).toThrow(
        /^generate key 12 is too short\.$/,
      );

      // check filePath
      expect(() => fileService.uploadFileToLocal('test', 'testPath')).toThrow(
        `ENOENT: no such file or directory, stat 'testPath'`,
      );

      // check file
      expect(() => fileService.uploadFileToLocal('test', temp)).toThrow(
        `${temp} must be file`,
      );

      // expect(() => fileService.uploadFileToLocal('test', tempFile)).toThrow(
      //   'Please set local storageDir',
      // );

      expect(fileService.uploadFileToLocal('test', tempFile)).toBe('test');
    });
  });
});
