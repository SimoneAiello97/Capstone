import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users:any;

  constructor (private adminSvc:AdminService){}

  ngOnInit(){
    this.getUsers();
  }

  getUsers() {
    this.adminSvc.getUsers().subscribe((res: any) => {
      console.log(res);
      this.users = res // Inizializza this.users con l'array dalla risposta API
    });
  }

}
