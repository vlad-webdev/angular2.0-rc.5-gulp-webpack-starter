import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppCmp} from "./components/app.component";

@NgModule({
  imports: [BrowserModule],
  declarations: [AppCmp],
  bootstrap: [AppCmp]
})
export class AppModule {}
