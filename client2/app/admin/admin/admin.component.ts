import { Component, OnInit, ViewChild, Type, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';

import { AdminFormDirective } from '../admin-form.directive';
import { HomeService } from '../../home/home.service';

import { MaComponent } from '../ma/ma.component';
import { MainAnnouncement } from '../../home/main-announcement'

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  title : string;
  route : string;
  categories : string[];
  data : Object[];
  editForm : string;
  activeItem: object;
  formComponentRef : ComponentRef<any>;
  createNew : Function;

  @ViewChild(AdminFormDirective) formDir: AdminFormDirective;

  constructor(private homeService : HomeService, private router: Router, private cfr : ComponentFactoryResolver) { }

  ngOnInit() {
    //all admin urls lead to this same component - must keep track of which data to load
    let url = this.router.url;

    //based on url, we assign each property
    switch (url){
      case "/admin/mainAnnouncements":
        this.homeService.getMainAnnouncements().subscribe( (mainAnnouncements) => {
          this.data = mainAnnouncements;
          this.assignProperties("Main Announcements", "mainAnnouncement", ["title", "description"], 'assets/templates/maForm.html');
          this.loadForm(MaComponent, "mainAnnouncement");
          this.createNew = function() {
            return {_id:"", title: "", description: "", link: "", pic : {url: ""}};
          };
        });
        break;
    }
  }

  assignProperties(title : string, route : string, categories : string[], editform: string) {
    console.log(categories);
    this.title = title;
    this.route = route;
    this.categories = categories;
    this.editForm = editform;
  }

  create() {
    let elem = this.createNew();
    console.log(elem);
    this.data.unshift(elem);
  }

  setItem(item) {
    this.formComponentRef.instance.activeItem = item;
  }

  loadForm(component: Type<any>, route: string) {
    //create the component
    let componentFactory = this.cfr.resolveComponentFactory(component);

    //clear the current view
    let viewContainerRef = this.formDir.vcr;
    viewContainerRef.clear();

    //need the reference to set component to pass in the active item
    this.formComponentRef = viewContainerRef.createComponent(componentFactory);

    //pass in the route
    this.formComponentRef.instance.route = route;
  }

}
