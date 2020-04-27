import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.sass']
})
export class ForbiddenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var loginformcenter =
    ($(window).height() - $('.login100-form').height()) / 2 - 34;
  $('.login100-form').css('margin-top', loginformcenter);
  }

}
