import { Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/curso';
import { CursosService } from '../cursos.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;


  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  cursoSelecionado: Curso;


  constructor(
    private cursoService: CursosService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde';

  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }
  onDelete(curso) {

    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onConfirmDelete() {
    this.cursoService.remove(this.cursoSelecionado.id)
      .subscribe(

        success => {
          this.onRefresh();
          this.modalService.hide();
        },
        error => {
          this.alertModalService.showAlertDanger('Erro ao remover cursos. Tente novamente mais tarde');
          this.modalService.hide();
        }
      );
  }

  onDeclineDelete() {
    this.modalService.hide();
  }
}
