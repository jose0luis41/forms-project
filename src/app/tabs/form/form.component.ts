import { Component, OnInit, NgModule, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormArray} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatInput, MatCardModule, MatCard, MatFormField, MatSelect, MatSelectModule, MatOptionModule, MatOption, MatButtonModule, MatCardContent, MatButton} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {ManageDataService} from '../../services/manage-data.service';
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

        
      
    }
  ]

  currentCategory: string;

  constructor(private fb: FormBuilder, private fbEnum: FormBuilder, private manageData: ManageDataService) { }

  public dataTypes = [{ 'name': 'STRING' }, {'name': 'OBJECT' }];
  public formats = [{'name': 'NONE' }, { 'name': 'NUMBER' }, {'name': 'BOOLEAN' }, {'name': 'DATE-TIME' }, {'name': 'CDATA' }, {'name': 'URL' }];

  ngOnInit() {
    this.manageData.currentCategory.subscribe(category => {
      this.currentCategory = category;
      this.createForm(this.inputs);
 
    });
    this.createForm(this.inputs);
  }


  public createForm(inputs){
    var array = [];
    for (var index = 0; index < inputs.length; index++) {
      if(inputs[index].category === this.currentCategory){
        array.push(this.buildInput(inputs[index]));      
      }
    }

    this.inputForm = this.fb.group({
      inputs: this.fb.array(array)
    })
  }

  showDetails(input){
    input.get('showDeatils').value = true
    console.log(input);
    //this.createForm(this.inputs);
  }

/*   ngOnChanges(changes: SimpleChanges) {
    const category: SimpleChange = changes.currentCategory;

    this.currentCategory = category.currentValue.toUpperCase();
    console.log('asdj');
  }
 */
  ngOnChange(){
    console.log('change');
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
      category: [input.category],
      showDetails: [input.showDetails],
      rangeMin: [input.rangeMin],
      rangeMax: [input.rangeMax],
      unitMeasure: [input.unitMeasure],
      precision: [input.precision],
      accuracy: [input.accuracy],      

    })
  }

  onSubmit(){

  }

}
