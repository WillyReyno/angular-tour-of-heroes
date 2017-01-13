import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

//import '../../public/css/styles.css';
@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    providers: []
})

export class HeroesComponent implements OnInit {

    heroes: Hero[];
    selectedHero: Hero;

    // defines a private heroService property and identifies it as a HeroService injection site
    constructor(private heroService: HeroService) { }


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

}
