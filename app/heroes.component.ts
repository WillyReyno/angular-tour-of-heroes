import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from './hero';
import {HeroService} from './hero.service';

//import '../../public/css/styles.css';
@Component({
  moduleId: __filename,
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: []
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  // defines a private heroService property and identifies it as a HeroService injection site
  constructor(
    private router: Router,
    private heroService: HeroService) { }


  getHeroes(): void {
    // équivaut à faire : ...then(function(heroes) { return this.heroes = heroes }
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  // Récupère la liste des héros à l'initialisation
  ngOnInit(): void {
    this.getHeroes();
  }

  // Définie le héros actuellement sélectionné
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
