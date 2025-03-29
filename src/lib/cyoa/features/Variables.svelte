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
			<Dialog.Title>Variables</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			{#each app.variables as variable, index}
				<div class="flex flex-col gap-y-2">
					<div class="grid grid-cols-2 items-center gap-2">
						<WrappedInput
							label="ID"
							bind:value={variable.id}
						/>
						<WrappedInput
							label="Status"
							bind:value={variable.isTrue}
							disabled={true}
						/>
					</div>
					<Button onclick={() => app.variables.splice(index, 1)}>Delete</Button>
				</div>
			{/each}
		</div>
		<Dialog.Footer>
			<Button
				onclick={() =>
					app.variables.push({
						id: generateID(2),
						isTrue: false
					})}
			>
				Create new Variable
			</Button>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
