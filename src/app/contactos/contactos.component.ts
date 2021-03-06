import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {
  public data: any = {};
  public contactoForm: FormGroup;
  public errorMessages: any = {};
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.contactoForm = this.formBuilder.group( {
      nombre: ['', Validators.required],
      mensaje: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  doContact() {
    // tslint:disable-next-line:no-var-keyword
    var b: any;
    console.log('Form: ', this.contactoForm);
    this.showMessages();
    if (!this.contactoForm.valid) {
      console.log('Error: ', this.errorMessages);
      return;
    }
    // tslint:disable-next-line:one-line
    else {
      // tslint:disable-next-line:prefer-const
      const str_href = `mailto:contacto@spechi.mx?subject=${encodeURI(this.data.asunto)}&body=${encodeURI(`${this.data.mensaje}
      contacto:
      nombre:   ${this.data.nombre}
      correo:   ${this.data.correo}
      telefono: ${this.data.tel}`)}`;
      b = document.createElement('a');
      b.setAttribute('href', str_href);
      b.innerHTML  = 'test value';
      b.click();
    }
  }

  hasError(controlName, error, force = false) {
    const control = this.contactoForm.controls[controlName];

    try {
      return control.errors[error] && (control.dirty || force);
    } catch (e) {
      return false;
    }
  }


  showMessages() {
    for (const k in this.contactoForm.controls) {
      if (this.contactoForm.controls.hasOwnProperty(k)) {
        this.errorMessages[k] = this.hasError(k, 'required', true);
      }
    }
  }

}
