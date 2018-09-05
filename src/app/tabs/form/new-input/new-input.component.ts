import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatSelect, MatFormField, MatInput, MatSnackBarModule, MatSnackBar } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ManageDataService } from '../../../services/manage-data.service';
import { Subscription } from 'rxjs';

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
    MatSnackBarModule

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
  inputs = [
    /* {
      'name': 'Device Info',
      'description': 'Device Info Testing',
      'deviceResource': 'Default Value',
      'defaultValue': 'Default test',
      'dataType': 'STRING',
      'format': 'NUMBER',
      'category': 'DeviceInfo',
      'showDetails': false,
      'rangeMin': 10,
      'rangeMax': 20,
      'unitMeasure': 'cm',
      'precision': 2,
      'accuracy': 2,
      'enum': null,
      'enumerations': ['TEST1', 'TEST2']
    } */];

  newInput = {
    'nameInput': null,
    'descriptionInput': null,
    'defaultValueInput': null,
    'dataTypeInput': 'STRING',
    'formatInput': 'NONE',
    'deviceInput': null,
    'showDetailsInput': false,
    'rangeMinInput': null,
    'rangeMaxInput': null,
    'unitMeasureInput': null,
    'precisionInput': null,
    'accuracyInput': null,
    'categoryInput': null,
    'enumInput': null,
    'enumerations': []
  };

  isPressAddNum = false;
  dataEnum;
  showEnum = true;
  listObservableInputs;
  showNewInputForm = false;
  currentCategory: string;
  numberInputs: number;

  public dataTypes = [{ 'name': 'STRING' }, { 'name': 'OBJECT' }];
  public formats = [{ 'name': 'NONE' }, { 'name': 'NUMBER' }, { 'name': 'BOOLEAN' }, { 'name': 'DATE-TIME' }, { 'name': 'CDATA' }, { 'name': 'URL' }];

  public listEnum = [{ 'name': 'Enum1' }, { 'name': 'Enum2' }];

  constructor(private fb: FormBuilder, private manageData: ManageDataService, public snackBar: MatSnackBar, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {

    // this.manageData.currentListInputs.subscribe(list => this.listObservableInputs = list);

    this.manageData.currentCategory.subscribe(category => {
      this.currentCategory = category;
      this.numberInputs = this.checkValueOfInputsByCategory();
    });

    this.createForm(this.inputs);


  }

  checkValueOfInputsByCategory() {
    var value = 0;
    if (this.form) {
      for (let index = 0; index < this.form.value.inputs.length; index++) {
        const element = this.form.value.inputs[index];
        if (element.categoryInput === this.currentCategory) {
          value++;
        }
      }
    }

    return value;
  }

  public createForm(inputs) {
    var array = [];

    for (var index = 0; index < inputs.length; index++) {
      /* if (inputs[index].category === this.currentCategory) { */
      array.push(this.buildInput(inputs[index]));
      /*  } */
    }

    this.form = this.fb.group({
      inputs: this.fb.array(array)
    });

  }

  buildInput(input): FormGroup {

    return this.fb.group({
      nameInput: [input.nameInput, [Validators.required, this.checkEqualsNames.bind(this)]],
      descriptionInput: [input.descriptionInput],
      deviceInput: [input.deviceInput],
      defaultValueInput: [input.defaultValueInput],
      dataTypeInput: [input.dataTypeInput],
      formatInput: [input.formatInput],
      categoryInput: [input.categoryInput],
      showDetailsInput: [input.showDetailsInput],
      rangeMinInput: [input.rangeMinInput,],
      rangeMaxInput: [input.rangeMaxInput],
      unitMeasureInput: [input.unitMeasureInput],
      precisionInput: [input.precisionInput],
      accuracyInput: [input.accuracyInput],
      enumInput: [input.enumInput],
      enumerations: this.addEnumToArray(input)
    })


  }


  addEnumToArray(inputParameter) {
    let arr = new FormArray([]);
    inputParameter.enumerations.forEach(element => {
      arr.push(this.fb.group({
        element: element
      }))
    });

    return arr;
  }

  manageValidations(format, input) {
    if (format.name === 'NUMBER') {
      this.showEnum = false;

      input.get('rangeMinInput').setValidators([Validators.required, this.greaterThan('rangeMaxInput')]);
      input.get('rangeMinInput').updateValueAndValidity();

      input.get('rangeMaxInput').setValidators([Validators.required, this.lessThan('rangeMinInput')]);
      input.get('rangeMaxInput').updateValueAndValidity();

      input.get('precisionInput').setValidators([Validators.required, this.divideRanges('precisionInput')]);
      input.get('precisionInput').updateValueAndValidity();

      input.get('accuracyInput').setValidators([Validators.required, this.divideRanges('accuracyInput')]);
      input.get('accuracyInput').updateValueAndValidity();

    } else {
      input.get('rangeMinInput').setValidators([]);
      input.get('rangeMinInput').updateValueAndValidity();

      input.get('rangeMaxInput').setValidators([]);
      input.get('rangeMaxInput').updateValueAndValidity();

      input.get('precisionInput').setValidators([]);
      input.get('precisionInput').updateValueAndValidity();

      input.get('accuracyInput').setValidators([]);
      input.get('accuracyInput').updateValueAndValidity();

    }

    if (
      format.name === 'BOOLEAN' ||
      format.name === 'DATE-TIME' ||
      format.name === 'CDATA' ||
      format.name === 'URL') {
      this.showEnum = false;

    } else if (format.name === 'NONE') {
      this.showEnum = true;
    }

  }


  onSubmit() {

    this.manageData.changeInputJson(JSON.stringify(this.newInput));
  
  }

  removeEnumValues(newEmun, position) {
    var index = this.form.controls.inputs.value[position].enumerations.indexOf(newEmun);
    this.form.controls.inputs.value[position].enumerations.splice(index, 1);

  }

  addEnumToList(input, index) {
    var json = { 'element': input.get('enumInput').value };

    input.get('enumerations').value.push(json)

    this.snackBar.open(input.get('enumInput').value + ' has been added successfully', 'OK', {
      duration: 6000,
    });


  }


  setValues(dataType, input) {
    if (dataType.name === 'OBJECT') {
      input.get('formatInput').value = null;
      input.get('defaultValue').value = null;
      this.showEnum = false;

    } else {
      input.get('formatInput').value = 'NONE';
      this.showEnum = true;

    }
  }

  manageFormCancel() {
    this.manageData.changeCurrentShowForm(false);
  }

  greaterThan(field: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const group = control.parent;
      const fieldToCompare = group.get('rangeMaxInput');
      const isLessThan = Number(fieldToCompare.value) < Number(control.value);
      return isLessThan ? { 'lessThan': { value: control.value } } : null;
    }
  }

  lessThan(field: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const group = control.parent;
      const fieldToCompare = group.get('rangeMinInput');
      const isGreaterThan = Number(fieldToCompare.value) > Number(control.value);
      return isGreaterThan ? { 'greaterThan': { value: control.value } } : null;
    }
  }

  divideRanges(value): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const group = control.parent;
      var fieldToCompareRangemin = group.get('rangeMinInput');
      var fieldToCompareRangeMax = group.get('rangeMaxInput');
      var precisionInput = group.get(value);
      const isOkDivison = (Number(fieldToCompareRangeMax.value) - Number(fieldToCompareRangemin.value)) % Number(precisionInput.value) !== 0;
      return isOkDivison ? { 'isOk': { value: control.value } } : null;
    }
  }

  showDetails(input) {
    if (input.controls.showDetailsInput.value === true) {
      input.controls.showDetailsInput.value = false;
    } else {
      input.controls.showDetailsInput.value = true;
    }
  }

  removeInput(input) {
    var control = <FormArray>this.form.controls['inputs'];

    for (let index = 0; index < this.form.value.inputs.length; index++) {
      var currentInputForm = this.form.value.inputs[index];
      if (currentInputForm.nameInput === input.value.nameInput) {
        control.removeAt(index);
      }

    }
  }


  checkEqualsNames(control: AbstractControl) {
    var isEqual = null;
    var numberRepetitation = 0;
    console.log(this.form.value.inputs);
    //var array = <FormArray>this.form.controls['inputs'];
    //console.log(array);
    if (this.form) {

      if(this.numberInputs >0){
        return isEqual;
      }else{
        for (let index = 0; index < this.form.value.inputs.length; index++) {
          const currentElement = this.form.value.inputs[index];
  
          if (currentElement.nameInput != null && control.value === currentElement.nameInput) {
  
            numberRepetitation++;
  
            isEqual = true;
  
            return { 'isEqual': true };
          }
        }
      }

  
    }

    return isEqual;
  }


  get formGr() {
    return this.form.controls;
  }

  manageAddNewInput(input) {
    var control = <FormArray>this.form.controls['inputs'];
    control.push(this.buildInput(input));
    //console.log(this.form.controls['inputs'][0]);
    //control.value[control.value.length - 1].get('nameInput').setValidators([this.checkEqualsNames.bind(this)]);
    //control.value[control.value.length - 1].get('nameInput').updateValueAndValidity();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  addNewInput(input) {
    //console.log(input);
    this.showNewInputForm = true;
    this.newInput['categoryInput'] = this.currentCategory;
    this.newInput['showDetailsInput'] = true;


    this.inputs.push(this.newInput);
    //this.listObservableInputs = this.inputs;
    this.manageAddNewInput(this.newInput);


  }

  onSearchChange(value : string){
    this.numberInputs = 0;
  }

}
