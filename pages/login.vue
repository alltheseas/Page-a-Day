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
})

function loginWithExtension() {
  signer.value.user().then(async (user) => {
    if (!!user.npub) {
        useState('npub', () => user.npub)
        navigateTo('/home');
    }
});
}
</script>
