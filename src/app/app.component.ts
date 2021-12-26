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
  session: boolean = false;
  mobileQuery: MediaQueryList;

  constructor(private router: Router, private overlayContainer: OverlayContainer, private titleService: Title, private activePage: ActivatedRoute, media: MediaMatcher) {
    this.router.events.subscribe(event => {
      if (document.location.href?.includes("dashboard")) {
        this.dashboard = true;
        this.session = false;
        this.setTitle('Dashboard');
      } else if (document.location.href?.includes("session")) {
        this.dashboard = false;
        this.session = true;
        if (document.location.href?.includes("login")) this.setTitle('Ingresar');
      } else {
        this.dashboard = false;
        this.session = false;
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
    window.scroll(0, 0);
  }
}
