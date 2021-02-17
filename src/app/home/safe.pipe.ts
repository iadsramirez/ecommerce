import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(url:string): unknown {
    console.log('lo que viene del api url:'+url);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
