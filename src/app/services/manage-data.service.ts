import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  private category = new BehaviorSubject<string>('DeviceInfo');
  private showForm = new BehaviorSubject<boolean>(false);

  currentCategory = this.category.asObservable();
  currentShowForm = this.showForm.asObservable();
  constructor() { console.log('Connected')}


  changeCurrentCategory(category: string){
    this.category.next(category);
  }

  changeCurrentShowForm(show: boolean){
    this.showForm.next(show);
  }
}
