import { Component } from '@angular/core';

import { PopoverController, ViewController } from 'ionic-angular';

import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Options, Settings } from '../core';
import { Logger } from '../logging';

function stringify(obj) {
  try {
    return JSON.stringify(obj);
  } catch(error) {
    return '' + obj;
  }
}

@Component({
  template: `
    <ion-item-group>
      <ion-item>
        <ion-label translate>Debug messages</ion-label>
        <ion-checkbox [(ngModel)]="debugEnabled"></ion-checkbox>
      </ion-item>
      <button ion-item (click)="share()">
        <span translate>Share</span>&hellip;
      </button>
      <button ion-item (click)="clear()">
        <span translate>Clear</span>
      </button>
    </ion-item-group>
  `
})
export class LoggingPopover {

  private options = new Options();

  private subscription: any;

  get debugEnabled() {
    return this.options.debug;
  }

  set debugEnabled(value) {
    this.options.debug = value;
    this.settings.setOptions(this.options);
    this.close();
  }

  constructor(private appVersion: AppVersion, private sharing: SocialSharing, private device: Device,
    public logger: Logger, private settings: Settings, private view: ViewController) {}

  clear() {
    this.logger.clear();
    this.close();
  }

  close() {
    return this.view.dismiss();
  }

  share() {
    Promise.all([this.appVersion.getAppName(), this.appVersion.getVersionNumber()]).then(([name, version]) => {
      const message = this.logger.records.map(record => {
        return [record.level, record.time, record.args.map(stringify).join(' ')].join('\t');
      }).join('\n');
      const subject = name + ' ' + version + ' (' + [this.device.model, this.device.platform, this.device.version].join(' ') + ')';
      return this.sharing.shareWithOptions({ message: message, subject: subject });
    }).catch(error => {
      this.logger.error('Error sharing log:', error);
    }).then(() => {
      this.close();
    });
  }

  ngOnInit() {
    this.subscription = this.settings.getOptions().subscribe({
      next: (options) => {
        this.logger.info('Logging settings: ', options);
        this.options = options;
      },
      error: (error) => {
        this.logger.error('Logging settings: ', error);
      },
      complete: () => {
        this.logger.info('Logging settings complete');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

@Component({
  templateUrl: 'logging.page.html',
})
export class LoggingPage {

  icons = [
    {name: 'bug', style: {color: 'white'}},
    {name: 'bug', style: {color: 'green'}},
    {name: 'information-circle', style: {color: 'blue'}},
    {name: 'warning', style: {color: 'yellow'}},
    {name: 'alert', style: {color: 'red'}}
  ];

  constructor(public logger: Logger, private popover: PopoverController) {}

  stringify(obj) {
    return stringify(obj);
  }

  presentPopover(event) {
    let popover = this.popover.create(LoggingPopover);
    popover.present({ev: event});
  }
}
