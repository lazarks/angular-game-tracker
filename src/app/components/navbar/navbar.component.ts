import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() transparent: boolean = false;
  showLinks: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.showLinks = !this.showLinks;
    console.log('works');
  }
}
