<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Layout extends Vue {}
</script>

<template>
  <a-layout>
    <a-layout-content>
      <slot />
    </a-layout-content>
  </a-layout>
</template>