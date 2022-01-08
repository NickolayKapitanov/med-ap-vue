<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Mutation, State } from 'vuex-class';
import { Programm } from '../models/programms.model';
import ProgrammsAgent from '../http/agents/programms.agent';
import { CartState } from '../store/modules/cart';

@Component
export default class MainPage extends Vue {
    @State('Cart')
    cart: CartState;

    @Mutation('Cart/ADD_TO_CART')
    ADD_TO_CART: (programm: Programm) => void;

    @Mutation('Cart/CHEK_AFTER_RELOAD_PAGE')
    CHEK_AFTER_RELOAD_PAGE: () => void;

    tags: Array<string> = ['Вирусология', 'Хирургия', 'Исследования', 'Бактериология'];

    selectedTags: Array<string> = [];

    programmList: Array<Programm> = [];

    search = '';

    async fetchProgramms() {
     this.programmList = await ProgrammsAgent.getProgramms();
    }

    get programmsInCart() {
      return this.cart.cart;
    }

    mounted() {
      this.CHEK_AFTER_RELOAD_PAGE();
      this.fetchProgramms();
    }

    handleChange(tag: string, checked: boolean) {
      const { selectedTags } = this;

      const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
      console.log('You are interested in: ', nextSelectedTags);

      this.selectedTags = nextSelectedTags;
    }

    addToCart(programm: Programm) {
      const found = this.programmsInCart.some((el) => el.id === programm.id);
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
      this.ADD_TO_CART(programm);
    }

    correctLabelForBasket() {
      if (this.programmsInCart.length.toString().endsWith('1')) {
        return `${this.programmsInCart.length} программa`;
      }

      if (this.programmsInCart.length.toString().endsWith('2') || this.programmsInCart.length.toString().endsWith('3')
         || this.programmsInCart.length.toString().endsWith('4')) {
           return `${this.programmsInCart.length} программы`;
      }

      return `${this.programmsInCart.length} программ`;
    }

    calculateTotalSum() {
      return this.programmsInCart.reduce((accum, element) => accum + Number(element.price), 0);
    }

    get filteredProgramms() {
      const filtered = this.programmList.filter((elem) => elem.title.toLowerCase().includes(this.search.toLowerCase()) || elem.description.toLowerCase().includes(this.search.toLowerCase()));

      if (this.selectedTags.length === 0) {
        return filtered;
      // eslint-disable-next-line
      } else {
        return filtered.filter((element) => element.category.some((category) => Boolean(this.selectedTags.find((i) => i === category))));
      }
    }

    onSearch(e: Event) {
      const element = e.target as HTMLInputElement;
      this.search = element.value;
    }

    goToCart() {
      this.$router.push({ path: '/cart' });
    }
}
</script>

<template>
  <div>
    <a-affix :offset-top="25">
      <div class="left_sidebar">
        <div class="filter_bar">
          <div
            class="basket"
            @click="goToCart"
          >
            {{ programmsInCart.length === 0 ? 'Корзина' : `${correctLabelForBasket()} - ${calculateTotalSum()}P`}}
          </div>

          <div class="search">
            <p class="bold_text">Программа НМО</p>
            <a-input
              placeholder="input search text"
              @change="onSearch"
            />
          </div>
        </div>

        <div class="category">
          <p class="bold_text">Категории</p>
          <template v-for="tag in tags">
            <a-checkable-tag
              :key="tag"
              :checked="selectedTags.indexOf(tag) > -1"
              @change="checked => handleChange(tag, checked)"
            >
              {{ tag }}
            </a-checkable-tag>
          </template>
        </div>
      </div>
    </a-affix>

    <div class="content_side">
      <a-card
        v-for="programm in filteredProgramms"
        :key="programm.id"
        hoverable
        style="width: 300px"
      >
        <img
          slot="cover"
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />

        <template slot="actions" class="ant-card-actions">
          <div @click="addToCart(programm)">В корзину</div>
          <router-link
            :to="{
              path: `/programm/${programm.id}`,
              query: programm,
              }"
          >
            Подробнее
          </router-link>
        </template>

        <a-card-meta
          :title="programm.title"
          :description="programm.description"
          />

        <div class="bold_text">{{ programm.price + 'P' }}</div>
      </a-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .content_side {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    height: fit-content;
    padding: 25px 0 0 0;
  }

  .left_sidebar {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
  .filter_bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 250px;
    background-color: #e8e8e8;
    margin-bottom: 40px;

    .search {
      padding: 15px;
    }

    .basket {
      align-self: stretch;
      text-align: center;
      background: #91d5ff;
      min-height: 30px;
      line-height: 30px;
      cursor: pointer;
    }
  }

  .category {
    height: auto;
    min-height: 250px;
    padding: 15px;
    background-color: #e8e8e8;
  }
</style>
