import { Selector } from '@ngxs/store';
import { AppConfigState, AppConfigStateModel } from '../states/app-config.state';

export class AppConfigSelectors {
  @Selector([AppConfigState])
  static appTheme(state: AppConfigStateModel) {
    return state.app_theme;
  }
}
