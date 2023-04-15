<template>
  <h1>Login</h1>
  <button @click="loginWithExtension">Log in with nostr extension</button>
</template>

<script setup lang="ts">
import NDK, { NDKNip07Signer } from "@nostr-dev-kit/ndk";

const signer = ref();

onMounted(() => {
  signer.value = new NDKNip07Signer();
  const ndk = new NDK({ signer: signer.value });
});

async function loginWithExtension() {
  const user = await signer.value.user();
  if (!!user.npub) {
    useState("npub", () => user.npub);
    navigateTo("/home");
  }
}
</script>
