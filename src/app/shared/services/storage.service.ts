import { Inject, Injectable, PLATFORM_ID } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage = localStorage;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
  ) { }

  setItem(key: string, value: any, encrypt?: boolean) {
    this.removeItem(key);
    value = typeof value === 'string' ? value : JSON.stringify(value);
    if (encrypt) {
      value = btoa(unescape(encodeURIComponent(value)));
    }
    this.storage.setItem(key, value);
  }

  getItem(key: string, decrypt?: boolean) {
    let value = this.storage.getItem(key);

    if (!value) return null;

    if (decrypt) {
      try {
        value = decodeURIComponent(escape(atob(value)));
      } catch (error) {
        this.removeItem(key);
      }
    }

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  getFromItem(key: string, identifier: string, value: any) {
    const array = this.getItem(key);
    return array.find((a: any) => { return a[identifier] === value })
  }

  addtoItem(key: string, value: any, unshift: boolean = false) {
    let array = this.getItem(key);
    if (unshift) {
      array.unshift(value);
    } else {
      array.push(value);
    }
    this.setItem(key, array);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  public static STORAGE_KEYS = {
    appConfig: 'hala-ac',
    currentUser: 'hala-ru',
    quotationConfigs: 'hala-qc',
    selectedPremium: 'hala-sp',
  }

}