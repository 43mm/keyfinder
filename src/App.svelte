<script lang="ts">
  import { setContext } from "svelte";
  import { Tooltip } from "bits-ui";
  import Keyboard from "./Keyboard.svelte";
  import KeyboardList from "./KeyboardList.svelte";
  import { LAYOUT_KEY, STORAGE_KEY } from "./consts";
  import type { KeyboardState, LayoutState } from "./types";
  import { getInitialState } from "./utils";
  import "./app.css";

  let layout = $state<LayoutState>({ current: "US English" });
  setContext<LayoutState>(LAYOUT_KEY, layout);

  let keyboards = $state<KeyboardState>(getInitialState(layout.current));
  $effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(keyboards)));
  setContext<KeyboardState>(STORAGE_KEY, keyboards);

  $inspect(keyboards.data);
</script>

<main class="grid place-items-center min-h-screen font-mono">
  <Tooltip.Provider delayDuration={0}>
    <div class="inline-flex flex-col gap-y-1">
      <div class="flex items-end justify-between">
        <h1
          bind:innerHTML={keyboards.data[0].name}
          class="text-4xl outline-0"
          onkeydown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
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
