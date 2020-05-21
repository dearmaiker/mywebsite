import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  project: any;
  typographies: any;
  colors: any;
  features: any;
  id: any;

  editForm= this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    datecreated: ['', [Validators.required]],
    rolEs: ['', [Validators.required]],
    rolEn: ['', [Validators.required]],
    agencyEs: ['', [Validators.required]],
    agencyEn: ['', [Validators.required]],
    resumeEs: ['', [Validators.required]],
    resumeEn: ['', [Validators.required]],
    introductionEs: ['', [Validators.required]],
    introductionEn: ['', [Validators.required]]
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectsServicio: ProjectsService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.typographies = [""];
    this.colors = [""];
    this.features = [""];
    this.activatedRoute.paramMap.subscribe(params => {
      let nameProject = {
        id: params.get('id'),
      }
      this.id = parseInt(nameProject.id);

      console.log(nameProject.id);
      if(parseInt(nameProject.id) != 0){
        this.projectsServicio.getById(nameProject).subscribe((res: any) => {
          this.project = res.entry;
          this.colors = this.project.colors;
          let features = [];

          for(let i = 0; i < this.project.en.features.length; i++){
            features.push({
              tituloEs: this.project.es.features[i].title,
              tituloEn: this.project.en.features[i].title,
              dscEs: this.project.es.features[i].dsc,
              dscEn: this.project.en.features[i].dsc
            });
          }

          this.features = features;
          this.typographies = this.project.typographies;
          this.updateForm(this.project);
          console.log(this.project);
        },
        (error) => {
          console.log(error);
        });
      }
    });
  }

  updateForm(project: any){
    this.editForm.patchValue({
      code: project.code,
      name: project.name,
      datecreated: project.datecreated,
      rolEs: project.es.role,
      rolEn: project.en.role,
      agencyEs: project.es.agency,
      agencyEn: project.en.agency,
      resumeEs: project.es.resume,
      resumeEn: project.en.resume,
      introductionEs: project.es.introduction,
      introductionEn: project.en.introduction
    });
  }

  addColor(id){
    let regx = /^\#?[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?$/;
    let colorhex = document.getElementById('colorhex' + id) as HTMLInputElement;
    console.log(regx.test(colorhex.value));
    if(colorhex.value != "" && regx.test(colorhex.value)){
      this.colors[id] = {
        colorhex: colorhex.value
      }
      colorhex.value = "";
      this.colors.push("");
    }else{
      alert('Color en Hexadecimal requerido');
    }
    console.log(this.colors);
  }

  deleteColors(index){
    this.colors.splice(index, 1);
    if(index == 0){
      this.colors.push("");
    }
  }

  addTypography(id){
    let name = document.getElementById('typographyName' +id) as HTMLInputElement;
    let url = document.getElementById('urlTypography' + id) as HTMLInputElement;

    if(name.value != "" && url.value != ""){
      this.typographies[id] = {
        name: name.value,
        url: url.value
      }
      name.value = "";
      url.value = "";
      this.typographies.push("");
    }else{
      alert('Nombre y URL requerido');
    }
    console.log(this.typographies);
  }

  deleteTypography(index){
    this.typographies.splice(index, 1);
    if(index == 0){
      this.typographies.push("");
    }
  }

  addFeature(id){
    let tituloEs = document.getElementById('tituloEs' + id) as HTMLInputElement;
    let tituloEn = document.getElementById('tituloEn' + id) as HTMLInputElement;
    let dscEs = document.getElementById('dscEs' + id) as HTMLInputElement;
    let dscEn = document.getElementById('dscEn' + id) as HTMLInputElement;

    if(tituloEs.value != "" && tituloEn.value != "" &&
    dscEs.value != "" && dscEn.value != ""){
      this.features[id] = {
        tituloEs: tituloEs.value,
        tituloEn: tituloEn.value,
        dscEs: dscEs.value,
        dscEn: dscEn.value
      }

      tituloEn.value = "";
      tituloEs.value = "";
      dscEs.value = "";
      dscEn.value = "";
      this.features.push("");
    }else{
      alert('Todos los campos son requeridos');
    }
    console.log(this.features);
  }

  deleteFeatures(index){
    this.features.splice(index, 1);
    if(index == 0){
      this.features.push("");
    }
  }

  logout(){
    let user = {
      sessionid: localStorage.sessionid,
    }

    this.loginService.logout(user).subscribe((res:any) => {
      localStorage.clear();
      this.router.navigateByUrl("/cms");
    },
    (error) => {
      console.log(error);
    })

  }

  navigate(url){
    this.router.navigateByUrl("cms/" + url);
  }

  save(){
    if(this.id != 0){
      if(this.editForm.valid){
        let params = {
          code: this.editForm.get('code').value,
          name: this.editForm.get('name').value,
          datecreated: this.editForm.get('datecreated').value,
          rolss: this.editForm.get('rolEs').value,
          rolen: this.editForm.get('rolEn').value,
          agencyes: this.editForm.get('agencyEs').value,
          agencyen: this.editForm.get('agencyEn').value,
          resumees: this.editForm.get('resumeEs').value,
          resumeen: this.editForm.get('resumeEn').value,
          introductiones: this.editForm.get('introductionEs').value,
          introductionen: this.editForm.get('introductionEn').value
        }
        console.log(params);
      }else{
        alert("Nada de campos vacios");
      }
    }else{
      if(this.editForm.valid && this.features.length > 1 &&
      this.colors.length > 1 && this.typographies.length > 1){
        let colors = "";
        for(let i = 0; i < this.colors.length; i++){
          colors += this.colors[i].colorhex == undefined ? '' : this.colors[i].colorhex + "~";
        }
        colors = colors.slice(0,-1);
        console.log(colors);

        let typographiesName = "";
        let typographiesUrl = "";
        for(let i = 0; i < this.typographies.length; i++){
          typographiesName += this.typographies[i].name == undefined ? '' : this.typographies[i].name + "~";
          typographiesUrl += this.typographies[i].url == undefined ? '' : this.typographies[i].url + "~";
        }
        typographiesName = typographiesName.slice(0,-1);
        typographiesUrl = typographiesUrl.slice(0,-1);
        console.log(typographiesName);
        console.log(typographiesUrl);

        let tituloEs = "";
        let tituloEn = "";
        let dscEs = "";
        let dscEn = "";
        for(let i = 0; i < this.features.length; i++){
          tituloEs += this.features[i].tituloEn == undefined ? '' : this.features[i].tituloEn + "~";
          tituloEn += this.features[i].tituloEs == undefined ? '' : this.features[i].tituloEs + "~";
          dscEs += this.features[i].dscEs == undefined ? '' : this.features[i].dscEs + "~";
          dscEn += this.features[i].dscEn == undefined ? '' : this.features[i].dscEn + "~";
        }

        tituloEs = tituloEs.slice(0, -1);
        tituloEn = tituloEn.slice(0, -1);
        dscEs = dscEs.slice(0, -1);
        dscEn = dscEn.slice(0, -1);

        let params = {
          code: this.editForm.get('code').value,
          name: this.editForm.get('name').value,
          datecreated: this.editForm.get('datecreated').value,
          rolss: this.editForm.get('rolEs').value,
          rolen: this.editForm.get('rolEn').value,
          agencyes: this.editForm.get('agencyEs').value,
          agencyen: this.editForm.get('agencyEn').value,
          resumees: this.editForm.get('resumeEs').value,
          resumeen: this.editForm.get('resumeEn').value,
          introductiones: this.editForm.get('introductionEs').value,
          introductionen: this.editForm.get('introductionEn').value
        }
        console.log(params);

      }else{
        alert('Todos los datos son requeridos');
      }
    }
  }
}
