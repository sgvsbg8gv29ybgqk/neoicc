<script lang="ts">
	import type { Object, Requireds, Row } from '$lib/store/types';
	import { app } from '$lib/store/store.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';

	const { required, idPostfix, children }: { required: Requireds; idPostfix: string; children?: any } = $props();

	let modal = $state<'none' | 'appRequirement'>('none');
	const pointReqOperators = [
		{ name: '+ More than', value: '1' },
		{ name: '+= More or equal', value: '2' },
		{ name: '= Equal to', value: '3' },
		{ name: '-= Less or equal', value: '4' },
		{ name: '- Less than', value: '5' }
	];
</script>

<div>
	{#if required.type === 'id'}
		<WrappedInput
				label={required.required ? 'Selected Choice ID' : 'Not Selected Choice ID'}
				bind:value={required.reqId}
				placeholder={required.required ? 'Selected ID' : 'Not Selected ID'}
		/>
	{:else if required.type === 'points'}
		<div>
			<WrappedSelect
					label="Point Type"
					bind:value={required.reqId}
					items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
					placeholder="Point Type"
			/>
			<WrappedSelect
					label="Operator"
					bind:value={required.operator}
					items={pointReqOperators}
					placeholder="Operator"
			/>
			<WrappedInput
					label="Value"
					bind:value={required.reqPoints}
					type="number"
			/>
		</div>
	{:else if required.type === 'pointCompare'}
		<div>
						<span class="text-center">
							{required.operator.toString() === '1' && 'A is bigger than B'}
							{required.operator.toString() === '2' && 'A is equal to B'}
							{required.operator.toString() === '3' && 'A is bigger/equal to B'}
						</span>
			<WrappedSelect
					label="Operator"
					bind:value={required.operator}
					items={pointReqOperators}
					placeholder="Operator"
			/>
			<WrappedSelect
					label="Point Type A"
					bind:value={required.reqId}
					items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
					placeholder="Point Type"
			/>
			<WrappedSelect
					label="Point Type B"
					bind:value={required.reqId2}
					items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
					placeholder="Point Type"
			/>
		</div>
	{:else if required.type === 'or'}
		<WrappedInput
				label="N"
				bind:value={() => required.orNum ?? 1,
						(v) => (required.orNum = Math.max(0, Math.min(v, required.orRequired.length)))}
				type="number"
				min="1"
				max={required.orRequired.length}
		/>
		{#each required.orRequired as orRequired, orIndex}
			<WrappedInput
					label={required.required ? 'Selected Choice ID' : 'Not Selected Choice ID'}
					bind:value={orRequired.req}
					placeholder={required.required ? 'Selected ID' : 'Not Selected ID'}
			/>
		{/each}
	{/if}
	{@render children?.()}
</div>
