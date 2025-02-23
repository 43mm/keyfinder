<script lang="ts">
  import { Tooltip } from "bits-ui";
  import Keyboard from "./Keyboard.svelte";
  import KeyboardList from "./KeyboardList.svelte";
  import "./app.css";
</script>

<main class="grid place-items-center min-h-screen font-mono">
  <Tooltip.Provider delayDuration={0}>
    <div class="inline-flex flex-col gap-y-1">
      <h1 class="text-4xl">keyfinder</h1>
      <Keyboard />
      <KeyboardList />
    </div>
  </Tooltip.Provider>
</main>
