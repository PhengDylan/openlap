import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../shared';

import { CarSetupPage } from './car-setup.page';
import { Lap, RaceControlPage } from './race-control.page';
import { RaceSettingsPage } from './race-settings.page';

import { ChequeredFlagComponent } from './chequered-flag.component';
import { FuelGaugeComponent } from './fuel-gauge.component';
import { LeaderboardComponent, LeaderboardHeadComponent, LeaderboardItemComponent } from './leaderboard.component';
import { StartlightComponent } from './startlight.component';

@NgModule({
  declarations: [
    ChequeredFlagComponent,
    FuelGaugeComponent,
    LeaderboardComponent,
    LeaderboardHeadComponent,
    LeaderboardItemComponent,
    StartlightComponent,

    CarSetupPage,
    Lap,
    RaceControlPage,
    RaceSettingsPage
  ],
  entryComponents: [
    CarSetupPage,
    RaceControlPage,
    RaceSettingsPage
  ],
  exports: [
    CarSetupPage,
    RaceControlPage,
    RaceSettingsPage
  ], 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule
  ],
  providers: [
  ]
})
export class RMSModule {}
