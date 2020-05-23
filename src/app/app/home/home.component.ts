import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { HttpClient } from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showButton: boolean = true;
  projects: any;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private projectsServicio: ProjectsService
  ) {
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit() {
    this.projectsServicio.getProjects().subscribe((result:any) => {
      this.projects = result.records;
      console.log(result);
    });
  }

}
