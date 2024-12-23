<script lang="ts">
  import USEnglish from "./layouts/us.json";
  import "./app.css";

  const keyboardRows = USEnglish;
</script>

<main class="grid place-items-center min-h-screen font-mono">
  <div class="inline-flex flex-col gap-y-1">
    <h1 class="text-4xl">keyfinder</h1>
    {#each keyboardRows as row}
      <div class="flex justify-between gap-x-1">
        {#each row as key}
          <div
            class="p-4 bg-gray-100 rounded text-center first:text-left last:text-right text-s cursor-pointer hover:outline"
            style="width: {key.length * 70}px;"
            id={key.id}
          >
            {key.name}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</main>
