import { environment } from "./../../../environments/environment";
import { loginModel, RoleModel, UserModel } from "./../models/UserModel";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private _http: HttpClient) {}

  registerUrl = "http://localhost:9092/register";
  getAllUserUrl = "http://localhost:9092/";
  loginUrl = "http://localhost:9092/";
  getAllRolesUrl = "";
  deleteUserUrl = "http://localhost:9092//dell";
  updateUserUrl = "http://localhost:9092/modifie-user/";
  affectRoleToUserUrl = "";

  options = {
    params: new HttpParams().append("token", localStorage.getItem("token")),
  };
  httpHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  login(login: loginModel): Observable<any> {
    return this._http
      .post(this.loginUrl, login)
      .pipe(retry(1), catchError(this.processError));
  }
  register(register: UserModel): Observable<UserModel> {
    return this._http
      .post<UserModel>(
        this.registerUrl,
        JSON.stringify(register),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  getAllUsers(): Observable<UserModel[]> {
    return this._http
      .post<UserModel[]>(this.getAllUserUrl, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  getAllRoles(): Observable<RoleModel[]> {
    return this._http
      .get<RoleModel[]>(this.getAllRolesUrl, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this._http
      .post<UserModel>(this.updateUserUrl, user, this.options)
      .pipe(retry(1), catchError(this.processError));
  }

  getUserById(user: UserModel): Observable<UserModel> {
    return this._http
      .post<UserModel>("/users/getById", user, this.options)
      .pipe(retry(1), catchError(this.processError));
  }

  processError(err: any) {
    let message = "";
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }
}
