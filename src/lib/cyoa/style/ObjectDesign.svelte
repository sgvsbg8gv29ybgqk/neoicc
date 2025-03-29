<!-- we can ingore this warning as this is a one time transformation that happens synchronously before the ui is rendered -->
<!-- svelte-ignore state_referenced_locally -->
<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';
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
</script>

<WrappedStyle title="Choice Design" {open} {onclose} {embedded} class="sm:max-w-[1200px]">
	<div class="grid gap-4 py-4">
		<div class="grid grid-cols-3 gap-4">
			<div class="flex flex-col gap-y-2">
				<h6>Margin and Padding of the choices</h6>
				<WrappedInput
						label="Margin"
						type="number"
						suffix="px"
						bind:value={styling.objectMargin}
				/>
				<WrappedInput
						label="Padding"
						type="number"
						suffix="px"
						bind:value={styling.objectTextPadding}
				/>
				{#if styling.objectDesignIsAdvanced}
					<h6>Style and Width of the border</h6>
					<WrappedSelect
						label="Border Styles"
						items={borderStyles.map((e) => ({ value: e.value, name: e.value }))}
						bind:value={styling.objectBorderStyle}
						placeholder="Select Style"
					/>
					<WrappedInput
						label="Border Width"
						type="number"
						suffix="px"
						bind:value={styling.objectBorderWidth}
					/>
					<div class="flex flex-row items-center gap-x-1">
						<Checkbox id="object-overflow-is-on" bind:checked={styling.objectOverflowIsOn}/>
						<Label for="object-overflow-is-on">Border-Radius Cuts off overflow</Label>
					</div>
				{/if}
			</div>
			<div class="flex flex-col gap-y-2">
				<h6>Shadow that the choice makes</h6>
				{#if styling.objectDesignIsAdvanced}
					<WrappedInput
						label="Horizontal Shadow"
						type="number"
						suffix="px"
						bind:value={styling.objectDropShadowH}
					/>
					<WrappedInput
						label="Vertical Shadow"
						type="number"
						suffix="px"
						bind:value={styling.objectDropShadowV}
					/>
					<WrappedInput
						label="Shadow Blur"
						type="number"
						suffix="px"
						bind:value={styling.objectDropShadowBlur}
					/>
					<WrappedInput
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
						label="Top Left"
						placeholder="0"
						type="number"
						suffix={borderRadiusSuffix}
						bind:value={styling.objectBorderRadiusTopLeft}
					/>
					<WrappedInput
						label="Top Right"
						placeholder="0"
						type="number"
						suffix={borderRadiusSuffix}
						bind:value={styling.objectBorderRadiusTopRight}
					/>
					<WrappedInput
						label="Bottom Right"
						placeholder="0"
						type="number"
						suffix={borderRadiusSuffix}
						bind:value={styling.objectBorderRadiusBottomRight}
					/>
					<WrappedInput
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
						label="Gradient when not selected"
						placeholder="to left, blue, red"
						bind:value={styling.objectGradient}
					/>
					<WrappedInput
						label="Gradient when selected"
						placeholder="to left, blue, red"
						bind:value={styling.objectGradientOnSelect}
					/>
					<WrappedInput
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
			</div>
		</div>
	</div>
</WrappedStyle>
