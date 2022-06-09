import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AppConfigActions } from 'src/app/store/actions/app-config.actions';
import { AppConfigSelectors } from 'src/app/store/selectors/app-config.selectors';

@Component({
  selector: 'app-main-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Select(AppConfigSelectors.appTheme) appTheme$!: Observable<string>;

  subs: Subscription[] = [];
  appTheme: string = 'default';

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this.subs.push(
      this.appTheme$.subscribe((theme) => {
        this.appTheme = theme;
      })
    );
  }

  toggleAppTheme() {
    const theme = this.appTheme === 'dark' ? 'default' : 'dark';
    this._store.dispatch(new AppConfigActions.ToggleTheme(theme));
  }

  ngOnDestroy() {
    this.subs.forEach((subs) => subs.unsubscribe());
  }
}
