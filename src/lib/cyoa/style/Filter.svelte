<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Switch } from '$lib/components/ui/switch';
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';
	import WrappedImageInput from '$lib/components/wrapped/WrappedImageInput.svelte';
	import { app } from '$lib/store/store.svelte';
	import type { Object, Row } from '$lib/store/types';
	import { pi } from '$lib/store/utils';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';

	const {
		open,
		onclose,
		obj,
		from,
		embedded
	}: { open: boolean; onclose: () => void; obj?: Object | Row; from?: string; embedded?: boolean } =
		$props();

	const styling = $derived(from === 'private' ? (obj?.styling ?? app.styling) : app.styling);

import { backgroundImages, getRandomBackgroundImage } from './backgroundImageUtils';

import { onMount } from 'svelte';

import { get } from 'svelte/store';

// Initialize and sync backgroundImages store with styling.selFilterBgImages
onMount(() => {
	if (!styling.selFilterBgImages) {
		styling.selFilterBgImages = [];
	}
	if (get(backgroundImages).length === 0) {
		backgroundImages.set([...styling.selFilterBgImages]); 
	}
});

$effect(() => {
	if (styling.selFilterBgImages && styling.selFilterBgImages.length > 0) {
		const currentBackgroundImages = get(backgroundImages);
		if (JSON.stringify(currentBackgroundImages) !== JSON.stringify(styling.selFilterBgImages)) {
			backgroundImages.set([...styling.selFilterBgImages]); 
		}
	}
});

// Function to add a new image input
function addImageInput() {
	if (styling.selFilterBgImages.length < 10) {
		styling.selFilterBgImages = [...styling.selFilterBgImages, '']; 
	}
}

// Function to remove an image input
function removeImageInput(index: number) {
	styling.selFilterBgImages = styling.selFilterBgImages.filter((_, i) => i !== index); 
}

// Function to update an image input
function updateImageInput(index: number, value: string) {
	styling.selFilterBgImages = styling.selFilterBgImages.map((img, i) => i === index ? value : img); 
}

 
</script>

{#snippet Option(
	name: string,
	numKey: keyof typeof styling,
	boolKey: keyof typeof styling,
	suffix: string,
	isReq: boolean = false
)}
	<div class="flex flex-row items-center gap-x-1">
		<div class="flex flex-col items-end gap-y-1">
			<Label class="w-20 text-right" for="styling-{numKey}-input">{name}</Label>
			<Checkbox
				bind:checked={() => (styling[boolKey] as boolean) ?? false,
				(v) => ((styling as unknown as { [k in keyof typeof styling]: boolean })[boolKey] = v)}
				disabled={isReq && styling.reqFilterVisibleIsOn}
			/>
		</div>
		<div class="flex flex-col gap-y-1">
			<div class="flex flex-row items-center gap-x-1">
				<Input
					class="max-w-24"
					id="styling-{numKey}-input"
					type="number"
					bind:value={() => pi(styling[numKey] ?? 0),
					(v) => ((styling as unknown as { [k in keyof typeof styling]: number })[numKey] = v)}
					disabled={isReq && styling.reqFilterVisibleIsOn}
				/>
				<span>{suffix}</span>
			</div>
		</div>
	</div>
{/snippet}

<WrappedStyle
	title="Filter"
	{open}
	{onclose}
	{embedded}
	class="max-h-screen overflow-y-auto sm:max-w-[1200px]"
