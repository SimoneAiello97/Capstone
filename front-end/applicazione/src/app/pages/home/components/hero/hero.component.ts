import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  constructor(){}
  ngOnInit(){
    this.initAnimation()
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
}
