import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColorsService } from '../../services/colors.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-colors-edit',
  templateUrl: './colors-edit.component.html',
  styleUrls: ['./colors-edit.component.scss']
})
export class ColorsEditComponent implements OnInit {
  color: any;
  projects: any;

  editForm= this.fb.group({
    id: [null, [Validators.required]],
    colorhex: [null, [Validators.required]],
    projectid: [null, [Validators.required]]
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private colorsService: ColorsService,
    private projectsServicio: ProjectsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    let user = {
      sessionid: localStorage.sessionid,
    }
    this.projectsServicio.getProjectsCms(user).subscribe((result:any) => {
      this.projects = result.records;
      console.log(result.color);
    },
    (error) => {
      console.log(error);
    });

    this.activatedRoute.paramMap.subscribe(param => {
      let params = {
        id: param.get('id'),
        sessionid: localStorage.sessionid,
      }

      console.log(params);
      if(parseInt(params.id) != 0){
        this.colorsService.getColorById(params).subscribe((res: any) => {
          this.color = res.entry;
          console.log(this.color);
          this.updateForm(this.color);
        },
        (error) => {
          console.log(error);
        });
      }
    });
  }

  updateForm(color: any){
    this.editForm.patchValue({
      id: color.id,
      colorhex: color.colorhex,
      projectid: color.projectid
    });
  }

  navigate(url){
    this.router.navigateByUrl("cms/" + url);
  }
}
