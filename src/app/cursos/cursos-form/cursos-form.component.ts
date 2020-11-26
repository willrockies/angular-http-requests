import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  formulario: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    /* let registro = null;

      this.route.params.subscribe(
       (params: any) => {
         const id = params['id'];
         console.log(id);
         const curso$ = this.service.loadById(id);
         curso$.subscribe(curso => {
           registro = curso
           this.updateForm(curso);
         });
       }
     ); */

    // refatorando
    /* this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.service.loadById(id))
      )
      .subscribe(
        curso => {
          this.updateForm(curso);
        }
      ); */

    const curso = this.route.snapshot.data['curso'];


    this.formulario = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });

  }

  /*   updateForm(curso) {
      this.formulario.patchValue({
        id: curso.id,
        nome: curso.nome
      });
    } */

  hasError(field: string) {
    return this.formulario.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      console.log('submit');
      this.service.create(this.formulario.value).subscribe(
        success => {
          this.modal.showAlertSuccess('criado com sucesso');
          this.location.back();
        },
        error => this.modal.showAlertDanger('Error ao criar curso, tente novamente'),
        () => console.log('request completo')
      );
    }
  }
  onCancel() {
    this.submitted = false;
    this.formulario.reset();
  }


}
