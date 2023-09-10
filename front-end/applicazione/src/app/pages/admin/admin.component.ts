import { Component} from '@angular/core';
import { AdminService } from './admin.service';
import { IUser } from 'src/app/interfaces/IUser';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  users:any;

  constructor (private adminSvc:AdminService){}

  ngOnInit(){
    this.getUsers();
  }

  getUsers() {
    this.adminSvc.getUsers().subscribe((res: any) => {
      console.log(res);
      this.users = res.content; // Inizializza this.users con l'array dalla risposta API
    });
  }

  deleteUser(id:number){
    this.adminSvc.deleteUser(id).subscribe();
  }
}
