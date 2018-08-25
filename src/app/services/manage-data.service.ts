import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  private category = new BehaviorSubject<string>('DeviceInfo');

  currentCategory = this.category.asObservable();

  constructor() { console.log('Connected')}


  changeCurrentCategory(category: string){
    this.category.next(category);
  }
}
