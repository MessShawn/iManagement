import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  name = 'Angular';

  ngOnInit(): void {
    if (!window._user || window._user._id) {
      this.router.navigate(['login'], { relativeTo: this.route });
    }
  }
}
