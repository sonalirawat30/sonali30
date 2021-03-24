import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Store, select } from '@ngrx/store';
import { IUsers } from '../user';
import * as UserActions from '../user.actions';
import * as fromUser from '../user.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  pageTitle = 'User List';
  users: IUsers[] = [];
  errorMessage: string;

  constructor(private userService: UserService,
    private store: Store<any>) { }

  ngOnInit(): void {

    //  this.userService.getUsers()
    //  .subscribe((users)=>{this.users=users.users});
    this.store.dispatch(new UserActions.LoadUsers());
    this.store.pipe(select(fromUser.getUsers)).subscribe(
      users => {
        this.users = users;
        console.log(users)

      }
    )

    // this.store.pipe(select(fromUser.getError)).subscribe(
    //   err => {
    //     this.errorMessage = err;
    //   }
    // )

  }
}
