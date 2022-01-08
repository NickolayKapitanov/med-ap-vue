<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Mutation } from 'vuex-class';
import { CartState } from '../store/modules/cart';
import { Programm } from '../models/programms.model';

@Component
export default class ProgrammDesc extends Vue {
  @State('Cart')
  cart: CartState;

  @Mutation('Cart/ADD_TO_CART')
  ADD_TO_CART: (programm: Programm) => void;

  programm: Programm = this.$route.query as unknown as Programm;

  get programmsInCart() {
    return this.cart.cart;
  }

  goToMain() {
    this.$router.push({ path: '/' });
  }

  addToCart() {
    const found = this.programmsInCart.some((el) => el.id === this.programm.id);
      if (found) {
        this.$notification.error({
          message: 'Внимание!',
          description: 'Данная программа уже добавлена в корзину',
        });
        return;
      }

    this.$notification.success({
      message: 'Ура!',
      description: 'Программа успешно добавлена в корзину',
    });
    this.ADD_TO_CART(this.programm);
  }
}
</script>

<template>
  <div class='programm_page'>
    <h1>Подробное описание</h1>

    <p class="bold_text">{{ programm.title }}</p>

    <p>{{ programm.fullDescription }}</p>

    <a-row type="flex" justify="space-between">
      <a-button @click="goToMain">
        Назад в магазин
      </a-button>
      <a-button type="primary" @click="addToCart">
        Добавить в корзину
      </a-button>
    </a-row>
  </div>
</template>

<style lang="less" scoped>
  .programm_page {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
</style>