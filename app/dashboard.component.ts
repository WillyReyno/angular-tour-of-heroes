import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: __filename, // should be module.id but throw some errors because webpack returns an integer while angular is waiting for a string...
  selector: 'my-dashboard',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  // Define a heroes array property
  heroes: Hero[] = [];

  // Inject the HeroService in the constructor and hold it in a private heroService field
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    // Calls the heroService to get heroes
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1,5));
  }


}

