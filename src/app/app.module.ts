import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent} from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { TabsComponent } from './tabs/tabs.component';
import { FormComponent } from './tabs/form/form.component';
import { MatCardModule, MatSnackBarModule } from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {ManageDataService} from './services/manage-data.service';
import { NewInputComponent } from './tabs/form/new-input/new-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    FormComponent,
    routingComponents,
    NewInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TabsComponent,
    ReactiveFormsModule,
    MatCardModule,
    AppRoutingModule,
    FormComponent,
    MatDividerModule,
    MatSnackBarModule

  ],
  providers: [ManageDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
