<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '../ui/button';

	const {
		title,
		description,
		children,
		embedded,
		open,
		onclose,
		class: className
	}: {
		title: string;
		description?: string;
		children: Snippet;
		embedded: boolean | undefined;
		open: boolean;
		onclose: () => void;
		class: string;
	} = $props();
</script>

{#if embedded}
	{#if open}
		<div class="p-2 bg-gray-300">
			{@render children()}
			<Button class="w-full" onclick={() => onclose()}>Close</Button>
		</div>
	{/if}
{:else}
	<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
		<Dialog.Content class={className}>
			<Dialog.Header>
				<Dialog.Title>{title}</Dialog.Title>
				{#if description}
					<Dialog.Description>{description}</Dialog.Description>
				{/if}
			</Dialog.Header>
			{@render children()}
			<Dialog.Footer>
				<Button onclick={() => onclose()}>Close</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/if}
