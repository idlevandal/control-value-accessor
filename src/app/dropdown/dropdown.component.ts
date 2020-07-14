import { Component, OnInit, forwardRef, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Person } from '../data.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Output() selectionChange = new EventEmitter<any>();
  
  people$: any;

  public value;
  public onChange: Function;
  public onTouched: Function;
  public selectedPeople: Array<Person> = [];
  public bindSelectedPeople: Array<any>;
  public disabled: boolean;
  public propagateChange: Function;

  constructor(private dataService: DataService) {}
  
  ngOnInit() {
      this.dataService.getPeople()
        .subscribe(val => this.people$ = val);
  }

  // CONTROL VALUE ACCESSOR METHODS

  writeValue(value): void {
    if (value === null) {
      this.selectedPeople = [];
    }
    this.selectedPeople = value || '';
    // this.selectedPeople;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // CLASS METHODS
  
  public selectAll(): void {
    // bindSelectedPeople to bind to ngModel
    // selectedPeople to send to form
    this.bindSelectedPeople = this.people$.map(e => e.name);
    this.selectedPeople = this.people$;
    this.propagateChange(this.selectedPeople);
  }

  public unselectAll(): void {
    this.bindSelectedPeople = [];
    this.selectedPeople = [];
    this.propagateChange(this.selectedPeople);
  }
}
