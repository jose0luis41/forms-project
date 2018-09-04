import { Component, OnInit, NgModule, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatInput, MatCardModule, MatCard, MatFormField, MatSelect, MatSelectModule, MatOptionModule, MatOption, MatButtonModule, MatCardContent, MatButton } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { ManageDataService } from '../../services/manage-data.service';
import { MatIconModule, MatIcon } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  
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
      'enumerations': ['TEST1', 'TEST2']
    }
   /*  {
      'name': 'Device Info 2',
      'description': 'Device Infor Testing 12 Description',
      'deviceResource': 'Default 1 Value',
      'defaultValue': 'Default test 2',
      'dataType': 'STRING',
      'format': 'BOOLEAN',
      'category': 'DeviceInfo',
      'showDetails': false,
      'rangeMin': null,
      'rangeMax': null,
      'unitMeasure': null,
      'precision': null,
      'accuracy': null,
      'enumerations': []

    },
    {
      'name': 'Sensors',
      'description': 'Testing Sensors description',
      'deviceResource': 'Default Value',
      'defaultValue': 'Default sensors',
      'dataType': 'STRING',
      'format': 'NUMBER',
      'category': 'Sensors',
      'showDetails': false,
      'rangeMin': 10,
      'rangeMax': 100,
      'unitMeasure': 'mm',
      'precision': 10,
      'accuracy': 10,
      'enumerations': []

    },
    {
      'name': 'Settings',
      'description': 'Testing Settings description',
      'deviceResource': 'Default Value',
      'defaultValue': 'Default Settings',
      'dataType': 'STRING',
      'format': 'NUMBER',
      'category': 'Settings',
      'showDetails': false,
      'rangeMin': 20,
      'rangeMax': 400,
      'unitMeasure': 'mm',
      'precision': 20,
      'accuracy': 20,
      'enumerations': []

    },
    {
      'name': 'Metadata',
      'description': 'Testing Metadata description',
      'deviceResource': 'Default Value',
      'defaultValue': 'Default Metadata',
      'dataType': 'OBJECT',
      'format': null,
      'category': 'Metadata',
      'showDetails': false,
      'rangeMin': null,
      'rangeMax': null,
      'unitMeasure': null,
      'precision': null,
      'accuracy': null,
      'enumerations': []

    }, */
  ]

  currentCategory: string;
  listInputs: string[];
  newJson;
  isSentEnum;

  constructor(private fb: FormBuilder, private manageData: ManageDataService) { }

  public dataTypes = [{ 'name': 'STRING' }, { 'name': 'OBJECT' }];
  public formats = [{ 'name': 'NONE' }, { 'name': 'NUMBER' }, { 'name': 'BOOLEAN' }, { 'name': 'DATE-TIME' }, { 'name': 'CDATA' }, { 'name': 'URL' }];
  showNewInputForm;

  ngOnInit() {

    this.manageData.currentShowForm.subscribe(show => this.showNewInputForm = show);
    this.manageData.changeListInputs(this.inputs);

  /*   this.manageData.currentSendEnum.subscribe(isSent => {
      this.isSentEnum = isSent;

      if(this.isSentEnum.length > 0){
        this.addEnumToArray();
      }
    }); */

    this.manageData.currentCategory.subscribe(category => {
      this.currentCategory = category;
      this.createForm(this.inputs);

    });

    this.manageData.currentInputJson.subscribe(json => {
      if (json) {
        this.newJson = JSON.parse(json);
        this.newJson['category'] = this.currentCategory;
        this.inputs.push(this.newJson);
        this.showNewInputForm = false;
        this.createForm(this.inputs)
      }

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
    console.log(input.controls);
    if (input.controls.showDetails.value === true) {
      input.controls.showDetails.value = false;
    } else {
      input.controls.showDetails.value = true;
    }
  }

  manageAddNewInput(input) {
    var control = <FormArray>this.inputForm.controls['inputs'];
    control.push(this.buildInput(input));
  }

  removeInput(input) {
    var control = <FormArray>this.inputForm.controls['inputs'];

    for (let index = 0; index < this.inputForm.value.inputs.length; index++) {
      var currentInputForm = this.inputForm.value.inputs[index];
      if (currentInputForm.name === input.value.name) {
        control.removeAt(index);
      }

    }
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

  addNewInput() {
    this.showNewInputForm = true;
  }

  onSubmit() {

  }

}
