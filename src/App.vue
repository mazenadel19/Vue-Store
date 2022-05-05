<script setup></script>

<template>
  <router-link to="/">Welcome</router-link>|
  <router-link to="/lec1">Lecture 1</router-link>|
  <router-link to="/lec2">Lecture 2</router-link>|
  <router-link to="/lec3">Lecture 3</router-link>|
  <router-link to="/lec4">Lecture 4</router-link>
  <router-view></router-view>
</template>

<style>
@import "@/assets/base.css";
</style>
