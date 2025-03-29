<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import { Input } from '../ui/input';
	import { Label } from '../ui/label';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { Button } from '../ui/button';

	let {
		label,
		ref = $bindable(null),
		value = $bindable(),
		...rest
	}: {
		label: string;
		value: string;
	} & WithElementRef<HTMLInputAttributes> = $props();

	const id = window.crypto.randomUUID(); 
	
	function onFileUpload(image: FileList | null) {
		if (!image) {
			value = '';
			return;
		}
		const reader = new FileReader();
		reader.onload = () => (value = reader.result as string);
		reader.readAsDataURL(image[0]);
	}
</script>

<div class="flex max-w-64 flex-col items-start gap-y-1">
	<Label for={id}>{label}</Label>
	<div class="flex flex-row items-center gap-x-1">
		<Input
			type="file"
			{id}
			bind:ref
			onchange={(e) => onFileUpload((e.target as unknown as { files: FileList }).files)}
			{...rest}
		/>
	</div>
	{#if value}
		<img class="w-64" src={value} alt="Uploaded" />
		<Button
			class="w-full"
			onclick={() => {
				value = '';
				if (ref) (ref as HTMLInputElement).value = '';
			}}
		>
			Clear
		</Button>
	{/if}
</div>
