import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {
  // rating: number = 4;
  cropWidth: number = 75;
  @Input() rating: number = 0;
  // output is an emit to send to parent
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
  ngOnChanges(): void {
    this.cropWidth = this.rating * 75 / 5
  }
  onClick(): void {
    // uses event emitter to send to parent component listening for it
    this.ratingClicked.emit(`This rating is ${this.rating}.`)
  }
}