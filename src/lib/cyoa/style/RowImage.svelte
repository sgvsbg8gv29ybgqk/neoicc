<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
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
	const borderRadiusSuffix = $derived(styling.rowImgBorderRadiusIsPixels ? 'px' : '%');
	const borderStyles = [
		{ value: 'solid' },
		{ value: 'dotted' },
		{ value: 'dashed' },
		{ value: 'double' },
		{ value: 'groove' },
		{ value: 'ridge' },
		{ value: 'inset' },
		{ value: 'outset' },
		{ value: 'hidden' }
	];
</script>

<WrappedStyle title="Row Images" {open} {onclose} {embedded} class="sm:max-w-[1200px]">
	<div class="mx-auto grid grid-cols-3 gap-4 py-4">
		<div class="flex flex-col gap-y-2">
			<WrappedSelect
				label="Style of the border"
				items={borderStyles.map((s) => ({ name: s.value, value: s.value }))}
				bind:value={styling.rowImgBorderStyle}
				placeholder="Border Style"
				triggerClass="max-w-48"
			/>
			<WrappedInput
				label="Thickness of the border"
				bind:value={styling.rowImgBorderWidth}
				placeholder="0"
				suffix="px"
				type="number"
			/>
			<WrappedInput
				label="Width of the image inside of a choice"
				bind:value={styling.rowImageWidth}
				suffix="%"
				type="number"
			/>
			<WrappedInput
				label="Distance Between Top of row and Image"
				bind:value={styling.rowImageMarginTop}
				suffix="%"
				type="number"
			/>
			<WrappedInput
				label="Distance Between Title and Image"
				bind:value={styling.rowImageMarginBottom}
				placeholder="0"
				suffix="%"
				type="number"
			/>
		</div>
		<div class="flex flex-col gap-y-2">
			<WrappedInput
				label="Border-radius Top Left"
				bind:value={styling.rowImgBorderRadiusTopLeft}
				placeholder="0"
				suffix={borderRadiusSuffix}
				type="number"
			/>
			<WrappedInput
				label="Border-radius Top Right"
				bind:value={styling.rowImgBorderRadiusTopRight}
				placeholder="0"
				suffix={borderRadiusSuffix}
				type="number"
			/>
			<WrappedInput
				label="Border-radius Bottom Right"
				bind:value={styling.rowImgBorderRadiusBottomRight}
				placeholder="0"
				suffix={borderRadiusSuffix}
				type="number"
			/>
			<WrappedInput
				label="Border-radius Bottom Left"
				bind:value={styling.rowImgBorderRadiusBottomLeft}
				placeholder="0"
				suffix={borderRadiusSuffix}
				type="number"
			/>
			<div class="flex flex-row items-center gap-x-1">
				<Switch
					id="row-image-border-radius-is-pixels"
					bind:checked={styling.rowImgBorderRadiusIsPixels}
				/>
				<Label for="row-image-border-radius-is-pixels">Pixels or Percents</Label>
			</div>
			<div class="flex flex-row items-center gap-x-1">
				<Checkbox id="row-image-border-is-on" bind:checked={styling.rowImgBorderIsOn} />
				<Label for="row-image-border-is-on">Border Is On</Label>
			</div>
			<div class="flex flex-row items-center gap-x-1">
				<Checkbox
					id="row-image-overfow-is-on"
					bind:checked={() => styling.rowImgOverflowIsOn ?? false,
					(v) => (styling.rowImgOverflowIsOn = v)}
				/>
				<Label for="row-image-overflow-is-on">Cut off overflow images/text</Label>
			</div>
		</div>
		<div class="flex flex-col gap-y-2">
			<h6>Style and Width of the border</h6>
			<ColorPicker
				bind:hex={() => styling.rowImgBorderColor ?? 'red', (v) => (styling.rowImgBorderColor = v)}
				components={ChromeVariant}
				sliderDirection="horizontal"
				isDialog={false}
				isAlpha
			/>
		</div>
	</div>
</WrappedStyle>
