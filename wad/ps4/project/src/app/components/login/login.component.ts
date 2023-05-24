import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = "Register Form";

  getValue(username: string , password:string) {
    var data = {'username': username , 'password': password};
    console.log(data);
    localStorage.setItem('user', JSON.stringify(data))
  }
}
