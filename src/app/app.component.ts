import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Title } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') ComponentCssClass: any;
  dashboard: boolean = false;
  webpage: boolean = false;
  session: boolean = false;
  getTitle: any = null;
  mobileQuery: MediaQueryList;

  constructor(private router: Router, private overlayContainer: OverlayContainer, private titleService: Title, private activePage: ActivatedRoute, media: MediaMatcher) {
    //more info about Title here: https://www.youtube.com/watch?v=8iWAChl3rCQ&t=1128s&ab_channel=TheCodeCaptain
    this.router.events.subscribe(event => {
      if (document.location.href?.includes("dashboard")) {
        this.dashboard = true;
        this.webpage = false;
        this.session = false;
        let url = document.location.href;
        //url = url.replace("http://" + window.location.host + "/#/dashboard/pages/", "");
        url = url.replace("https://ejdaodev.github.io/dashboard-angular-material/#/dashboard/", "");
        url = url.replace(/-/g, " ");
        let words = url.split(" ");
        for (let i = 0; i < words.length; i++) {
          let j = words[i].charAt(0).toUpperCase();
          words[i] = j + words[i].substr(1).toLowerCase();
        }
        this.setTitle('Dashboard | ' + words.join(" "));
      } else if (document.location.href?.includes("session")) {
        this.dashboard = false;
        this.session = true;
        this.webpage = false;
        let url = document.location.href;
        //url = url.replace("http://" + window.location.host + "/#/session/", "");
        url = url.replace("https://ejdaodev.github.io/dashboard-angular-material/#/session/", "");
        url = url.replace(/-/g, " ");
        let words = url.split(" ");
        for (let i = 0; i < words.length; i++) {
          let j = words[i].charAt(0).toUpperCase();
          words[i] = j + words[i].substr(1).toLowerCase();
        }
        this.setTitle(words.join(" "));
      } else {
        this.dashboard = false;
        this.session = false;
        this.webpage = true;
        switch (true) {
          case event instanceof NavigationEnd:
            this.titleService.setTitle(this.activePage.firstChild?.snapshot.data.title);
            break;
          default:
            break;
        }
      }
    })

    this.mobileQuery = media.matchMedia('(max-width: 600px)');


  }

  public setTitle(newTitle: any) {
    this.titleService.setTitle(newTitle);
  }

  uiElements = [
    { name: 'Iconos', route: '/dashboard/icons' },
    { name: 'Botones', route: '/dashboard/buttons' }
  ]


  ngOnInit() {
    if (localStorage.getItem('style') != null) {
      if (localStorage.getItem('style') == 'dark-theme') {
        this.onSetTheme('dark-theme');
      } else if (localStorage.getItem('style') == 'cool-theme') {
        this.onSetTheme('cool-theme');
      } else {
        this.onSetTheme('cool-theme');
      }
    } else {
      this.onSetTheme('cool-theme');
    }
  }

  public SetTheme(e: string) {
    if (e != localStorage.getItem('style')) {
      localStorage.setItem('style', e)
      window.location.reload();
    }

  }

  public onSetTheme(e: string) {
    this.overlayContainer.getContainerElement().classList.add(e);
    this.ComponentCssClass = e;
  }

  onActivate(event: any) {
    //https://www.youtube.com/watch?v=MwnISpn0GOc&ab_channel=MediaDiary
    window.scroll(0, 0);
  }
}
