<script lang="ts">
  import { getContext } from "svelte";
  import { Dialog } from "bits-ui";
  import DialogContent from "./DialogContent.svelte";
  import { STORAGE_KEY } from "./consts";
  import type { NamedKeyboard } from "./types";

  const keyboards = getContext<NamedKeyboard[]>(STORAGE_KEY);
</script>

<Dialog.Root>
  <Dialog.Trigger class="cursor-pointer">keyboard list</Dialog.Trigger>
  <DialogContent>
    <Dialog.Close class="pb-2 cursor-pointer">add new keyboard</Dialog.Close>
    {#each keyboards as keyboard}
      <Dialog.Close
        class="nth-2:bg-gray-100 hover:outline-2 p-2 rounded cursor-pointer"
        >{keyboard.name}</Dialog.Close
      >
    {/each}
  </DialogContent>
</Dialog.Root>
