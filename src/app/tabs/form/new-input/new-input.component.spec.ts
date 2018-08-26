import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInputComponent } from './new-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from '../../tabs.component';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';

describe('NewInputComponent', () => {
  let component: NewInputComponent;
  let fixture: ComponentFixture<NewInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 

describe('NewInputComponent Test', () =>{

  let component: NewInputComponent;
  let fixture: ComponentFixture<NewInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInputComponent ],
      imports: [FormsModule, ReactiveFormsModule,  MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('is add-input component defined', () =>{
    expect(component).toBeDefined();
  })

  it('is form valid', () => {
    expect(component.form.valid).toBeTruthy();
  })
})
