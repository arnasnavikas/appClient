import {trigger, Output,
    state, style, transition, animate, EventEmitter,ViewEncapsulation} from '@angular/core';
  

export const SliderAnimation = [
    trigger('flyRight', [
      state('ready', style({opacity: 0,transform: 'translateX(-100%)' })),
      state('fly-in', style({opacity: 1,transform: 'translateX(0)' })),
      state('fly-out', style({opacity: 0,transform: 'translateX(50%)' })),
      transition('ready => fly-in', [animate('.2s ease-in')]),
      transition('* => fly-out', [animate('.2s ease-in')]),
      transition('fly-out => ready',[])
    ]),
    trigger('flyLeft', [
      state('ready', style({opacity: 0,transform: 'translateX(100%)' })),
      state('fly-in', style({opacity: 1,transform: 'translateX(0)' })),
      state('fly-out', style({opacity: 0,transform: 'translateX(-50%)' })),
      transition('ready => fly-in', [animate('.2s ease-in')]),
      transition('* => fly-out', [animate('.2s ease-in')]),
      transition('fly-out => ready',[])
    ])
  ]