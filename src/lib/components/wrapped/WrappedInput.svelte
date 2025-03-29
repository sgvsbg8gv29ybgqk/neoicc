<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import { Input } from '../ui/input';
	import { Label } from '../ui/label';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		label,
		ref = $bindable(null),
		value = $bindable(),
		defaultValue,
		suffix,
		...rest
	}: {
		label: string;
		suffix?: string;
		defaultValue?: unknown;
	} & WithElementRef<HTMLInputAttributes> = $props();
	
	const id = window.crypto.randomUUID();
	
</script>

<div class="flex w-full flex-col items-start gap-y-1">
	<Label for={id}>{label}</Label>
	<div class="flex w-full flex-row items-center gap-x-1">
		<Input {id} bind:ref bind:value={() => value ?? defaultValue, (v) => (value = v)} {...rest} />
		{#if suffix}
			<span>{suffix}</span>
		{/if}
	</div>
</div>
