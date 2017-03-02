import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User }      from './user.js';

import { HomeService } from './home.service.js';

@Component({
	moduleId: module.id,
	templateUrl: "./login.html",
	providers: [HomeService]
})

export class LoginComponent implements OnInit {
	user: User;

	constructor(
        private homeService: HomeService,
        private route: ActivatedRoute,
        private router: Router
    ) {
		this.user = new User('', '');
	}

    ngOnInit(): void {
		if (window._user && window._user._id) {
			this.router.navigateByUrl('home');
		}
	}

	onSubmit() {
		this.homeService.login(this.user)
            .then(user =>
                if (user && user._id) {
                    this.router.navigateByUrl('home');
                }
            );
	}
}
