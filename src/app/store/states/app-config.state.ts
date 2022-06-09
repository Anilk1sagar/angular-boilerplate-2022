import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AppConfigActions } from '../actions/app-config.actions';

export interface AppConfigStateModel {
  app_theme: string;
}

@State<AppConfigStateModel>({
  name: 'appConfig',
  defaults: {
    app_theme: 'default',
  },
})
@Injectable()
export class AppConfigState {
  @Action(AppConfigActions.ToggleTheme)
  toggleAppTheme(
    ctx: StateContext<AppConfigStateModel>,
    { payload }: AppConfigActions.ToggleTheme
  ) {
    const state = ctx.getState();
    ctx.patchState({ ...state, app_theme: payload });
  }
}
