<template>
  <h1>Welcome {{ npub }}</h1>
  <input type="file" accept=".epub" @change="changeFile($event)" />
</template>

<script setup lang="ts">
import TurndownService from "turndown";
import { Epub } from "@gxl/epub-parser/lib/parseEpub";
const npub = useState("npub");

async function changeFile(event: Event) {
  const inputFile = event.target.files[0];
  console.log(inputFile);
  const reader = new FileReader();
  reader.readAsBinaryString(inputFile);
  await new Promise((resolve) => (reader.onload = () => resolve()));
  const binary = reader.result;
  const response: Epub = await $fetch("/api/parse", {
    method: "POST",
    body: JSON.stringify({
      input: binary,
    }),
  });
  console.log(response);
  console.log(response.sections![7].htmlString);
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(response.sections![7].htmlString);
  console.log(markdown);
}
</script>
