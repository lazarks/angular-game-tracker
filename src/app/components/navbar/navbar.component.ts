import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() transparent: boolean = false;
  showLinks: boolean = false;

  toggle(): void {
    this.showLinks = !this.showLinks;
  }

  constructor() {}

  ngOnInit(): void {}
}