>
	<div class="grid gap-4 py-4">
		<div class="flex flex-col gap-y-2">
			<!-- Selected Object Filter -->
			<div>
				<h5>Filter on Choice that is selected</h5>
			</div>
			<Separator />
			<div class="mb-5">
				<div class="flex flex-row justify-around">
					<div class="grid grid-flow-col grid-rows-3 gap-x-2 gap-y-2">
						{@render Option('Blur', 'selFilterBlur', 'selFilterBlurIsOn', 'px')}
						{@render Option('Brightness', 'selFilterBright', 'selFilterBrightIsOn', '%')}
						{@render Option('Contrast', 'selFilterCont', 'selFilterContIsOn', '%')}
						{@render Option('Hue-rotate', 'selFilterHue', 'selFilterHueIsOn', 'deg')}
						{@render Option('Invert', 'selFilterInvert', 'selFilterInvertIsOn', '%')}
						{@render Option('Sepia', 'selFilterSepia', 'selFilterSepiaIsOn', '%')}
						{@render Option('Opacity', 'selFilterOpac', 'selFilterOpacIsOn', '%')}
						{@render Option('Saturate', 'selFilterSatur', 'selFilterSaturIsOn', '%')}
						{@render Option('Grayscale', 'selFilterGray', 'selFilterGrayIsOn', '%')}
					</div>
					<div class="flex flex-col gap-y-2">
						<div class="flex flex-col gap-y-2">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-sel-bg-type-switch">Use Image Background</Label>
								<Checkbox
									bind:checked={() => styling.selFilterBgImageIsOn ?? false,
									(v) => (styling.selFilterBgImageIsOn = v)}
								/>
							</div>
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-sel-bg-color-switch">Background Color</Label>
								<Checkbox
									bind:checked={() => styling.selBgColorIsOn ?? false,
									(v) => (styling.selBgColorIsOn = v)}
								/>
							</div>
							{#if styling.selBgColorIsOn}
								<ColorPicker
									bind:hex={() => styling.selFilterBgColor ?? '#70FF7EFF',
									(v) => (styling.selFilterBgColor = v)}
									components={ChromeVariant}
									sliderDirection="horizontal"
									isDialog={false}
									isAlpha
								/>
							{/if}
							{#if styling.selFilterBgImageIsOn}
								<div class="flex flex-col gap-y-2">
									{#each styling.selFilterBgImages as image, index}
										<div class="flex flex-row items-center gap-x-2">
											<WrappedImageInput
												label="Background Image {index + 1}"
												bind:value={styling.selFilterBgImages[index]}
											/>
											<button
												class="text-red-500"
												onclick={() => removeImageInput(index)}>X</button
											>
										</div>
									{/each}
									{#if styling.selFilterBgImages.length < 10}
										<button
											class="text-blue-500 relative group"
											onclick={addImageInput}
										>
											Add Another Image
											<div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
												Additional images will be randomly selected as backgrounds for activated cards.
												<div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-700"></div>
											</div>
										</button>
									{/if}
									{#if styling.selFilterBgImages[0]}
										<div class="flex flex-row items-center gap-x-1">
											<Label for="styling-sel-bg-image-opacity">Image Opacity</Label>
											<Input
												class="max-w-24"
												id="styling-sel-bg-image-opacity"
												type="number"
												min="0"
												max="100"
												bind:value={() => pi(styling.selFilterBgImageOpacity ?? 100),
												(v) => (styling.selFilterBgImageOpacity = v)}
											/>
											<span>%</span>
										</div>
										<div class="flex flex-row items-center gap-x-1">
											<Label for="styling-sel-bg-image-position">Image Position</Label>
											<select
												id="styling-sel-bg-image-position"
												class="rounded border p-1"
												bind:value={styling.selFilterBgImagePosition}
											>
												<option value="0% 0%">Top Left</option>
												<option value="100% 0%">Top Right</option>
												<option value="0% 100%">Bottom Left</option>
												<option value="100% 100%">Bottom Right</option>
												<option value="50% 100%">Bottom Center</option>
												<option value="50% 50%">Center</option>
											</select>
										</div>
										<div class="flex flex-row items-center gap-x-1">
											<Label for="styling-sel-bg-image-width">Image Width</Label>
											<select
												id="styling-sel-bg-image-width"
												class="rounded border p-1"
												bind:value={styling.selFilterBgImageWidth}
											>
												<option value="auto">Auto</option>
												<option value="100%">100%</option>
											</select>
										</div>
										<div class="flex flex-row items-center gap-x-1">
											<Label for="styling-sel-bg-image-repeat">Image Repeat</Label>
											<select
												id="styling-sel-bg-image-repeat"
												class="rounded border p-1"
												bind:value={styling.selFilterBgImageRepeat}
											>
												<option value="repeat">Repeat</option>
												<option value="round">Round</option>
												<option value="space">Space</option>
												<option value="no-repeat">No-repeat</option>
											</select>
										</div>
									{/if}
								</div>
							{/if}
						</div>
						<div class="flex flex-col gap-y-2">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-sel-border-color-switch">Border Color</Label>
								<Checkbox
									bind:checked={() => styling.selBorderColorIsOn ?? false,
									(v) => (styling.selBorderColorIsOn = v)}
								/>
							</div>
							<ColorPicker
								bind:hex={() => styling.selFilterBorderColor ?? '#000000FF',
								(v) => (styling.selFilterBorderColor = v)}
								components={ChromeVariant}
								sliderDirection="horizontal"
								isDialog={false}
								isAlpha
							/>
						</div>
						<div class="flex flex-col gap-y-2">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-sel-text-color-switch">Text Color</Label>
								<Checkbox
									bind:checked={() => styling.selCTextColorIsOn ?? false,
									(v) => (styling.selCTextColorIsOn = v)}
								/>
							</div>
							<ColorPicker
								bind:hex={() => styling.selFilterCTextColor ?? '#000000FF',
								(v) => (styling.selFilterCTextColor = v)}
								components={ChromeVariant}
								sliderDirection="horizontal"
								isDialog={false}
								isAlpha
							/>
						</div>
						<div class="flex flex-col gap-y-2">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-sel-title-color-switch">Title Color</Label>
								<Checkbox
									bind:checked={() => styling.selCTitleColorIsOn ?? false,
									(v) => (styling.selCTitleColorIsOn = v)}
								/>
							</div>
							<ColorPicker
								bind:hex={() => styling.selFilterCTitleColor ?? '#000000FF',
								(v) => (styling.selFilterCTitleColor = v)}
								components={ChromeVariant}
								sliderDirection="horizontal"
								isDialog={false}
								isAlpha
							/>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h5>Filter on Choice that is missing its required</h5>
			</div>
			<Separator />
			<div class="mb-5">
				<div class="flex flex-row justify-around">
					<div class="grid grid-flow-col grid-rows-3 gap-x-2 gap-y-2">
						{@render Option('Blur', 'reqFilterBlur', 'reqFilterBlurIsOn', 'px', true)}
						{@render Option('Brightness', 'reqFilterBright', 'reqFilterBrightIsOn', '%', true)}
						{@render Option('Contrast', 'reqFilterCont', 'reqFilterContIsOn', '%', true)}
						{@render Option('Hue-rotate', 'reqFilterHue', 'reqFilterHueIsOn', 'deg', true)}
						{@render Option('Invert', 'reqFilterInvert', 'reqFilterInvertIsOn', '%', true)}
						{@render Option('Sepia', 'reqFilterSepia', 'reqFilterSepiaIsOn', '%', true)}
						{@render Option('Opacity', 'reqFilterOpac', 'reqFilterOpacIsOn', '%', true)}
						{@render Option('Saturate', 'reqFilterSatur', 'reqFilterSaturIsOn', '%', true)}
						{@render Option('Grayscale', 'reqFilterGray', 'reqFilterGrayIsOn', '%', true)}
					</div>
					<div class="flex flex-col gap-y-2">
						<div class="flex flex-row items-center gap-x-1">
							<Label for="styling-sel-bg-color-switch">Background Color</Label>
							<Checkbox
								bind:checked={() => styling.reqBgColorIsOn ?? false,
								(v) => (styling.reqBgColorIsOn = v)}
								disabled={styling.reqFilterVisibleIsOn}
							/>
						</div>
						<ColorPicker
							bind:hex={() => styling.reqFilterBgColor ?? '#FFFFFFFF',
							(v) => (styling.reqFilterBgColor = v)}
							components={ChromeVariant}
							sliderDirection="horizontal"
							isDialog={false}
							isAlpha
						/>
						<div class="flex flex-col gap-y-2">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-req-text-color-switch">Text Color</Label>
								<Checkbox
									bind:checked={() => styling.reqCTextColorIsOn ?? false,
									(v) => (styling.reqCTextColorIsOn = v)}
									disabled={styling.reqFilterVisibleIsOn}
								/>
							</div>
							<ColorPicker
								bind:hex={() => styling.reqFilterCTextColor ?? '#000000FF',
								(v) => (styling.reqFilterCTextColor = v)}
								components={ChromeVariant}
								sliderDirection="horizontal"
								isDialog={false}
								isAlpha
							/>
						</div>
						<div class="flex flex-col gap-y-2">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-req-title-color-switch">Title Color</Label>
								<Checkbox
									bind:checked={() => styling.reqCTitleColorIsOn ?? false,
									(v) => (styling.reqCTitleColorIsOn = v)}
									disabled={styling.reqFilterVisibleIsOn}
								/>
							</div>
							<ColorPicker
								bind:hex={() => styling.reqFilterCTitleColor ?? '#000000FF',
								(v) => (styling.reqFilterCTitleColor = v)}
								components={ChromeVariant}
								sliderDirection="horizontal"
								isDialog={false}
								isAlpha
							/>
						</div>
					</div>
				</div>
				<div class="flex w-full flex-col items-center">
					<div class="flex flex-row items-center gap-x-1">
						<Label for="styling-req-filter-visible-switch">Hide The Choice Completely</Label>
						<Switch
							id="styling-req-filter-visible-switch"
							bind:checked={() => styling.reqFilterVisibleIsOn ?? false,
							(v) => (styling.reqFilterVisibleIsOn = v)}
						/>
					</div>
				</div>
			</div>
		</div>
	</div></WrappedStyle
>
