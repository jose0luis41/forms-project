import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  private category = new BehaviorSubject<string>('DeviceInfo');
  private listInputs = new BehaviorSubject<any[]>([]);
  private showForm = new BehaviorSubject<boolean>(false);
  private inputJson = new BehaviorSubject<string>('');

  currentCategory = this.category.asObservable();
  currentShowForm = this.showForm.asObservable();
  currentListInputs = this.listInputs.asObservable();
  currentInputJson = this.inputJson.asObservable(); 

  constructor() { console.log('Connected')}


  changeCurrentCategory(category: string){
    this.category.next(category);
  }

  changeCurrentShowForm(show: boolean){
    this.showForm.next(show);
  }

  changeListInputs(list: any[]){
    this.listInputs.next(list);
  }

  changeInputJson(json:string){
    this.inputJson.next(json);
  }


}
