<template>
  <input type="file" accept=".epub" @change="changeFile($event)" />
  <h1>{{ book?.title }}</h1>
  <ul>
    <li v-for="chapter in book.content">
      <details>
        <summary>{{ chapter.title }}<button @click="signNote">Sign</button></summary>
        <p style="white-space: pre-wrap">{{ chapter.text }}</p>
      </details>
      <ul></ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { NDKEvent } from "@nostr-dev-kit/ndk";
import TurndownService from "turndown";
import { Epub } from "@gxl/epub-parser/lib/parseEpub";
import { Section } from "@gxl/epub-parser/lib/parseSection";
const { $ndk } = useNuxtApp();

interface Book {
  title: string;
  content: Array<{
    title: string;
    text: HTMLBodyElement | null;
  }>;
}

interface Chapter extends ChapterStructure {
  children: Array<ChapterStructure>;
}

interface ChapterStructure {
  name: string;
  nodeId: string;
  path: string;
  playOrder: string;
}

const book: Ref<Book> = ref({ title: "", content: [] });
const bookStructure = ref({
  sections: [] as Section[] | undefined,
  manifest: [] as Array<{ href: string; id: string; "media-type": string }>,
});
const turndownService = ref();

onMounted(() => {
  turndownService.value = new TurndownService();
});

async function changeFile(event: Event) {
  const inputFile = event.target.files[0];
  console.log(inputFile);
  const reader = new FileReader();
  reader.readAsBinaryString(inputFile);
  await new Promise<void>((resolve) => (reader.onload = () => resolve()));
  const binary = reader.result;
  const response: Epub = await $fetch("/api/parse", {
    method: "POST",
    body: JSON.stringify({
      input: binary,
    }),
  });
  console.log("RESPONSE", response);
  book.value.title = response.info!.title;
  book.value.content = [];
  bookStructure.value.sections = response.sections;
  bookStructure.value.manifest = response._manifest;
  response.structure?.map((chapter: Chapter) => matchChapterAndText(chapter));
}

function matchChapterAndText(chapter: Chapter) {
  const title = chapter.name;
  const id = bookStructure.value.manifest.find((entry) =>
    chapter.path.includes(entry.href)
  )?.id;
  const xmlText =
    bookStructure.value.sections?.find((section) => section.id === id)?.htmlString || "";
  // const node = document.createRange().createContextualFragment(xmlText);
  const node = new DOMParser().parseFromString(xmlText, "application/xhtml+xml");
  const body = node.querySelector("body");
  turndownService.value.addRule("enters", {
    filter: ["div"],
    replacement: function (content: string) {
      return content + "\n\n";
    },
  });
  const text = turndownService.value.turndown(body);
  book.value!.content.push({ title, text });
}

async function signNote() {
  const ndkEvent = new NDKEvent($ndk);
  console.log($ndk);
  ndkEvent.kind = 1;
  ndkEvent.content = "Hello, world!";
  console.log(ndkEvent);
  await ndkEvent.sign();
  console.log(ndkEvent);
}
</script>
