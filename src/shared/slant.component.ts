import { Component, Input } from '@angular/core';

@Component({
  selector: 'slant',
  styles: [`
           :host {
             display: block;
             position: relative;
             overflow: hidden;
             width: 100%;
             height: 100%;
           }
           .slant-content {
             width: 100%;
             height: 100%;
           }
           .slant-stripe {
             position: absolute;
             min-height: 100%;
             width: 100%;
             top: 0;
             left: 0;
             -webkit-transform: skew(-30deg);
             transform: skew(-30deg);
             -webkit-transform-origin: top right;
             transform-origin: top right;
             border-right: 0.3em solid;
             background: #999;
             z-index: -1
           }`
          ],
  templateUrl: 'slant.component.html'
})
export class SlantComponent {
  @Input() color: string;
}
