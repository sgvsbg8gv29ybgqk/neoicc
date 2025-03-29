<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import { app } from '$lib/store/store.svelte';
	import { generateID } from '$lib/store/utils';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="sm:max-w-[800px]">
		<Dialog.Header>
			<Dialog.Title>Groups</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-8 py-4">
			{#each app.groups as group, index}
				<div class="flex flex-col gap-y-2">
					<div class="grid grid-cols-2 gap-2">
						<WrappedInput label="ID" bind:value={group.id} />
						<WrappedInput label="Name" bind:value={group.name} />
					</div>
					{#each group.elements as element, index}
						<div class="grid grid-cols-2 gap-2">
							<WrappedInput
								label="ID"
								bind:value={element.id}
							/>
							<div class="flex flex-col justify-end">
								<Button onclick={() => group.elements.splice(index, 1)}>Delete</Button>
							</div>
						</div>
					{/each}
					<div class="grid grid-cols-2 gap-2">
						<Button onclick={() => group.elements.push({ id: generateID() })}>Add New row/choice</Button>
						<Button onclick={() => app.groups.splice(index, 1)}>Delete</Button>
					</div>
				</div>
			{/each}
		</div>
		<Dialog.Footer>
			<Button
				onclick={() =>
					app.groups.push({
						id: generateID(2),
						name: 'Group ' + (app.groups.length + 1),
						elements: []
					})}
			>
				Create New Group
			</Button>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
