export namespace AppConfigActions {
  export class ToggleTheme {
    static readonly type = '[AppConfig] Toggle Theme';
    constructor(public payload: string) {}
  }
}
