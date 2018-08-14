import { TestBed, inject } from '@angular/core/testing';

import { GroupSocketService } from './group-socket.service';

describe('GroupSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupSocketService]
    });
  });

  it('should be created', inject([GroupSocketService], (service: GroupSocketService) => {
    expect(service).toBeTruthy();
  }));
});
