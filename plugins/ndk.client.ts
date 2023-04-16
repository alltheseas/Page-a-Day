import NDK, { NDKNip07Signer } from "@nostr-dev-kit/ndk";

export default defineNuxtPlugin(() => {
  const nip07signer = new NDKNip07Signer();
  const ndk = new NDK({ signer: nip07signer });
  return {
    provide: {
      ndk,
      signer: nip07signer
    }
  }
})