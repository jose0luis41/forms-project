import { Component, OnInit, NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatSelect, MatFormField, MatInput } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ManageDataService } from '../../../services/manage-data.service';

@Component({
  selector: 'app-new-input',
  templateUrl: './new-input.component.html',
  styleUrls: ['./new-input.component.scss']
})

@NgModule({
  declarations: [],
  imports: [

    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,

  ],
  exports: [
    MatInput,
    MatFormField,
    MatSelect,
  ],
  providers: [],

})
export class NewInputComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  newInput = {};

  public dataTypes = [{ 'name': 'STRING' }, { 'name': 'OBJECT' }];
  public formats = [{ 'name': 'NONE' }, { 'name': 'NUMBER' }, { 'name': 'BOOLEAN' }, { 'name': 'DATE-TIME' }, { 'name': 'CDATA' }, { 'name': 'URL' }];

  constructor(private fb: FormBuilder, private manageData: ManageDataService) { }

  ngOnInit() {

    this.form = this.fb.group({
      'nameInput': ['', Validators.required],
      'descriptionInput': ['',],
      'deviceInput': ['',],
      'defaultValueInput': ['',],
      'dataTypeInput': ['',],
      'formatInput': ['',],
      'enmuerationInput': ['',],
      'rangeMinInput': ['',],
      'rangeMaxInput': ['',],
      'unitMeasureInput': ['',],
      'precisionInput': ['',],
      'accuracyInput': ['',],

    });
    
  }

  manageValidations(format){
    if(format.name === 'NUMBER'){
      this.form.controls['rangeMinInput'].setValidators([Validators.required, this.greaterThan('rangeMaxInput')]);
      this.form.controls['rangeMaxInput'].setValidators([Validators.required, , this.lessThan('rangeMinInput')]);
      this.form.controls['precisionInput'].setValidators([Validators.required]);

      this.form.controls['rangeMinInput'].updateValueAndValidity();
      this.form.controls['rangeMaxInput'].updateValueAndValidity();
      this.form.controls['precisionInput'].updateValueAndValidity();



    }else{
      this.form.controls['rangeMinInput'].setValidators([]);
      this.form.controls['rangeMaxInput'].setValidators([]);
      this.form.controls['precisionInput'].setValidators([]);

      this.form.controls['rangeMinInput'].updateValueAndValidity();
      this.form.controls['rangeMaxInput'].updateValueAndValidity();
      this.form.controls['precisionInput'].updateValueAndValidity();

    }
  }


  onSubmit(){
    console.log(this.newInput);
  }


  manageFormCancel(){
    this.manageData.changeCurrentShowForm(false);
  }

  greaterThan(field: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const group = control.parent;
      const fieldToCompare = group.get('rangeMaxInput');
      const isLessThan = Number(fieldToCompare.value) < Number(control.value);
      return isLessThan ? {'lessThan': {value: control.value}} : null;
    }
  }

  lessThan(field: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const group = control.parent;
      const fieldToCompare = group.get('rangeMinInput');
      const isGreaterThan = Number(fieldToCompare.value) > Number(control.value);
      return isGreaterThan ? {'greaterThan': {value: control.value}} : null;
    }
  }

    



}
