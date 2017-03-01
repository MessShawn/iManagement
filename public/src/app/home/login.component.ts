import { Component }      from '@angular/core';

import { User }      from './user.js';

@Component({
  templateUrl: './login.html'
})

export class LoginComponent {
  user: User;

  onSubmit() {
    console.log(this.user);
  }
}
