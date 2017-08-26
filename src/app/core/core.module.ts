import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {OwlModule} from 'ng2-owl-carousel';
@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    OwlModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    OwlModule
  ]
})

export class CoreModule {
}
