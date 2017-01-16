import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from '../../hero';
import {HeroService} from '../../services/hero.service';

//import '../../public/css/styles.css';
@Component({
    moduleId: __filename,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css'],
    providers: []
})

export class HeroesComponent implements OnInit {

    heroes: Hero[];
    selectedHero: Hero;

    // defines a private heroService property and identifies it as a HeroService injection site
    constructor(private router: Router,
                private heroService: HeroService) {
    }


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

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            });
    }

}