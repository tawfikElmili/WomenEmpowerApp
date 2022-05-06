import { UserService } from "./../../shared/Services/user.service";
import { RoleModel, UserModel } from "./../../shared/models/UserModel";
import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public register: UserModel;

  submitted = false;
  rolesList: RoleModel[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.register = new UserModel();
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.submitted = true;
    console.log(this.register);
    if (form.valid) {
      this.userService.register(this.register).subscribe((res: UserModel) => {
        const resSTR = JSON.stringify(res);
        const resJSON = JSON.parse(resSTR);
        if (resJSON.status === "ok") {
          form.reset();
          this.router.navigate(["/login"]);
        }
      });
    }
  }
}
