import { Component, OnInit, NgModule } from '@angular/core';
import { MatTabsModule, MatTab, MatTabGroup, MatTabChangeEvent } from '@angular/material/tabs';
import {ManageDataService} from '../services/manage-data.service';
import { AppRoutingModule, routingComponents } from '../app-routing.module';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})

@NgModule({
  declarations: [
  ],
  imports: [
    MatTabsModule,
  ],
  exports: [
    MatTab, MatTabGroup
  ],
  providers: []

})
export class TabsComponent implements OnInit {

  constructor(private manageData: ManageDataService) { }

  ngOnInit() {

  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log(tabChangeEvent.tab.textLabel);
    this.manageData.changeCurrentCategory(tabChangeEvent.tab.textLabel);
  }

}
