<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import { app } from '$lib/store/store.svelte';
	import { generateID } from '$lib/store/utils';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="max-h-screen overflow-y-auto sm:max-w-[800px]">
		<Dialog.Header>
			<Dialog.Title>Words</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<p>
				At creation and deletion on older project, the list might not update. Exit dialog and return
				to force it, is fixed the next time the project is saved and loaded.
			</p>
			{#each app.words as word, index}
				<div class="flex flex-col gap-y-2">
					<div class="grid grid-cols-2 items-center gap-2">
						<WrappedInput label="ID" bind:value={word.id} />
						<WrappedInput
							label="Text to replace id with"
							bind:value={word.replaceText}
						/>
					</div>
					<Button onclick={() => app.words.splice(index, 1)}>Delete</Button>
				</div>
			{/each}
		</div>
		<Dialog.Footer>
			<Button
				onclick={() =>
					app.words.push({
						id: `#${generateID(2)}`,
						replaceText: ''
					})}
			>
				Create new Word
			</Button>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
