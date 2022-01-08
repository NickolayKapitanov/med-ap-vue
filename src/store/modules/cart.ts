import { Module } from 'vuex';
import { Programm } from '../../models/programms.model';
import BrowserStorage from '../../services/browser-storage.service';

export interface CartState {
  cart: Array<Programm>;
}

const store: Module<CartState, Record<string, unknown>> = {
  namespaced: true,
  state: {
    cart: [],
  },
  getters: {},
  mutations: {
    ADD_TO_CART(state, val) {
      state.cart.push(val);
      BrowserStorage.writeProgramm(state.cart);
    },

    CHEK_AFTER_RELOAD_PAGE(state) {
      state.cart = BrowserStorage.getProgramm();
    },

    CLEAR_CART(state) {
      state.cart = [];
      BrowserStorage.removeProgramm();
    },

    DELETE_PROGRAMM(state, id) {
      state.cart = state.cart.filter((element: Programm) => element.id !== id);
      BrowserStorage.writeProgramm(state.cart);
    },
  },
  actions: {

  },
};

export default store;