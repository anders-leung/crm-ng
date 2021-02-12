import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { Globals } from './globals';
import _ from 'lodash';
import { navigation } from './navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  watcher: Subscription;
  activeMediaQuery: string = '';
  title = 'CRM';
  navigation: any = navigation;
  selected: any;
  mode: string = 'side';
  expanded: boolean = true;
  loading: boolean = true;

  constructor(
    public globals: Globals,
    public router: Router,
    public cookieService: CookieService,
    mediaObserver: MediaObserver,
  ) {
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      switch (change.mqAlias) {
        case 'sm':
        case 'xs':
          this.mode = 'over';
          this.expanded = false;
          break;
        default:
          this.mode = 'side';
          this.expanded = true;
      }
      this.loading = false;
    });
  }

  ngOnInit() {
    const userCookie = this.cookieService.get('User');
    if (userCookie) {
      this.globals.user = JSON.parse(userCookie);
    }

    const { user } = this.globals;
    if (Object.keys(user).length === 0) {
      this.redirectToLogin();
    }

    this.globals.haveAccess();
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  public redirectToLogin() {
    this.router.navigate(['/login']);
    // this.router.navigate(['/clients/client']);
  }

  logout() {
    this.globals.user = {};
    this.cookieService.deleteAll('/');
    this.redirectToLogin();
  }

  onClick(item, i) {
    if (item.children) {
      this.toggleDropdown(item, i);
    } else {
      const lastSelected = this.navigation[this.selected] || {};
      const currentSelected = this.navigation[i];
      if (lastSelected.isChild && this.selected > -1 && !currentSelected.isChild) {
        let current = this.selected;
        while (this.navigation[current].isChild) {
          current -= 1;
        }
        this.toggleDropdown(this.navigation[current], current);
      }

      // this.selected = item;
    }
  }

  toggleDropdown(selected, index) {
    const { name } = selected;

    selected.isOpen = !selected.isOpen;
    if (!selected.isOpen) {
      this.removeChildren(selected, index);
    } else {
      this.addChildren(selected, index);
    }

    this.navigation.forEach((item, i) => {
      const { isOpen, name: itemName } = item;
      if (isOpen === true && name !== itemName) this.removeChildren(item, i);
    });
  }

  removeChildren(item, index) {
    const { children } = item;
    item.isOpen = false;
    this.navigation.splice(index + 1, children.length);
  }

  addChildren(item, index) {
    const { children } = item;
    const insert = children.map((child) => {
      child.isChild = true;
      return child;
    });
    this.navigation.splice(index + 1, 0, ...insert);
  }
}
