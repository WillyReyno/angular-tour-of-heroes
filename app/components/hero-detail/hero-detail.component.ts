import {Component, Input, OnInit} from  '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import { Hero } from '../../hero';
import {HeroService} from '../../services/hero.service';

import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: __filename, // should be module.id but throw some errors because webpack returns an integer while angular is waiting for a string...
    selector: 'my-hero-detail',
    templateUrl: 'hero-detail.component.html',
    styleUrls: ['hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
    // Injecting services in private fields
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit():void {
        // using the params "observable" to extract the id parameter value from the ActivatedRoute service
        // and use the HeroService to fetch the hero with that id
        this.route.params
            // the switchMap operator maps the id in the observable route parameters to a new Observable, the result of the HeroService.getHero method.
            .switchMap((params: Params) => this.heroService.getHero(+params['id'])) // + parameter convert string to id (because routes are always strings)
            .subscribe(hero => this.hero = hero);
    }

    // Go back to the previous pages
    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }

    @Input() hero: Hero;
}
