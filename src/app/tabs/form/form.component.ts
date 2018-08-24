import { Component, OnInit, NgModule } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormArray} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatInput, MatCardModule, MatCard, MatFormField, MatSelect, MatSelectModule, MatButtonModule, MatCardContent, MatButton} from '@angular/material';
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
    MatCardModule,

  ],
  exports: [
    MatInput,
    MatFormField,
    MatSelect,
    MatButton,
    MatCard,
    MatCardContent,
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
      'dataType': 'String',
      'format': 'NUMBER',
      'category': 'Category1',
      'enumerations': [
        {
          'rangeMin': 10,
          'rangeMax': 20,
          'unitMeasure': 'cm',
          'precision': 2,
          'accuracy': 2,

        }
      ]
    },
    {
      'name': 'Testing1',
      'description': 'Testing 1 Description',
      'deviceResource': 'Default 1 Value',
      'defaultValue': 'Default 1 value testing',
      'dataType': 'String',
      'format': 'BOOLEAN',
      'category': 'Category2',
      'enumerations': 
        {
          'rangeMin': null,
          'rangeMax': null,
          'unitMeasure': null,
          'precision': null,
          'accuracy': null,

        }
      
    }
  ]
  constructor(private fb: FormBuilder, private fbEnum: FormBuilder) { }

  ngOnInit() {
    this.createForm(this.inputs);
  }


  public createForm(inputs){
    var array = [];
    for (var index = 0; index < inputs.length; index++) {
        array.push(this.buildInput(inputs[0]));      
    }
    this.inputForm = this.fb.group({
      inputs: this.fb.array(array)
    })
  }


  buildInput(input): FormGroup{   
    var enumeraJson = input.enumerations;
 
    return this.fb.group({
      name: [input.name],
      description: [input.description],
      deviceResource : [input.deviceResource],
      defaultValue : [input.defaultValue],
      dataType : [input.dataType],
      format : [input.format],
  /*     enumerations: this.fbEnum.group({
        rangeMin: [enumeraJson.rangeMin],
        rangeMax: [enumeraJson.rangeMax],
        unitMeasure: [enumeraJson.unitMeasure],
        precision: [enumeraJson.precision],
        accuracy: [enumeraJson.accuracy],

      }) */
      


    })
  }

  onSubmit(){

  }

}
