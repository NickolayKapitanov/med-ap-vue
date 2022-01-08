import { Programm } from '../models/programms.model';

export default class BrowserStorage {
  /** Запись в localStorage */
  static writeProgramm(programms: Programm[]) {
    localStorage.setItem('cart', JSON.stringify(programms));
  }

   /** Извлечение из localStorage */
  static getProgramm() {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart') as string);
    }

    return [];
  }

  /** Удаление записи */
  static removeProgramm() {
    localStorage.removeItem('cart');
  }
}