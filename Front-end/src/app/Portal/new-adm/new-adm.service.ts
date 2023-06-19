import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresas } from './empresa.interface';
import { TokenService } from 'src/app/authentication/token.service';
import { MarransatoMode } from 'src/app/shared/MaranssatoMode.interface';



const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class NewAdmService {
  
  private readonly API_users = `${API}/user`;
  private readonly API_BuscarEmpresas = `${API}/empresas`;
  private header = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.returnToken()}`);


  constructor(private http: HttpClient, private tokenService : TokenService) { }




  create(usuario: any){
    return this.http.post(this.API_users, usuario).pipe(take(1));
  }


  listarEmpresas(): Observable<any> {  
    return this.http.get(this.API_BuscarEmpresas, { headers: this.header })
  }
}
