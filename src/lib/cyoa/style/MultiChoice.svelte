<script lang="ts">
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';
	import { app } from '$lib/store/store.svelte';
	import type { Object, Row } from '$lib/store/types';

	const {
		open,
		onclose,
		from,
		obj,
		embedded
	}: {
		open: boolean;
		onclose: () => void;
		from?: 'private';
		obj?: Object | Row;
		embedded?: boolean;
	} = $props();

	const styling = $derived(
		from === 'private' ? (obj?.styling ?? app.styling) : app.styling
	) as typeof app.styling;

	const textFonts = [
		{ name: 'Times New Roman', value: 'Times New Roman' },
		{ name: 'Arial', value: 'Arial' },
		{ name: 'Roboto', value: 'Roboto' },
		{ name: 'Courier New', value: 'Courier New' },
		{ name: 'Courier', value: 'Courier' },
		{ name: 'Verdana', value: 'Verdana' },
		{ name: 'Georgia', value: 'Georgia' },
		{ name: 'Comic Sans MS(NO!)', value: 'Comic Sans MS' },
		{ name: 'Candara', value: 'Candara' },
		{ name: 'Arial Black', value: 'Arial Black' },
		{ name: 'Impact', value: 'Impact' },
		{ name: 'Helvetica', value: 'Helvetica' },
		{ name: 'Calibri', value: 'Calibri' },
		{ name: 'Cambria', value: 'Cambria' },
		{ name: 'Trebuchet MS', value: 'Trebuchet MS' },
		{ name: 'Tahoma', value: 'Tahoma' }
	];
</script>

<WrappedStyle title="Multi Choice Design" {open} {onclose} {embedded} class="sm:max-w-[1000px]">
	<div class="grid grid-cols-2 gap-4 py-4">
		<WrappedInput
			label="Font size of the tier number"
			bind:value={styling.multiChoiceTextSize}
			suffix="%"
			type="number"
		/>
		<WrappedSelect
			label="The font of the tier number"
			bind:value={styling.multiChoiceTextFont}
			items={textFonts}
			placeholder="Select Font"
		/>
	</div>
</WrappedStyle>
