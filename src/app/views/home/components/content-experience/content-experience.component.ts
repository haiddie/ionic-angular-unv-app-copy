import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { ContentSelectors } from 'src/shared/store/content/content.selectors';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Article } from 'src/shared/store/home/home.models';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

SwiperCore.use([
  Navigation,
  Pagination,
  Autoplay
]);

@Component({
  selector: 'app-content-experience',
  templateUrl: './content-experience.component.html',
  styleUrls: ['./content-experience.component.scss'],
})
export class ContentExperienceComponent implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;

  @Select(ContentSelectors.contents) contents$: Observable<Article[]>;
  @Select(ContentSelectors.contentsLoading) contentsLoading$: Observable<boolean>;

  hoveredOn: number = -1;
  isDesktop:boolean=false;
  constructor(private router:Router,public platform:Platform) {
    if( this.platform.is('desktop')){
      this.isDesktop=true;
      this.startAnimation();
     }
    
   }

  animationInProgress = false;
    config = {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: false,
     
      loop: true,
      autoplay:{
        delay:10000
      },
      speed: 500,
      grabCursor: true,
      breakpoints: {
        280: {
          slidesPerView: 1.2,
          spaceBetween: 10
         },
        320: {
         slidesPerView: 1.4,
         spaceBetween: 10
        },
        350: {
          slidesPerView: 1.5,
          spaceBetween: 10
         },
        370: {
          slidesPerView: 1.6,
          spaceBetween: 10
         },
         390: {
          slidesPerView: 1.7,
          spaceBetween: 10
         },
        480: {
         slidesPerView: 2,
         spaceBetween: 10
        },
        576: {
          slidesPerView: 1.8,
          spaceBetween: 10
         },
         610: {
          slidesPerView: 2.4,
          spaceBetween: 10
         },
         640: {
          slidesPerView: 2.2,
          spaceBetween: 10
         },
        768: {
         slidesPerView: 3,
         spaceBetween: 2
        },
        1024:{
          slidesPerView:2.5,
          spaceBetween:10
        },
        1300:{
          slidesPerView:3,
          spaceBetween:10
        }
       }
    }

  ngOnInit(): void {
   
    this.getDate(new Date('2022-09-07T13:18:58.679Z'))
  }

  ionViewWillEnter(){
    
  }

  getDate(_date) {
    const date = new Date(_date)
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    return monthNames[+((date.getMonth() > 8) ? (date.getMonth()) : (date.getMonth()))] + ' ' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + ' ' + date.getFullYear()
  }

   startAnimation() {
    // if(this.animationInProgress) return;
    // this.animationInProgress = true;
    setTimeout(() => {
      if(this.swiper!== undefined){
        this.swiper.swiperRef.slideNext(1300);
        this.swiper.swiperRef.update()
        this.swiper.swiperRef.updateSlides()
        // this.animationInProgress = false;
       this.startAnimation()
      }
     
    }, 7000);
  }

  slideNext(){
    this.swiper.swiperRef.animating=false;
    this.swiper.swiperRef.slideNext(500);
    this.swiper.swiperRef.update()
    this.swiper.swiperRef.updateSlides()
    
  }
  slidePrev(){
    this.swiper.swiperRef.animating=false;
    this.swiper.swiperRef.slidePrev(500);
    this.swiper.swiperRef.update()
    this.swiper.swiperRef.updateSlides()
  }

  mouseEnterSlide(index) {
    this.hoveredOn = index
  }

  mouseLeaveSlide(index) {
    this.hoveredOn = -1
  }


  goExpArc(){
    this.router.navigate(['/experiences-archive-page'])
  }

}
