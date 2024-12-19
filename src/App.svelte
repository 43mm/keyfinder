<script lang="ts">
  import USEnglish from "./layouts/us.json";
  import "./app.css";

  const keyboardRows = USEnglish;
</script>

<main>
  <h1 class="text-4xl text-center">keyfinder</h1>
  <div id="keyboard" class="flex flex-col items-center space-y-2">
    {#each keyboardRows as row}
      <div class="flex space-x-2">
        {#each row as key}
          <div
            class="py-2 bg-gray-100 rounded text-center cursor-pointer"
            style="width: {key.length * 50}px;"
            id={key.id}
          >
            {key.name}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</main>
