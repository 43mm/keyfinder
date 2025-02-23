<script lang="ts">
  import { Dialog } from "bits-ui";
</script>

<div class="mt-4">
  <Dialog.Root>
    <Dialog.Trigger>keyboard list</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
      <Dialog.Content
        class="fixed left-[50%] top-[50%] z-50 grid w-md max-w-lg max-h-2/3 overflow-auto translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded shadow font-mono"
      >
        dialog
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
</div>
