import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn

} from '@angular/forms';

@Component({
  selector: 'test-course',
  templateUrl: './test.comp.html'
})


export class TestComponent {
  modalRef: BsModalRef;
  message: string;
  form: FormGroup;
  ordersData = [
    { id: 100, name: 'order 1' },
    { id: 200, name: 'order 2' },
    { id: 300, name: 'order 3' },
    { id: 400, name: 'order 4' }
  ];

  constructor(private formBuilder: FormBuilder,private modalService: BsModalService) {
    this.form = this.formBuilder.group({
      orders: new FormArray([], minSelectedCheckboxes(1))
    });

    this.addCheckboxes();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }


  private addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl(i === -1); // if first item set to true, else false
      (this.form.controls.orders as FormArray).push(control);
    });
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => (v ? this.ordersData[i].id : null))
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }
}


function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
