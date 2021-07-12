import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { cleanFonts } from '../../main';
import { navigationCustom } from '../transition';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
})
export class SlideMenuComponent implements OnInit {
  showButton = false;
  nav = true;
  currentLang: string;
  // eslint-disable-next-line no-unused-vars
  constructor(public translate: TranslateService, public router: Router) {
    window.scroll(0, 0);
    if (translate.currentLang == 'es') {
      this.currentLang = 'es';
    } else {
      this.currentLang = 'en';
    }
  }

  ngOnInit(): void {
    cleanFonts();
  }

  navigation(ruta: string): void {
    navigationCustom(() => this.router.navigateByUrl(ruta));
  }

  navigationFragment(ruta: string, fragment: string): void {
    navigationCustom(() => this.router.navigate([ruta], { fragment: fragment }));
  }
}
