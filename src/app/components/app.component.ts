import {Component} from "@angular/core";

@Component({
  selector: 'app',
  template: require("./app.html"),
  styles: [require('./style.scss')]
})

export class AppCmp {
  test: string = 'app component test';
}

