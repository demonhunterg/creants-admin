import { TestBed, inject } from '@angular/core/testing';

import { QantApiService } from './qant-api.service.ts';

describe('QantApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QantApiService]
    });
  });

  it('should ...', inject([QantApiService], (service: QantApiService) => {
    expect(service).toBeTruthy();
  }));
});
