import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homecms',
  templateUrl: './homecms.component.html',
  styleUrls: ['./homecms.component.scss']
})
export class HomecmsComponent implements OnInit {
  projects: any;
  projectsTotal: any = 0;
  colors: any;
  typographies: any;
  features: any;
  featuresQty: any = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsServicio: ProjectsService
  ) {
  }

  ngOnInit() {
    let user = {
      sessionid: localStorage.sessionid,
    }
    this.projectsServicio.getProjectQty(user).subscribe((result:any) => {
      this.projects = result.records;
      console.log(result.records);
      for(let i = 0; i < this.projects.length; i++){
        this.projectsTotal += Number(this.projects[i].qty);
      }
    },
    (error) => {
      console.log(error);
    });

    this.projectsServicio.getColorsQty(user).subscribe((result:any) => {
      this.colors = result.records;
      console.log(result.records);
    },
    (error) => {
      console.log(error);
    });

    this.projectsServicio.getTypographyQty(user).subscribe((result:any) => {
      this.typographies = result.records;
      console.log(result.records);
    },
    (error) => {
      console.log(error);
    });

    this.projectsServicio.getFeaturesQty(user).subscribe((result:any) => {
      this.features = result.records;
      this.features.forEach(res => {
        this.featuresQty += parseInt(res.qty);
      });
      console.log(result.records);
    },
    (error) => {
      console.log(error);
    });
  }
}
