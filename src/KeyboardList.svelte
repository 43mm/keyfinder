<script lang="ts">
  import { Dialog } from "bits-ui";
  import DialogContent from "./DialogContent.svelte";
</script>

<div class="mt-4">
  <Dialog.Root>
    <Dialog.Trigger>keyboard list</Dialog.Trigger>
    <DialogContent>dialog</DialogContent>
  </Dialog.Root>
</div>
