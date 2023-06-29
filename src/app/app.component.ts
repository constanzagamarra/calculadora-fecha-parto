import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestograma';
  form!: FormGroup;
  fep: Date | null = null;
  semanasGestacion: number=0;
  fechaMax: string= '';

  constructor(
    private formBuilder: FormBuilder,

  ) {
     // Calcula la fecha máxima permitida
     const currentDate = new Date();
     const fechaMax = new Date(currentDate.getFullYear(), currentDate.getMonth() + 9, currentDate.getDate());
     this.fechaMax = fechaMax.toISOString().split('T')[0]; // Convierte la fecha a formato YYYY-MM-DD
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
       
      date: ['', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
     
    });
  }

  calcularFechaDeParto() {
    const ultimaMenstruacion = new Date(this.form.get('date')?.value);
     
    if (ultimaMenstruacion ) {
      const fechaEstimada: Date = new Date(ultimaMenstruacion.getTime());
     //sumo 280 días (40 semanas) a la fecha de la ultimaMenstruacion para calcular la fecha estimada de parto.
      fechaEstimada.setDate(fechaEstimada.getDate() + 280);
  
  
      fechaEstimada.setHours(0, 0, 0, 0);
  
      this.fep = fechaEstimada;
      console.log(this.fep);
       
    }
  }
  

 
  
  
  
  
  
  
}

