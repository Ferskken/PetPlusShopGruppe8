import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us-shared',
  templateUrl: './about-us-shared.component.html',
  styleUrls: ['./about-us-shared.component.scss']
})
export class AboutUsSharedComponent {
  showMore: boolean = false;

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

}
