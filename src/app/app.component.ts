import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private isEnabled: boolean = true;
  public persons = [];
  
  constructor(private formBuilder: FormBuilder) {}
  
  loginForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    dropdown: ['', Validators.required]
  })

  public disableAll(): void {
    this.isEnabled = !this.isEnabled;
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      this.isEnabled ? control.enable() : control.disable();
    })
  }

  public save(form: FormGroup): void {
    // console.log(form);
  }

  public clear(): void {
    this.loginForm.reset();
  }


}
