<script lang="ts">
	import type { Requireds } from '$lib/store/types';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { app } from '$lib/store/store.svelte';
	import { generateID, pi } from '$lib/store/utils';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';

	const {
		open,
		onclose,
		obj
	}: { open: boolean; onclose: () => void; obj: { requireds: Requireds[] } } = $props();

	let numberOfOrRequireds = $state(4);

	function addNewRequired(type: string, required: boolean, operator: string) {
		const orRequired = [];
		for (let o = 0; o < pi(numberOfOrRequireds); o++) orRequired.push({ req: '' });

		obj.requireds.push({
			required: required,
			requireds: [],
			orRequired: orRequired,
			id: generateID(),
			type: type,
			reqId: '',
			reqId1: '',
			reqId2: '',
			reqId3: '',
			reqPoints: 0,
			showRequired: false,
			operator: operator,
			afterText: app.defaultAfterReq,
			beforeText: app.defaultBeforeReq,
			orNum: 1
		});
	}
</script>

<Dialog.Root {open} onOpenChange={(a) => !a && onclose()}>
	<Dialog.Content class="sm:max-w-[1000px]">
		<Dialog.Header>
			<Dialog.Title>Create Requirement</Dialog.Title>
			<Dialog.Description>
				Requirements are conditions that will decide if the player can select the choice or not,
				these use the ID of choices and variables, and the design of the filter placed on
				non-selectable choices can be changed in filter design.
			</Dialog.Description>
		</Dialog.Header>
		<div class="flex flex-col gap-y-1">
			<Label for="choice-requirement-button">Choice Requirements</Label>
			<div class="flex flex-row gap-x-2">
				<Button id="choice-requirement-button" onclick={() => addNewRequired('id', true, '')}>
					Add Selected Choice Requirement
				</Button>
				<Button onclick={() => addNewRequired('id', false, '')}>
					Add Non-Selected Choice Requirement
				</Button>
			</div>
		</div>
		<div class="flex flex-col gap-y-1">
			<Label for="point-requirement-button">Point Requirements</Label>
			<div class="flex flex-row gap-x-2">
				<Button id="point-requirement-button" onclick={() => addNewRequired('points', true, '3')}>
					= Equal To
				</Button>
				<Button onclick={() => addNewRequired('points', true, '1')}>+ More Than</Button>
				<Button onclick={() => addNewRequired('points', true, '5')}>- Less Than</Button>
				<Button onclick={() => addNewRequired('points', true, '2')}>+= More Or Equal</Button>
				<Button onclick={() => addNewRequired('points', true, '4')}>-= Less Or Equal</Button>
			</div>
		</div>
		<div class="flex flex-col gap-y-1">
			<Label for="point-comparison-requirement-button">Point Comparison Requirements</Label>
			<div class="flex flex-row gap-x-2">
				<Button
					id="point-comparison-requirement-button"
					onclick={() => addNewRequired('pointCompare', true, '1')}
				>
					This Point-type is bigger
				</Button>
				<Button onclick={() => addNewRequired('pointCompare', true, '3')}>
					This Point-type is bigger or equal
				</Button>
				<Button onclick={() => addNewRequired('pointCompare', true, '2')}>
					These Point-types are equal
				</Button>
			</div>
		</div>
		<div class="flex flex-col gap-y-1">
			<Label for="one-of-these-requirement-button">'One of these' Requirements</Label>
			<div class="flex flex-row gap-x-2">
				<Button id="one-of-these-requirement-button" onclick={() => addNewRequired('or', true, '')}>
					'X of these is selected' Requirement
				</Button>
				<Button onclick={() => addNewRequired('or', false, '')}>
					'One of these is not selected' Requirement
				</Button>
			</div>
		</div>
		<WrappedInput
			label="Number of Requirements"
			bind:value={numberOfOrRequireds}
			type="number"
		/>
		<Dialog.Footer>
			<Button type="button" onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
