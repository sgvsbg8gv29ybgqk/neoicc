<script lang="ts">
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';
	import { app } from '$lib/store/store.svelte';

	const { open, onclose, embedded }: { open: boolean; onclose: () => void; embedded?: boolean } =
		$props();
</script>

<WrappedStyle title="Backpack Design" {open} {onclose} {embedded} class="sm:max-w-[800px]">
	<div class="grid gap-4 py-4">
		<WrappedInput
			label="Backpack Width"
			bind:value={app.styling.backPackWidth}
			suffix="px"
		/>
	</div>
</WrappedStyle>
