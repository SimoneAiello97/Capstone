import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbRatingConfig, NgbSlideEvent, NgbSlideEventSource  } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [NgbRatingConfig]
})
export class AuthComponent  {


    isNavbarTransparent = false;
    images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

    paused = false;
    unpauseOnArrow = false;
    pauseOnIndicator = false;
    pauseOnHover = true;
    pauseOnFocus = true;

    constructor(config: NgbRatingConfig, private el: ElementRef) {
      // customize default values of ratings used by this component tree
      config.max = 5;
      config.readonly = true;
    }
    @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      if (window.scrollY >= 350) {
        this.isNavbarTransparent = true;
      } else {
        this.isNavbarTransparent = false;
      }
    }
    scrollToSection(sectionId: string): void {
      const element = this.el.nativeElement.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
}
