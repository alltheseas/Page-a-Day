<template>
  <h1>Welcome {{ npub }}</h1>
  <h2>Your books</h2>
  <ul v-if="books">
    <li v-for="book in books">{{ book.title }}</li>
  </ul>
  <p v-else>No books added yet</p>
  <NuxtLink to="/books/new">
    <button>Add book</button>
  </NuxtLink>
</template>

<script setup lang="ts">
const npub = useState("npub");
const books = ref();
</script>
