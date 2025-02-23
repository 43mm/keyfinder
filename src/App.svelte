<script lang="ts">
  import { setContext } from "svelte";
  import { Tooltip } from "bits-ui";
  import Keyboard from "./Keyboard.svelte";
  import KeyboardList from "./KeyboardList.svelte";
  import { LAYOUT_KEY, STORAGE_KEY } from "./consts";
  import type { KeyboardLayout, NamedKeyboard } from "./types";
  import { getInitialState } from "./utils";
  import "./app.css";

  let { layout } = $state<{ layout: KeyboardLayout }>({ layout: "US English" });
  setContext<KeyboardLayout>(LAYOUT_KEY, layout);

  let keyboards: NamedKeyboard[] = $state(getInitialState(layout));
  $effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(keyboards)));
  setContext<NamedKeyboard[]>(STORAGE_KEY, keyboards);
</script>

<main class="grid place-items-center min-h-screen font-mono">
  <Tooltip.Provider delayDuration={0}>
    <div class="inline-flex flex-col gap-y-1">
      <div class="flex items-end justify-between">
        <h1
          bind:innerHTML={keyboards[0].name}
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
