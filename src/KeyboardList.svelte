<script lang="ts">
  import { Dialog } from "bits-ui";
  import DialogContent from "./DialogContent.svelte";
  const keyboardList = [
    { id: 1, name: "Keyboard 1" },
    { id: 2, name: "Keyboard 2" },
    { id: 3, name: "Keyboard 3" },
  ];
</script>

<Dialog.Root open={true}>
  <Dialog.Trigger class="cursor-pointer">keyboard list</Dialog.Trigger>
  <DialogContent>
    {#each keyboardList as keyboard}
      <button
        class="first:bg-gray-100 hover:bg-gray-200 active:bg-gray-300 p-2 rounded cursor-pointer"
        >{keyboard.name}</button
      >
    {/each}
  </DialogContent>
</Dialog.Root>
