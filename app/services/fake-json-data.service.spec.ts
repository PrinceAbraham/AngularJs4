import { TestBed, inject } from '@angular/core/testing';

import { FakeJsonDataService } from './fake-json-data.service';

describe('FakeJsonDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeJsonDataService]
    });
  });

  it('should be created', inject([FakeJsonDataService], (service: FakeJsonDataService) => {
    expect(service).toBeTruthy();
  }));
});
