<template>
  <input type="file" accept=".epub" @change="changeFile($event)" />
  <h1>{{ book?.title }}</h1>
  <ul>
    <li v-for="chapter in book.content">
      <details>
        <summary>{{ chapter.title }}<button @click="signNote">Sign</button></summary>
        <p style="white-space: pre-wrap">{{ turndownService.turndown(chapter.text) }}</p>
      </details>
      <ul></ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import NDK, { NDKNip07Signer, NDKEvent } from "@nostr-dev-kit/ndk";
import TurndownService from "turndown";
import { Epub } from "@gxl/epub-parser/lib/parseEpub";

interface Book {
  title: string;
  content: Array<{
    title: string;
    text: string;
  }>;
}

const book: Ref<Book> = ref({ title: "", content: [] });
const sections = ref();
const turndownService = ref();
const ndk = ref();

onMounted(() => {
  turndownService.value = new TurndownService();
  const nip07signer = new NDKNip07Signer();
  ndk.value = new NDK({ signer: nip07signer });
});

async function changeFile(event: Event) {
  const inputFile = event.target.files[0];
  console.log(inputFile);
  const reader = new FileReader();
  reader.readAsBinaryString(inputFile);
  await new Promise<void>((resolve) => (reader.onload = () => resolve()));
  const binary = reader.result;
  const response = await $fetch("/api/parse", {
    method: "POST",
    body: JSON.stringify({
      input: binary,
    }),
  });
  console.log(response);
  book.value.title = response.info!.title;
  book.value.content = [];
  sections.value = response.sections;
  JSON.parse(JSON.stringify(response.structure)).map((chapter) =>
    matchChapterAndText(chapter)
  );
}

function matchChapterAndText(chapter) {
  const title = chapter.name;
  const text =
    sections.value.find((section) => chapter.path.includes(section.id))?.htmlString || "";
  book.value!.content.push({ title, text });
}

async function signNote() {
  const ndkEvent = new NDKEvent(ndk.value);
  ndkEvent.kind = 1;
  ndkEvent.content = "Hello, world!";
  console.log(ndkEvent);
  await ndkEvent.sign();
  console.log(ndkEvent);
}
</script>
