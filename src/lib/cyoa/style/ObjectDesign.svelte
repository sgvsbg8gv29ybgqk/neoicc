<!-- we can ingore this warning as this is a one time transformation that happens synchronously before the ui is rendered -->
<!-- svelte-ignore state_referenced_locally -->
<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';
	import WrappedImageInput from '$lib/components/wrapped/WrappedImageInput.svelte'; // + Import WrappedImageInput
	import { parseStyling } from '$lib/store/parsers/stylingParser';
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

	parseStyling(styling);
	const borderRadiusSuffix = $derived(styling.objectBorderRadiusIsPixels ? 'px' : '%');
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
	// + Define border image repeat options
	const borderImageRepeatStyles = [
		{ value: 'stretch', name: 'stretch' },
		{ value: 'repeat', name: 'repeat' },
		{ value: 'round', name: 'round' },
		{ value: 'space', name: 'space' }
	];
</script>
<WrappedStyle title="Choice Design" {open} {onclose} {embedded} class="sm:max-w-[1200px]">
<div class="grid gap-4 py-4">
<div class="grid grid-cols-3 gap-4">
<div class="flex flex-col gap-y-2">
<h6>Margin and Padding of the choices</h6>
<WrappedInput
id="object-margin"
label="Margin"
type="number"
suffix="px"
bind:value={styling.objectMargin}
/>
<WrappedInput
id="object-text-padding"
label="Padding"
type="number"
suffix="px"
bind:value={styling.objectTextPadding}
/>
{#if styling.objectDesignIsAdvanced}
<h6>Style and Width of the border</h6>
<WrappedSelect
id="object-border-style"
label="Border Styles"
items={borderStyles.map((e) => ({ value: e.value, name: e.value }))}
bind:value={styling.objectBorderStyle}
placeholder="Select Style"
/>
<WrappedInput
id="object-border-width"
label="Border Width"
type="number"
suffix="px"
bind:value={styling.objectBorderWidth}
/>
<div class="flex flex-row items-center gap-x-1">
<Checkbox id="object-overflow-is-on" bind:checked={styling.objectOverflowIsOn}/>
<Label for="object-overflow-is-on">Border-Radius Cuts off overflow</Label>
</div>
<!-- + Border Image Section Start -->
<h6 class="mt-2">Border Image</h6>
<WrappedImageInput
	id="object-border-image-file-input"
	label="Border Image File"
	bind:value={() => styling.objectBorderImage ?? '', (v) => styling.objectBorderImage = v === '' ? undefined : v}
/>
<div class="grid grid-cols-2 gap-x-2 mt-1">
	<WrappedInput
		id="object-border-image-slice-top"
		label="Slice Top"
		type="number"
		placeholder="30"
		bind:value={styling.objectBorderImageSliceTop}
	/>
	<WrappedInput
		id="object-border-image-slice-right"
		label="Slice Right"
		type="number"
		placeholder="30"
		bind:value={styling.objectBorderImageSliceRight}
	/>
	<WrappedInput
		id="object-border-image-slice-bottom"
		label="Slice Bottom"
		type="number"
		placeholder="30"
		bind:value={styling.objectBorderImageSliceBottom}
	/>
	<WrappedInput
		id="object-border-image-slice-left"
		label="Slice Left"
		type="number"
		placeholder="30"
		bind:value={styling.objectBorderImageSliceLeft}
	/>
</div>
<!-- + Border Image Section End -->
{/if}
</div>
<div class="flex flex-col gap-y-2">
<h6>Shadow that the choice makes</h6>
{#if styling.objectDesignIsAdvanced}
<WrappedInput
id="object-drop-shadow-h"
label="Horizontal Shadow"
type="number"
suffix="px"
bind:value={styling.objectDropShadowH}
/>
<WrappedInput
id="object-drop-shadow-v"
label="Vertical Shadow"
type="number"
suffix="px"
bind:value={styling.objectDropShadowV}
/>
<WrappedInput
id="object-drop-shadow-blur"
label="Shadow Blur"
type="number"
suffix="px"
bind:value={styling.objectDropShadowBlur}
/>
<WrappedInput
id="object-drop-shadow-spread"
label="Shadow Spread"
type="number"
suffix="px"
bind:value={styling.objectDropShadowSpread}
/>
{:else}
<WrappedInput
id="object-drop-shadow-h"
label="The Higher the number the bigger the shadow will be."
type="number"
suffix="px"
bind:value={() => styling.objectDropShadowH,
(v) => {
styling.objectDropShadowH = v;
styling.objectDropShadowV = v;
styling.objectDropShadowSpread = v;
styling.objectDropShadowBlur = v;
}}
/>
{/if}
<div class="flex flex-row items-center gap-x-1">
<Checkbox id="object-drop-shadow-is-on" bind:checked={styling.objectDropShadowIsOn}/>
<Label for="object-drop-shadow-is-on">Drop Shadow Is turned on</Label>
</div>
<div class="flex flex-row items-center gap-x-1">
<Checkbox id="object-border-is-on" bind:checked={styling.objectBorderIsOn}/>
<Label for="object-border-is-on">Border is turned on</Label>
</div>
</div>
<div class="flex flex-col gap-y-2">
<h6>Rounded corners on the choices</h6>
{#if styling.objectDesignIsAdvanced}
<WrappedInput
id="object-border-radius-top-left"
label="Top Left"
placeholder="0"
type="number"
suffix={borderRadiusSuffix}
bind:value={styling.objectBorderRadiusTopLeft}
/>
<WrappedInput
id="object-border-radius-top-right"
label="Top Right"
placeholder="0"
type="number"
suffix={borderRadiusSuffix}
bind:value={styling.objectBorderRadiusTopRight}
/>
<WrappedInput
id="object-border-radius-bottom-right"
label="Bottom Right"
placeholder="0"
type="number"
suffix={borderRadiusSuffix}
bind:value={styling.objectBorderRadiusBottomRight}
/>
<WrappedInput
id="object-border-radius-bottom-left"
label="Bottom Left"
placeholder="0"
type="number"
suffix={borderRadiusSuffix}
bind:value={styling.objectBorderRadiusBottomLeft}
/>
<div class="flex flex-row items-center gap-x-1">
<Switch
id="object-border-radius-is-pixels"
bind:checked={styling.objectBorderRadiusIsPixels}
/>
<Label for="object-border-radius-is-pixels">Border-Radius Percent or Pixels?</Label>
</div>
{:else}
<WrappedInput
id="object-border-radius-top-left"
label="Rounded corners in the top of each choice"
placeholder="0"
type="number"
suffix={borderRadiusSuffix}
bind:value={() => styling.objectBorderRadiusTopLeft,
(v) => {
styling.objectBorderRadiusTopLeft = v;
styling.objectBorderRadiusTopRight = v;
}}
/>
<WrappedInput
id="object-border-radius-bottom-left"
label="Rounded corners in the bottom of each choice"
placeholder="0"
type="number"
suffix={borderRadiusSuffix}
bind:value={() => styling.objectBorderRadiusBottomLeft,
(v) => {
styling.objectBorderRadiusBottomLeft = v;
styling.objectBorderRadiusBottomRight = v;
}}
/>
{/if}
</div>
</div>
<div class="grid grid-cols-3 gap-4">
<div class="flex flex-col gap-y-2">
<h6>Color of the Drop Shadow</h6>
<ColorPicker
bind:hex={() => styling.objectDropShadowColor ?? 'grey',
(v) => (styling.objectDropShadowColor = v)}
components={ChromeVariant}
sliderDirection="horizontal"
isDialog={false}
isAlpha
/>
</div>
<div class="flex flex-col gap-y-2">
<div class="flex flex-row items-center gap-x-1">
<Switch id="object-design-is-advanced" bind:checked={styling.objectDesignIsAdvanced} />
<Label for="object-design-is-advanced">Advanced Design?</Label>
</div>
<div class="flex flex-row items-center gap-x-1">
<Checkbox id="object-height" bind:checked={styling.objectHeight} />
<Label for="object-height"
>If this is checked then every choice in a row will have identical height.</Label
>
</div>
<div class="flex flex-row items-center gap-x-1">
<Checkbox id="object-gradient-is-on" bind:checked={styling.objectGradientIsOn} />
<Label for="object-gradient-is-on">Object Gradient is turned on</Label>
</div>
{#if styling.objectGradientIsOn}
<WrappedInput
id="object-gradient"
label="Gradient when not selected"
placeholder="to left, blue, red"
bind:value={styling.objectGradient}
/>
<WrappedInput
id="object-gradient-on-select"
label="Gradient when selected"
placeholder="to left, blue, red"
bind:value={styling.objectGradientOnSelect}
/>
<WrappedInput
id="object-gradient-on-req"
label="Gradient when missing requirement"
placeholder="to left, blue, red"
bind:value={styling.objectGradientOnReq}
/>
<span>
You might need to leave for the main menu if things stop updating, using the background
colors for filters does not work well, so you'll need to place gradients in ALL of them,
but using something like (green, green) works.
<a target="_blank" href="https://www.w3schools.com/css/css3_gradients.asp">
https://www.w3schools.com/css/css3_gradients.asp
</a>
</span>
{/if}
</div>
<div class="flex flex-col gap-y-2">
<h6>Color of the choice border</h6>
<ColorPicker
bind:hex={() => styling.objectBorderColor ?? 'red',
(v) => (styling.objectBorderColor = v)}
components={ChromeVariant}
sliderDirection="horizontal"
isDialog={false}
isAlpha
/>
<!-- + Border Image Settings Start -->
{#if styling.objectDesignIsAdvanced}
<div class="mt-2 flex flex-col gap-y-2">
	<h6>Border Image Settings</h6>
	<WrappedInput
		id="object-border-image-width"
		label="Border Image Width"
		type="number"
		suffix="px"
		bind:value={styling.objectBorderImageWidth}
	/>
	<WrappedSelect
		id="object-border-image-repeat"
		label="Border Image Repeat"
		items={borderImageRepeatStyles}
		bind:value={styling.objectBorderImageRepeat}
		placeholder="Select Repeat Style"
	/>
</div>
{/if}
<!-- + Border Image Settings End -->
</div>
</div>
</div>
</WrappedStyle>