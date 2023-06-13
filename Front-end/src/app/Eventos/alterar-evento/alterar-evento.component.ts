
import { Router } from '@angular/router';
import { CadEventosService } from './cad-eventos.service';
import { CadEventos } from './cad-eventos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEvento } from './tipo';
import { Lugares } from './lugar';
import { Instituicoes } from './instituicao';

@Component({
  selector: 'app-cad-eventos',
  templateUrl: './alterar-evento.component.html',
  styleUrls: ['./alterar-evento.component.scss', '../styles.scss']
})
export class AlterarEventoComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  espacos: CadEventos[] = [];
  tipos: TipoEvento[] = [];
  lugares: Lugares[] = [];
  instituicoes: Instituicoes[] = [];

  constructor(private fb: FormBuilder,
    private service: CadEventosService,
    private router: Router) {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      data_inicio: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      data_termino: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      hora_inicio: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      hora_termino: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      id_usuario: 5,
      id_lugar: 1,
      id_tipo: [],
      id_instituicao: [],
    });
    // this.form = this.fb.group({
    //   nome: 'teste',
    //   descricao: 'teste',
    //   data_inicio: '20/02/2023',
    //   data_termino: '20/02/2023',
    //   hora_inicio: '12:12:12',
    //   hora_termino: '12:12:12',
    //   id_usuario: 5,
    //   id_lugar: 1,
    //   id_tipo: 1,
    //   id_instituicao: 1
    // });
  }

  ngOnInit() {
    this.service.listarLugares().subscribe(({results}) => {
      this.lugares = results
      
      console.log(results)
      console.log(this.lugares)
    });
    this.service.listarInstituicoes().subscribe(({results}) => {
      this.instituicoes = results
      console.log(this.instituicoes)
    });
    this.service.listarTipos().subscribe(({results}) => {
      this.tipos = results
      console.log(this.tipos)
    });
    this.service.listarTipos().subscribe(({results}) => {
      this.tipos = results
      console.log(this.tipos)
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');
      this.service.create(this.form.value).subscribe(
        sucess => console.log('Sucesso'),
        error => console.log('Error'),
        () => console.log('Rquest Completo')
        );
        this.router.navigate(['/eventos']);
    }

  }
  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['/eventos']);
  }
}