import { DomSanitizerPipe } from './dom-sanitizer/dom-sanitizer.pipe';
import { NgModule } from '@angular/core';
import { UrlSanitizerPipe } from './url-sanitizer/url-sanitizer.pipe';

@NgModule({
  declarations: [
    DomSanitizerPipe,
    UrlSanitizerPipe
  ],
  exports: [
    DomSanitizerPipe,
    UrlSanitizerPipe
  ]
})
export class PipesModule {}
