import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { UserInterface } from '../types/user.interface';

describe('user service', () => {
  //reference later to our service
  let userService: UsersService;

  //we must create a testing module to test service inside
  //its a block executed before every single test
  beforeEach(() => {
    //create a testing module, register service inside the module
    TestBed.configureTestingModule({
      providers: [UsersService],
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

    it('it should remove the user', () => {
      userService.users = [{ id: '3', name: 'ali' }];
      userService.removeUser('3');
      expect(userService.users).toEqual([]);
    });
  });
});
