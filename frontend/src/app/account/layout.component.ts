import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/_services';

@Component({ selector: 'app-account-layout', templateUrl: 'layout.component.html', standalone: false })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        // only redirect if account is fully loaded and valid
        const account = this.accountService.accountValue;
        if (account && account.jwtToken) {
            this.router.navigate(['/']);
        }
    }
}