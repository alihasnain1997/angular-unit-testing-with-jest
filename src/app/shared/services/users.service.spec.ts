import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { UserInterface } from '../types/user.interface';
import { UtilsService } from './utils.service';

describe('user service', () => {
  //reference later to our service
  let userService: UsersService;

  //Mock
  const utilServiceMock = {
    pluck: jest.fn(),
  };
  //we must create a testing module to test service inside
  //its a block executed before every single test
  beforeEach(() => {
    //create a testing module, register service inside the module
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: UtilsService, useValue: utilServiceMock },
      ],
    });
    userService = TestBed.inject(UsersService);
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

      expect(userService.users).toEqual([{ id: '3', name: 'ali' }]);
    });
  });

  describe('remove user', () => {
    it('it should remove the user', () => {
      userService.users = [{ id: '3', name: 'ali' }];
      userService.removeUser('3');
      expect(userService.users).toEqual([]);
    });
  });

  describe('get user name', () => {
    it('it should return username', () => {
      utilServiceMock.pluck.mockReturnValue(['foo']);
      expect(userService.getUSernames()).toEqual(['foo']);
    });
  });
});
