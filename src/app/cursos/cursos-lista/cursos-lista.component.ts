import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Curso } from 'src/app/interfaces/curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  constructor(private cursoService: CursosService) { }

  ngOnInit() {
    // this.cursoService.lista().subscribe(dados => this.cursos = dados)
    this.onRefresh();

  }

  onRefresh() {
    this.cursos$ = this.cursoService.lista()
      .pipe(
        catchError(error => {
          console.log(error);
          this.error$.next(true);
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



}
