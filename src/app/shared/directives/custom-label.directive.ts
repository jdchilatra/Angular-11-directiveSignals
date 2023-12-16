import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit{

  private htmlElement?: ElementRef<HTMLElement>
  private _color: string = 'red'
  private _errors: ValidationErrors | null = null;

  //Se agrega set para indicar que se requiere cambiar el valor
  @Input() set color(value: string){
    this._color = value
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null){
    this._errors = value;
    console.log(value);
    this.setErrorMessage();
  }

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    this.htmlElement = el;
    //console.log('directiva ctor')
    //this.htmlElement.nativeElement.innerHTML = 'hm'
  }
  ngOnInit(): void {
    //console.log('directiva OnInit')
    this.setStyle();
  }

  setStyle():void{
    if(!this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(){
    if(!this.htmlElement) return;
    if(!this._errors){
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if(errors.includes('required')){
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if(errors.includes('minlength')){
      this.htmlElement.nativeElement.innerText = 'La longitud minima es 6';
      return;
    }
    if(errors.includes('email')){
      this.htmlElement.nativeElement.innerText = 'Email no valido';
      return;
    }
  }

}
