import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { Placeholders } from '../../../helpers/constants';
// import { StoreModel } from '../../../models/store.model';

export class StoreSelectConfig {
    public isMultiSelect?: boolean = true;
    public placeholder: any = 'Select people';
    public showCheckboxes?: boolean = true;
    public showSelectAll?: boolean = true;
}

@Component({
    selector: 'app-store-picker',
    templateUrl: './store-picker.component.html',
    styleUrls: ['./store-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StorePickerComponent),
            multi: true
        }
    ]
})
export class StorePickerComponent implements OnInit, ControlValueAccessor {

    @Input() public config: StoreSelectConfig = new StoreSelectConfig();
    @Input() public storeList: Array<any>;

    @Output() public selectOrClearAll = new EventEmitter();

    public selectedItem: string | Array<string>;
    public selectedStores: Array<any> = [];
    public stores: Array<any>;
    public propagateChange: Function; // Needed for ControlValueAccessor Interface
    public storeSubscription: Subscription;

    public ngOnInit(): void {
        //
    }

    // ControlValueAccessor interface methods

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public writeValue(value): void {
        this.selectedStores = value;
        this.selectedItem = value;
    }

    public registerOnTouched(fn: any): void {
        // Needed for ControlValueAccessor Interface
    }

    public setDisabledState(isDisabled: boolean): void {
        // Needed for ControlValueAccessor Interface
    }

    // class methods

    /**
     * emit value when select/unselect all is selected
     */
    private propagateSelectUnselectAll(): void {
        this.selectionChanged();
        this.selectOrClearAll.emit();
    }

    /**
     * select all stores
     */
    public selectAll(): void {
        this.selectedStores = this.storeList;
        this.propagateSelectUnselectAll();
    }

    /**
     * Selection changed, output to parent
     */
    public selectionChanged(): void {
        this.propagateChange(this.selectedStores);
    }

    /**
     * clear all stores
     */
    public unselectAll(): void {
        this.selectedStores = [];
        this.propagateSelectUnselectAll();
    }

}