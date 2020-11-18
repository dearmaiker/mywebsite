import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router} from '@angular/router';
import { navigationCustom } from '../../transition';

@Component({
  selector: 'app-fjcintranet',
  templateUrl: './fjcintranet.component.html',
  styles: [
  ]
})
export class FjcintranetComponent implements OnInit {
  families = [{name: 'Oswald', link: `https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap`},
  {name: 'Poppins', link: `https://fonts.googleapis.com/css2?family=Poppins&display=swap`}];
  ramdons = [
    {
      code: '/ormv',
      name: 'ORM',
      en: {
        resume: 'It is a web page created with HTML5, CSS3, JS and PHP. Created to make it easier for schools in Venezuela to register for the Recreational Mathematics Olympics.'
      },
      es: {
        resume: 'Es una pagina web creada con HTML5, CSS3, JS y PHP. Creado para facilitar a los colegios de Venezuela la inscripcion a las Olimpiadas Recreativas de Matematicas.'
      }
    },
    {
      code: '',
      name: 'My Portafolio',
      en: {
        resume: "A website that is a Single-page application(SPA). With a high-performance, responsive website that uses powered animations. As also, uses the creative SVG's power for enriching user experience."
      },
      es: {
        resume: "Es un sitio web de pagina unica(SPA). Con un alto rendimiento, un sitio web responsivo que utiliza animaciones potentes. Tambien, usa el poder de los SVG para enriquecer la experiencia del usuario."
      }
    },
    {
      code: '',
      name: 'Traumapp',
      es: {
        resume: 'Es una aplicación móvil multiplataforma desarrollada con React Native. Cuenta con una interfaz comoda para el usuario para un uso diario. Creada para optimizar una consulta medica y el manejo de la informacion de los pacientes.'
      },
      en: {
        resume: 'It is a multiplatform mobile application developed with React Native. It has a comfortable interface for the user for a daily use. Created to optimize a medical consultation and the management of patient information.'
      }
    }
  ];

  constructor(
    public translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.families.forEach((element, index) => {
      console.log(element, index);
      this.fontLoader(element);

      if(document.getElementById(`typographyName${index+1}`) != undefined){
        document.getElementById(`typographyName${index+1}`).innerHTML = element.name;
        document.getElementById(`typographyName${index+1}`).style.fontFamily = element.name;
      };

      if(document.getElementById(`typographyExample${index+1}`) != undefined){
        document.getElementById(`typographyExample${index+1}`).style.fontFamily = element.name;
      };
    });
  }

  fontLoader = (param) => {
    var headID = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = "link" + param.name;

    headID.appendChild(link);

    link.href = param.link;
  }

  navigateUrl(code: string){
    console.log(code);
    navigationCustom( () => this.router.navigate([code]) ); 
  }
}
