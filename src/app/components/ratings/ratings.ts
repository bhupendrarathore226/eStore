import { Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {IconDefinition,faStar,faStarHalfStroke} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-ratings',
  imports: [FontAwesomeModule],
  templateUrl: './ratings.html',
  styleUrl: './ratings.css',
})
export class Ratings {
score=input<number>(0); 
faStar:IconDefinition=faStar;
faStarHalfStroke:IconDefinition=faStarHalfStroke;
faStarEmpty:IconDefinition=faStarEmpty;   

stars=computed(()=>{
  const fullStars=Math.floor(this.score());
  const halfStar=(this.score()-fullStars)>=0.5?1:0;
  const emptyStars=5-fullStars-halfStar;
  const icons:IconDefinition[]=[];

  for(let i=0;i<fullStars;i++){
    icons.push(this.faStar);
  }
  if(halfStar){
    icons.push(this.faStarHalfStroke);
  }
  for(let i=0;i<emptyStars;i++){
    icons.push(this.faStarEmpty);
  }
  if(halfStar){ 
    icons.push(this.faStarHalfStroke);
  }
  while(icons.length<5){
    icons.push(this.faStarEmpty);
  }
  return [...icons];
});
}