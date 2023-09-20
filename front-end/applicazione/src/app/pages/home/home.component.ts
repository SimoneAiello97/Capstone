import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { IProduct } from 'src/app/interfaces/IProduct';
import { IPage } from 'src/app/interfaces/IPage';
import { HomeService } from './home.service';
import { ICategory } from 'src/app/interfaces/ICategory';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  prodotti!:IProduct[]
  categorie!:any[]
  nomeUtente!:string
  protected page: IPage = {
    content: [],
    empty: false,
    first: false,
    last: false,
    number: 0,
    numberOfElements: 0,
    pageable: [],
    size: 0,
    sort: [],
    totalElements: 0,
    totalPages: 0
  };

  numberCategory:number|undefined

  keyword!:string;
  constructor(private authSvc:AuthService, private adminSvc:AdminService,private homeSvc:HomeService, private router: Router){}
  ngOnInit(){
    this.allCategories()
    this.adminSvc.getAllProducts(0,4).subscribe(res=>{
      this.prodotti=res.content
    })
    this.initAnimation();
    const utente:any = localStorage.getItem('user')
    const utenteparsato = JSON.parse(utente)
    console.log(utenteparsato);

    this.nomeUtente = utenteparsato.username
  }
  logout(){
    this.authSvc.logout()
    this.router.navigate(['/auth'])
  }


  initAnimation() {
    const h1 = document.querySelector('h1')  as HTMLElement;
    const boxes = document.querySelectorAll('.boxes__box') as NodeListOf<HTMLElement>;
    const img = document.querySelector('.boxes img')  as HTMLElement;
    const listItems = document.querySelectorAll('li');
    const duration = 0.9;


    if (h1 && img) {
      h1.style.opacity = '0';
      img.style.opacity = '0';
      img.style.right = '-100px';

      setTimeout(() => {
        h1.style.transition = `opacity ${duration}s ease-in`;
        h1.style.opacity = '1';
      }, 800);

      boxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'scale(0)';
        setTimeout(() => {
          box.style.transition = `opacity ${duration}s ease-in, transform ${duration}s ease-in`;
          box.style.transitionDelay = `${index * 0.1 + 0.2}s`;
          box.style.opacity = '1';
          box.style.transform = 'scale(1)';
        }, 0);
      });

      setTimeout(() => {
        img.style.transition = `opacity ${duration}s ease-out, right ${duration}s ease-out`;
        img.style.opacity = '1';
        img.style.right = '0';
      }, 400);

      listItems.forEach((item, index) => {
        item.style.top = '-20px';
        setTimeout(() => {
          item.style.transition = `top ${duration}s ease-out`;
          item.style.transitionDelay = `${index * 0.1 + 0.9}s`;
          item.style.top = '0';
        }, 0);
      });
    }
  }


  onPageChange(e: any) {
    console.log(e);
    this.adminSvc.getAllProducts(e.page, e.rows).subscribe(c => {
      this.prodotti = c.content;
    });
  }

  loadProducts() {
    this.adminSvc
      .searchProducts(0, this.keyword)
      .subscribe((data) => {
        console.log(data, "ricerca");

        this.prodotti = data.content;
      });
  }

  filterHighPrice(){
    this.homeSvc.filterHighPrice().subscribe(
      (res: IProduct[]) => {
        this.prodotti = res;
      }
    );
  }

  filterLowPrice(){
    this.homeSvc.filterLowPrice().subscribe(
      res => {
        this.prodotti = res
      })
  }

  allCategories(){
    this.adminSvc.getCategories().subscribe(res =>{

      this.categorie = res
      console.log(this.categorie);
    })
  }

  onSelectChange(id:number){
    this.filterCategory(id)
  }

  filterCategory(id:number){
    this.homeSvc.filterCategory(id).subscribe(res=>{
      this.prodotti = res
    })
  }

  reset(){
    this.adminSvc.getAllProducts(0,4).subscribe(res=>{
      this.prodotti=res.content
      this.keyword = ''
      this.numberCategory =undefined;
    })
  }
}
