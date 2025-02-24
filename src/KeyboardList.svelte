<script lang="ts">
  import { getContext } from "svelte";
  import { Dialog } from "bits-ui";
  import DialogContent from "./DialogContent.svelte";
  import { LAYOUT_KEY, STORAGE_KEY } from "./consts";
  import type { KeyboardState, LayoutState } from "./types";
  import { getBlankKeyboard } from "./utils";

  let keyboards = getContext<KeyboardState>(STORAGE_KEY);
  const currentLayout = getContext<LayoutState>(LAYOUT_KEY).current;

  function addKeyboard() {
    keyboards.data.unshift(getBlankKeyboard(currentLayout));
  }

  function loadKeyboard(index: number) {
    const [selected] = keyboards.data.splice(index, 1);
    keyboards.data = [selected, ...keyboards.data];
  }

  function deleteKeyboard(index: number) {
    if (keyboards.data.length <= 1)
      keyboards.data.push(getBlankKeyboard(currentLayout));
    keyboards.data.splice(index, 1);
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class="cursor-pointer">keyboard list</Dialog.Trigger>
  <DialogContent>
    <Dialog.Close
      class="px-2 pb-2 text-left cursor-pointer"
      onclick={() => addKeyboard()}>add new keyboard</Dialog.Close
    >
    <div class="relative flex flex-col">
      {#each keyboards.data as keyboard, index}
        <div class="flex first:bg-gray-100 hover:outline-2 rounded">
          <Dialog.Close
            class="flex-grow p-2 text-left cursor-pointer"
            onclick={() => loadKeyboard(index)}>{keyboard.name}</Dialog.Close
          >
          <button
            class="absolute px-4 py-2 right-0 hover:bg-black hover:text-white cursor-pointer"
            onclick={() => deleteKeyboard(index)}>×</button
          >
        </div>
      {/each}
    </div>
  </DialogContent>
</Dialog.Root>
