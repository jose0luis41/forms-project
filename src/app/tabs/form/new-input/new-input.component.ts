import { Component, OnInit, NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatSelect, MatFormField, MatInput, MatSnackBarModule, MatSnackBar } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
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
    {
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
    }];

  newInput = {
    'name': null,
    'description': null,
    'defaultValue': null,
    'dataType': 'STRING',
    'format': 'NONE',
    'deviceResource': null,
    'showDetails': false,
    'rangeMin': null,
    'rangeMax': null,
    'unitMeasure': null,
    'precision': null,
    'accuracy': null,
    'category': null,
    'enum': null,
    'enumerations': []
  };

  isPressAddNum = false;
  dataEnum;
  showEnum = true;
  listObservableInputs;
  unamePattern = "^[a-z0-9_-]{8,15}$";
  showNewInputForm = false;
  currentCategory: string;

  public dataTypes = [{ 'name': 'STRING' }, { 'name': 'OBJECT' }];
  public formats = [{ 'name': 'NONE' }, { 'name': 'NUMBER' }, { 'name': 'BOOLEAN' }, { 'name': 'DATE-TIME' }, { 'name': 'CDATA' }, { 'name': 'URL' }];

  public listEnum = [{ 'name': 'Enum1' }, { 'name': 'Enum2' }];

  constructor(private fb: FormBuilder, private manageData: ManageDataService, public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.manageData.currentListInputs.subscribe(list => this.listObservableInputs = list);

    this.manageData.currentCategory.subscribe(category => {
      this.currentCategory = category;
      this.createForm(this.inputs);

    });

    this.createForm(this.inputs);
   /* this.form = this.fb.group({
      'nameInput': ['', [Validators.required, this.checkEqualsNames.bind(this)]],
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

    });*/

  }

  public createForm(inputs) {
    var array = [];
    for (var index = 0; index < inputs.length; index++) {
      if (inputs[index].category === this.currentCategory) {
        array.push(this.buildInput(inputs[index]));
      }
    }

    this.form = this.fb.group({
      inputs: this.fb.array(array)
    })
  }

  buildInput(input): FormGroup {
    var enumeraJson = input.enumerations;

    return this.fb.group({
      nameInput: [input.name, [Validators.required, this.checkEqualsNames.bind(this)]],
      descriptionInput: [input.description],
      deviceInput: [input.deviceResource],
      defaultValueInput: [input.defaultValue],
      dataTypeInput: [input.dataType],
      formatInput: [input.format],
      categoryInput: [input.category],
      showDetailsInput: [input.showDetails],
      rangeMinInput: [input.rangeMin],
      rangeMaxInput: [input.rangeMax],
      unitMeasureInput: [input.unitMeasure],
      precisionInput: [input.precision],
      accuracyInput: [input.accuracy],
      enumInput: [input.enum],
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

  manageValidations(format) {
    if (format.name === 'NUMBER') {
      this.showEnum = false;

      this.form.controls['rangeMinInput'].setValidators([Validators.required, this.greaterThan('rangeMaxInput')]);
      this.form.controls['rangeMaxInput'].setValidators([Validators.required, , this.lessThan('rangeMinInput')]);
      this.form.controls['precisionInput'].setValidators([Validators.required, this.divideRanges('precisionInput')]);
      this.form.controls['accuracyInput'].setValidators([this.divideRanges('accuracyInput')]);

      this.form.controls['rangeMinInput'].updateValueAndValidity();
      this.form.controls['rangeMaxInput'].updateValueAndValidity();
      this.form.controls['precisionInput'].updateValueAndValidity();
      this.form.controls['accuracyInput'].updateValueAndValidity();



    } else {
      this.form.controls['rangeMinInput'].setValidators([]);
      this.form.controls['rangeMaxInput'].setValidators([]);
      this.form.controls['precisionInput'].setValidators([]);
      this.form.controls['accuracyInput'].setValidators([]);

      this.form.controls['rangeMinInput'].updateValueAndValidity();
      this.form.controls['rangeMaxInput'].updateValueAndValidity();
      this.form.controls['precisionInput'].updateValueAndValidity();
      this.form.controls['accuracyInput'].updateValueAndValidity();

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
  /*   if (this.form.valid && !this.isPressAddNum) {
      this.manageData.changeInputJson(JSON.stringify(this.newInput));
    } else {
      console.log('No valid');
    } */
  }

  removeEnumValues(newEmun) {
    var index = this.newInput.enumerations.indexOf(newEmun);
    this.newInput.enumerations.splice(index, 1);

  }

  addEnumToList(value) {
    if (value) {
      this.isPressAddNum = true;
      this.newInput.enumerations.push(this.dataEnum);
      this.manageData.changeSendEnum(this.dataEnum);
      this.snackBar.open(this.dataEnum + ' has been added successfully', 'OK', {
        duration: 6000,
      });
      this.dataEnum = null;

    } else {
      this.isPressAddNum = false;
    }

  }


  setValues(dataType) {
    if (dataType.name === 'OBJECT') {
      this.newInput['defaultValue'] = null;
      this.newInput['format'] = null;
      this.showEnum = false;

    } else {
      this.newInput['format'] = 'NONE';
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
      const isOkDivison = (Number(fieldToCompareRangeMax.value) / Number(fieldToCompareRangemin.value)) !== Number(precisionInput.value);
      return isOkDivison ? { 'isOk': { value: control.value } } : null;
    }
  }



  checkEqualsNames(control: AbstractControl) {
    var isEqual = null;

    for (let index = 0; index < this.listObservableInputs.length && isEqual === null; index++) {
      const currentElement = this.listObservableInputs[index];
      if (control.value === currentElement.name) {
        isEqual = true;
        return { 'isEqual': true };
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

  }

  addNewInput(){
    this.showNewInputForm = true;
    this.newInput['category'] = this.currentCategory;
    this.inputs.push(this.newInput);

    this.manageAddNewInput(this.newInput);
    //console.log(this.inputs);
    //this.createForm(this.inputs);
    //this.manageData.changeInputJson(JSON.stringify(this.newInput));

  }





}
