import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { UserInterface } from '../types/user.interface';
// import { UtilsService } from './utils.service';

describe('user service', () => {
  //reference later to our service
  let userService: UsersService;
  // let utilService: UtilsService;

  //Mock
  // const utilServiceMock = {
  //   pluck: jest.fn(),
  // };

  //we must create a testing module to test service inside
  //its a block executed before every single test
  beforeEach(() => {
    //create a testing module, register service inside the module
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        // UtilsService,
        //For Mock
        // { provide: UtilsService, useValue: utilServiceMock },
      ],
    });
    userService = TestBed.inject(UsersService);
    // utilService = TestBed.inject(UtilsService);
  });

  //Test if the service is created
  it('creates a service', () => {
    expect(userService).toBeTruthy();
  });
  //Test the user add function
  describe('add user', () => {
    it('it should add new user and return the newly created user', () => {
      //create test data
      const user: UserInterface = {
        id: '3',
        name: 'ali',
      };

      //call the add function to test
      userService.addUser(user);

      expect(userService.users$.getValue()).toEqual([{ id: '3', name: 'ali' }]);
    });
  });

  describe('remove user', () => {
    it('it should remove the user', () => {
      userService.users$.next([{ id: '3', name: 'ali' }]);
      userService.removeUser('3');
      expect(userService.users$.getValue()).toEqual([]);
    });
  });

  // describe('get user name', () => {
  //   it('it should return username', () => {
  //     //Mock
  //     // utilServiceMock.pluck.mockReturnValue(['foo']);
  //     // expect(userService.getUSernames()).toEqual(['foo']);

  //     //Spy
  //     jest.spyOn(utilService, 'pluck');
  //     userService.users = [{ id: '3', name: 'ali' }];
  //     userService.getUSernames();
  //     expect(utilService.pluck).toHaveBeenCalledWith(userService.users, 'names');
  //   });
  // });
});
