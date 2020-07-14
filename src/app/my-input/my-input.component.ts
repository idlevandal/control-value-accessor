import { Component, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyInputComponent),
      multi: true
    }
  ]
})

export class MyInputComponent implements ControlValueAccessor {

  public value: string;
  public onChange: Function;
  public onTouched: Function;
  disabled: boolean;

  @ViewChild('emailInput') email: ElementRef;

  writeValue(value: string): void {
    if (value === null) {
      this.email.nativeElement.value = '';
    }
    this.value = value || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor() { }

}
