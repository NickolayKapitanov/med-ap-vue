<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Mutation } from 'vuex-class';
import { CartState } from '../store/modules/cart';

@Component
export default class Cart extends Vue {
  @State('Cart')
  cart: CartState;

  @Mutation('Cart/CHEK_AFTER_RELOAD_PAGE')
  CHEK_AFTER_RELOAD_PAGE: () => void;

  @Mutation('Cart/DELETE_PROGRAMM')
  DELETE_PROGRAMM: (id: number) => void;

  @Mutation('Cart/CLEAR_CART')
  CLEAR_CART: () => void;

  created() {
    this.CHEK_AFTER_RELOAD_PAGE();
  }

  get programmsInCart() {
    return this.cart.cart;
  }

  get calculateTotalSum() {
    return this.programmsInCart.reduce((accum, element) => accum + Number(element.price), 0);
  }

  clearCart() {
    this.CLEAR_CART();
  }

  goToMain() {
    this.$router.push({ path: '/' });
  }

  deleteProgramm(id: number) {
    this.DELETE_PROGRAMM(id);
  }
}
</script>

<template>
  <div class='cart_page'>
    <h1>Корзина</h1>

    <a-list item-layout="horizontal" :data-source="programmsInCart">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta>
          <p slot="title">{{ item.title }}</p>
        </a-list-item-meta>

        <div style="marginRight: 15px">Цена {{ item.price }}P</div>
        <a-button type="danger" shape="circle" icon="delete" @click="deleteProgramm(item.id)"/>
      </a-list-item>
    </a-list>

    <p class="bold_text">Итог: {{ calculateTotalSum }}P</p>

    <a-row type="flex" justify="space-between">
      <a-button @click="goToMain">
        Назад в магазин
      </a-button>
      <a-button type="danger" @click="clearCart">
        Очистить корзину
      </a-button>
    </a-row>
  </div>
</template>

<style lang="less" scoped>
  .cart_page {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
</style>