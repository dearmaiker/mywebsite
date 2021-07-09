import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { navigationCustom } from '../../transition';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() showAbout: boolean = false;
  @Input() headerNav: boolean = false;
  showHeader: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.showHeader  = true;
        
        let links = document.getElementsByTagName('link');
        let isOkey = false;

        // Funcion para eliminar tipografias de proyectos
        do{
          isOkey = true;
          for(let i = 0; i < links.length; i++){
            if(links[i].id != ''){
              //console.log(links[i]);
              isOkey = false;
              links[i].remove();
            }
          }
        }while(!isOkey);

        if(this.headerNav){
          this.animation();
        }
        
        setTimeout(() => {
          var button = document.getElementsByClassName('hamburguer')[0];
          if(button != undefined){
            if(!button.classList.contains('bt-menu-open') && this.router.url == '/menu'){
              button.classList.toggle('bt-menu-open');
            }
          }
        }, 10);
        
        
      }
    });
  }

  ngOnInit() {
  }

  navigation(ruta: string) {
    if(this.router.url != '/menu'){
      this.animation();
      navigationCustom( () => this.router.navigateByUrl(ruta) ); 
    }
  }

  navigationAbout(ruta: string){
    navigationCustom( () => this.router.navigateByUrl(ruta) ); 
  }

  animation(){
    var button = document.getElementsByClassName('hamburguer')[0];
    if(button != undefined){
      button.classList.toggle('bt-menu-open');
    }
  }
}
