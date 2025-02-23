<script lang="ts">
  import { Tooltip } from "bits-ui";
  import Keyboard from "./Keyboard.svelte";
  import KeyboardList from "./KeyboardList.svelte";
  import { keyboards } from "./keyboards.svelte";
  import "./app.css";
</script>

<main class="grid place-items-center min-h-screen font-mono">
  <Tooltip.Provider delayDuration={0}>
    <div class="inline-flex flex-col gap-y-1">
      <div class="flex items-end justify-between">
        <h1
          bind:innerHTML={keyboards[0].name}
          class="text-4xl outline-0"
          on:keydown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget?.blur();
            }
          }}
          contenteditable
        ></h1>
        <KeyboardList />
      </div>
      <Keyboard />
    </div>
  </Tooltip.Provider>
</main>
