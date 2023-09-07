import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
/*window.addEventListener("scroll", (e) => {
        const topbar = document.querySelector(".top-bar");
        const button = document.querySelector(".button-nav");
        e.preventDefault();
        if (window.scrollY >= 350) {
        topbar.classList.add("bg-white");
        button.classList.add("bg-green");

        } else {
        topbar.classList.remove("bg-white");
        button.classList.remove("bg-green");
        button.classList.add("bg-black")
        }
    }); */
    isNavbarTransparent = false;

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      if (window.scrollY >= 350) {
        this.isNavbarTransparent = true;
      } else {
        this.isNavbarTransparent = false;
      }
    }
}
