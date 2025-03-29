<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import WrappedImageInput from '$lib/components/wrapped/WrappedImageInput.svelte';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';
	import { app } from '$lib/store/store.svelte';
	import type { Object, Row } from '$lib/store/types';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';

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
</script>

<WrappedStyle title="Backgrounds" {embedded} {open} {onclose} class="sm:max-w-[1200px]">
	<div class="mx-auto grid grid-cols-3 gap-4 py-4">
		<div class="flex flex-col items-center gap-y-2">
			<p class="text-sm font-medium leading-none">Color of the background</p>
			<ColorPicker
				bind:hex={() => styling.backgroundColor ?? '#FFFFFFFF',
				(v) => (styling.backgroundColor = v)}
				components={ChromeVariant}
				sliderDirection="horizontal"
				isDialog={false}
				isAlpha
			/>
			<WrappedImageInput
				label="Background Image"
				bind:value={styling.backgroundImage}
			/>
		</div>
		<div class="flex flex-col items-center gap-y-2">
			<div class="flex flex-row items-center gap-x-1">
				<Checkbox id="styling-row-bg-color-switch" bind:checked={styling.rowBgColorIsOn} />
				<Label for="styling-row-bg-color-switch">Color of the row backgrounds</Label>
			</div>
			<ColorPicker
				bind:hex={() => styling.rowBgColor ?? '#FFFFFFFF', (v) => (styling.rowBgColor = v)}
				components={ChromeVariant}
				sliderDirection="horizontal"
				isDialog={false}
				isAlpha
			/>
			<WrappedImageInput
				label="Row Background Image"
				bind:value={styling.rowBackgroundImage}
			/>
		</div>
		<div class="flex flex-col items-center gap-y-2">
			<div class="flex flex-row items-center gap-x-1">
				<Checkbox id="styling-object-bg-color-switch" bind:checked={styling.objectBgColorIsOn} />
				<Label for="styling-object-bg-color-switch">Color of the choice backgrounds</Label>
			</div>
			<ColorPicker
				bind:hex={() => styling.objectBgColor ?? '#FFFFFFFF', (v) => (styling.objectBgColor = v)}
				components={ChromeVariant}
				sliderDirection="horizontal"
				isDialog={false}
				isAlpha
			/>
			<WrappedImageInput
				label="Choice Background Image"
				bind:value={styling.objectBackgroundImage}
			/>
		</div>
	</div>
</WrappedStyle>
