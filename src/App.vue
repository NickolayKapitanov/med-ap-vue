<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import ruRu from 'ant-design-vue/lib/locale-provider/ru_RU';
import Layout from 'src/components/layout/Layout.vue';

  @Component({
    name: 'app',
    components: {
      Layout,
    },
  })
  export default class App extends Vue {
    locale = ruRu;
  }
</script>

<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <Layout>
        <router-view/>
      </Layout>
    </a-config-provider>
  </div>
</template>