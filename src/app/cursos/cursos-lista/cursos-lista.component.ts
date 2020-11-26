import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Curso } from 'src/app/interfaces/curso';
import { CursosService } from '../cursos.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  bsModalRef: BsModalRef;
  constructor(
    private cursoService: CursosService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    // this.cursoService.lista().subscribe(dados => this.cursos = dados)
    this.onRefresh();

  }

  onRefresh() {
    this.cursos$ = this.cursoService.lista()
      .pipe(
        catchError(error => {
          console.log(error);
          // this.error$.next(true);
          this.onHandleError();
          return EMPTY;
        })
      );
    /* this.cursoService.subscribe(
      dados => {
        console.log(dados)
      },
      error => console.log(error),
      () => console.log('Observable completo!')
    ); */
  }

  onHandleError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde';
  }

}
