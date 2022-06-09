import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AppConfigSelectors } from './store/selectors/app-config.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(AppConfigSelectors.appTheme) appTheme$!: Observable<string>;

  subs: Subscription[] = [];

  constructor() {}

  ngOnInit() {
    this.subs.push(
      this.appTheme$.subscribe((theme) => {
        console.log('app theme: ', theme);
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach((subs) => subs.unsubscribe());
  }
}
