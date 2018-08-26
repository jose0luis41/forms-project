import { Component, OnInit, NgModule, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatInput, MatCardModule, MatCard, MatFormField, MatSelect, MatSelectModule, MatOptionModule, MatOption, MatButtonModule, MatCardContent, MatButton } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { ManageDataService } from '../../services/manage-data.service';
import { MatIconModule, MatIcon } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,


  ],
  exports: [
    MatInput,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatCard,
    MatCardContent,
    MatIcon
  ],
  providers: [],

})
export class FormComponent implements OnInit {

  inputForm: FormGroup;
  inputs = [
    {
      'name': 'Testing',
      'description': 'testing Description',
      'deviceResource': 'Default Value',
      'defaultValue': 'Default value testing',
      'dataType': 'STRING',
      'format': 'NUMBER',
      'category': 'DeviceInfo',
      'showDetails': false,
      'rangeMin': 10,
      'rangeMax': 20,
      'unitMeasure': 'cm',
      'precision': 2,
      'accuracy': 2,
    },
    {
      'name': 'Testing1',
      'description': 'Testing 1 Description',
      'deviceResource': 'Default 1 Value',
      'defaultValue': 'Default 1 value testing',
      'dataType': 'STRING',
      'format': 'BOOLEAN',
      'category': 'Metadata',
      'showDetails': false,
      'rangeMin': null,
      'rangeMax': null,
      'unitMeasure': null,
      'precision': null,
      'accuracy': null,
    },
    {
      'name': 'Testing 2',
      'description': 'testing 2 Description',
      'deviceResource': 'Default Value',
      'defaultValue': 'Default 2 value testing',
      'dataType': 'STRING',
      'format': 'NUMBER',
      'category': 'DeviceInfo',
      'showDetails': false,
      'rangeMin': 40,
      'rangeMax': 20,
      'unitMeasure': 'mm',
      'precision': 10,
      'accuracy': 10,
    },
  ]

  currentCategory: string;
  listInputs : string[];

  constructor(private fb: FormBuilder, private manageData: ManageDataService) { }

  public dataTypes = [{ 'name': 'STRING' }, { 'name': 'OBJECT' }];
  public formats = [{ 'name': 'NONE' }, { 'name': 'NUMBER' }, { 'name': 'BOOLEAN' }, { 'name': 'DATE-TIME' }, { 'name': 'CDATA' }, { 'name': 'URL' }];
  showNewInputForm;

  ngOnInit() {

    this.manageData.currentShowForm.subscribe(show => this.showNewInputForm = show);
    this.manageData.changeListInputs(this.inputs);
    this.manageData.currentCategory.subscribe(category => {
      this.currentCategory = category;
      this.createForm(this.inputs);

    });
    this.createForm(this.inputs);
  }


  public createForm(inputs) {
    var array = [];
    for (var index = 0; index < inputs.length; index++) {
      if (inputs[index].category === this.currentCategory) {
        array.push(this.buildInput(inputs[index]));
      }
    }

    this.inputForm = this.fb.group({
      inputs: this.fb.array(array)
    })
  }

  showDetails(input) {
    console.log();
    if (input.controls.showDetails.value === true) {
      input.controls.showDetails.value = false;
    } else {
      input.controls.showDetails.value = true;
    }
  }

  removeInput(input){
    var control = <FormArray>this.inputForm.controls['inputs'];

    for (let index = 0; index < this.inputForm.value.inputs.length; index++) {
      var currentInputForm = this.inputForm.value.inputs[index];
      if(currentInputForm.name === input.value.name){
        control.removeAt(index);
      }
      
    }
    console.log(this.inputForm);
    console.log(input);
  }

  ngOnChange() {
    console.log('change');
  }

  buildInput(input): FormGroup {
    var enumeraJson = input.enumerations;

    return this.fb.group({
      name: [input.name],
      description: [input.description],
      deviceResource: [input.deviceResource],
      defaultValue: [input.defaultValue],
      dataType: [input.dataType],
      format: [input.format],
      category: [input.category],
      showDetails: [input.showDetails],
      rangeMin: [input.rangeMin],
      rangeMax: [input.rangeMax],
      unitMeasure: [input.unitMeasure],
      precision: [input.precision],
      accuracy: [input.accuracy],

    })
  }

  addNewInput(){
    this.showNewInputForm = true;
  }

  onSubmit() {

  }

}
