<template>
  <h1>Login</h1>
  <button @click="loginWithExtension">Log in with nostr extension</button>
</template>

<script setup lang="ts">
async function loginWithExtension() {
  const { $signer } = useNuxtApp();
  const user = await $signer.user();
  if (!!user.npub) {
    localStorage.setItem("npub", user.npub);
    navigateTo("/home");
  }
}
</script>
