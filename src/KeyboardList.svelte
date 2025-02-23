<script lang="ts">
  import { Dialog } from "bits-ui";
  import DialogContent from "./DialogContent.svelte";
  import { keyboards } from "./keyboards.svelte";
</script>

<Dialog.Root>
  <Dialog.Trigger class="cursor-pointer">keyboard list</Dialog.Trigger>
  <DialogContent>
    {#each keyboards as keyboard}
      <button
        class="first:bg-gray-100 hover:bg-gray-200 active:bg-gray-300 p-2 rounded cursor-pointer"
        >{keyboard.name}</button
      >
    {/each}
  </DialogContent>
</Dialog.Root>
