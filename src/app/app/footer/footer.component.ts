import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  showFooter: string;

  constructor(private router: Router) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        console.log(this.router.url);
        let regex = /project-edit/;
        if (this.router.url == '/about' || this.router.url == '/cms' || this.router.url == '/cms/home' ||
         this.router.url == '/cms/projects' || regex.test(this.router.url)) {
          this.showFooter = null;
        } else {
          this.showFooter = 'show';
        }
        console.log(this.showFooter);
      }
    });
  }

  ngOnInit() {}
}
