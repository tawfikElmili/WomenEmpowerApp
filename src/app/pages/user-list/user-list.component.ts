import { UserModel } from "./../../shared/models/UserModel";
import { UserService } from "./../../shared/Services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  userlist: UserModel[] = [];
  user: UserModel;
  constructor(private userService: UserService) {
    this.user = new UserModel();
  }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      console.log(res);
      this.userlist = res;
    });
  }
}
