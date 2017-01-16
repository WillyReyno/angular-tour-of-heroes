import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {HeroSearchService} from '../../services/hero-search.service';
import {Hero} from '../../hero';

@Component({
    moduleId: __filename,
    selector: 'hero-search',
    templateUrl: 'hero-search.component.html',
    styleUrls: ['hero-search.component.css'],
    providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {
    heroes: Observable<Hero[]>;

    // A Subject is a producer of an observable event stream;
    // searchTerms produces an Observable of strings, the filter criteria for the name search.
    private searchTerms = new Subject<string>();

    constructor(private heroSearchService: HeroSearchService,
                private router: Router) {
    }


    // Push a search term into the observable stream
    // Each call to search puts a new string into this subject's observable stream by calling next.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300) // wait for 300s
            .distinctUntilChanged() // ignore if search si same as before
            .switchMap(term => term // switch to new observable each time
                // return the http search observable
                ? this.heroSearchService.search(term)
                // or the observable of empty heroes if no search term
                : Observable.of<Hero[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }

}