// import { TestBed } from '@angular/core/testing';
// import { ApiService } from './api.service';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
//   provideHttpClientTesting,
// } from '@angular/common/http/testing';
// import { TagInterface } from '../types/tag.interface';
// import { provideHttpClient } from '@angular/common/http';

// describe('Api Service', () => {
//   let apiService: ApiService;

//   let httpTestingController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       //import http testing client
//       providers: [ApiService, provideHttpClient(), provideHttpClientTesting()],
//     });
//     apiService = TestBed.inject(ApiService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   //Verify that no unmatched requests are outstanding.
//   // If any requests are outstanding, fail with an error message indicating which requests were not handled.
//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('Create Service', () => {
//     expect(apiService).toBeTruthy();
//   });

//   //get the tags
//   describe('get tags', () => {
//     it('should return tags', () => {
//       let tags: TagInterface[] | undefined;
//       apiService.getTags().subscribe((res) => {
//         tags = res;
//       });

//       const req = httpTestingController.expectOne('http://localhost:3004/tags');
//       expect(tags).toEqual([]);
//     });
//   });
// });

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { TagInterface } from '../types/tag.interface';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://localhost:3004';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensures no unexpected HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTags', () => {
    it('should fetch tags from API', () => {
      let tags: TagInterface[] | undefined;
      const mockTags: TagInterface[] = [
        { id: '1', name: 'foo' },
        { id: '2', name: 'TypeScript' },
      ];

      service.getTags().subscribe((res) => {
        // expect(tags).toEqual(mockTags);
        tags = res;
      });
      const req = httpTestingController.expectOne(`${apiUrl}/tags`);
      req.flush(mockTags);
      expect(tags).toEqual(mockTags);

      //   expect(req.request.method).toBe('GET');
    });
  });

  describe('createTag', () => {
    it('should send POST request and return created tag', () => {
      const newTag: TagInterface = { id: '3', name: 'RxJS' };
      let tag: TagInterface | undefined;

      service.createTag('RxJS').subscribe((res) => {
        // expect(tag).toEqual(newTag);
        tag = res;
      });

      const req = httpTestingController.expectOne(`${apiUrl}/tags`);
      req.flush(newTag);
      expect(tag).toEqual(newTag);
      //   expect(req.request.method).toBe('POST');
      //   expect(req.request.body).toEqual({ name: 'RxJS' });
    });

    it('throws an error if request fails', () => {
      let actualError: HttpErrorResponse | undefined;
      service.createTag('foo').subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: (err) => {
          actualError = err;
        },
      });
      const req = httpTestingController.expectOne(`${apiUrl}/tags`);
      req.flush('Server Error', {
        status: 422,
        statusText: 'unprocessable entity',
      });

      if(!actualError){
        throw new Error('Error Needs to be defined');
      }

      expect(actualError.status).toEqual(422)
      expect(actualError.statusText).toEqual('unprocessable entity')
    });
  });
});
