<script lang="ts">
	import { app } from '$lib/store/store.svelte';
	import type { Object, Row } from '$lib/store/types';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';

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
	const borderRadiusSuffix = $derived(styling.objectImgBorderRadiusIsPixels ? 'px' : '%');

	const borderStyles = [
		{ text: 'solid' },
		{ text: 'dotted' },
		{ text: 'dashed' },
		{ text: 'double' },
		{ text: 'groove' },
		{ text: 'ridge' },
		{ text: 'inset' },
		{ text: 'outset' },
		{ text: 'hidden' }
	];
	const objectFitStyles = [
		{
			value: 'fill',
			text: "Fill: The replaced content is sized to fill the element's content box. If necessary, the object will be stretched or squished to fit"
		},
		{
			value: 'contain',
			text: "Contain: The replaced content is scaled to maintain its aspect ratio while fitting within the element's content box"
		},
		{
			value: 'cover',
			text: "Cover: The replaced content is sized to maintain its aspect ratio while filling the element's entire content box. The object will be clipped to fit"
		},
		{
			value: 'scale-down',
			text: 'Scale-down: The content is sized as if none or contain were specified (would result in a smaller concrete object size)'
		},
		{ value: 'none', text: 'None: The replaced content is not resized' }
	];
</script>

<WrappedStyle title="Choice Images" {open} {onclose} {embedded} class="sm:max-w-[1200px]">
	<div class="grid gap-4 py-4">
		<div class="mx-auto grid grid-cols-3 gap-x-8">
			<div class="flex flex-col gap-y-2">
				<WrappedSelect
					label="Style of the border"
					items={borderStyles.map((e) => ({ value: e.text, name: e.text }))}
					bind:value={styling.objectImgBorderStyle}
					placeholder="Select Style"
					triggerClass="max-w-48"
				/>
				<WrappedInput
					label="Thickness of the border"
					type="number"
					suffix="px"
					bind:value={styling.objectImgBorderWidth}
				/>
				<WrappedInput
					label="Width of the image inside of a choice"
					type="number"
					suffix="%"
					bind:value={styling.objectImageWidth}
				/>
				<WrappedInput
					label="Distance Between Top of choice and Image"
					type="number"
					suffix="%"
					bind:value={styling.objectImageMarginTop}
				/>
				<WrappedInput
					label="Distance Between Title and Image"
					type="number"
					suffix="%"
					bind:value={styling.objectImageMarginBottom}
				/>
			</div>
			<div class="flex flex-col gap-y-2">
				<WrappedInput
					label="Border-radius Top Left"
					placeholder="0"
					type="number"
					suffix={borderRadiusSuffix}
					bind:value={styling.objectImgBorderRadiusTopLeft}
				/>
				<WrappedInput
					label="Border-radius Top Right"
					placeholder="0"
					type="number"
					suffix={borderRadiusSuffix}
					bind:value={styling.objectImgBorderRadiusTopRight}
				/>
				<WrappedInput
					label="Border-radius Bottom Right"
					placeholder="0"
					type="number"
					suffix={borderRadiusSuffix}
					bind:value={styling.objectImgBorderRadiusBottomRight}
				/>
				<WrappedInput
					label="Border-radius Bottom Left"
					placeholder="0"
					type="number"
					suffix={borderRadiusSuffix}
					bind:value={styling.objectImgBorderRadiusBottomLeft}
				/>
				<div class="flex flex-row items-center gap-x-1">
					<Switch
						id="object-image-border-radius-unit"
						bind:checked={styling.objectImgBorderRadiusIsPixels}
					/>
					<Label for="object-image-border-radius-unit">Pixels or Percents</Label>
				</div>
				<div class="flex flex-row items-center gap-x-1">
					<Checkbox id="object-image-border-on" bind:checked={styling.objectImgBorderIsOn} />
					<Label for="object-image-border-on">Border Is On</Label>
				</div>
				<div class="flex flex-row items-center gap-x-1">
					<Checkbox id="object-image-overflow-on" bind:checked={styling.objectImgOverflowIsOn} />
					<Label for="object-image-overflow-on">Cut off overflow images/text</Label>
				</div>
			</div>
			<div class="flex flex-col gap-y-2">
				<h6>Style and Width of the border</h6>
				<ColorPicker
					bind:hex={() => styling.objectImgBorderColor ?? 'red',
					(v) => (styling.objectImgBorderColor = v)}
					components={ChromeVariant}
					sliderDirection="horizontal"
					isDialog={false}
					isAlpha
				/>
			</div>
		</div>
		<div class="flex flex-col gap-y-2">
			<h6>Object Fit</h6>
			<span class="text-sm">
				How the images fit inside of the choice.<br />
				A textfield where you can decide the Size of the container will appear in Row Settings when the
				switch is on.
			</span>
			<WrappedSelect
				label="Object Fill"
				items={objectFitStyles.map((e) => ({ value: e.value, name: e.text }))}
				bind:value={styling.objectImgObjectFillStyle}
				placeholder="Select Style"
			/>
			<div class="flex flex-row items-center gap-x-1">
				<Checkbox id="object-fit-on" bind:checked={styling.objectImgObjectFillIsOn} />
				<Label for="object-fit-on">Object Fit Is On</Label>
			</div>
		</div>
	</div>
</WrappedStyle>
