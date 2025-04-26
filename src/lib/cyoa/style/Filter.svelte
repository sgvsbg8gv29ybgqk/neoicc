<!-- src/lib/cyoa/style/Filter.svelte -->
<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Switch } from '$lib/components/ui/switch';
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';
	import WrappedImageInput from '$lib/components/wrapped/WrappedImageInput.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import { app } from '$lib/store/store.svelte';
	import type { Object, Row, Styling } from '$lib/store/types'; // Import Styling type
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
	let reqImageInputs: string[] = $state([]);

	const styling = $derived(from === 'private' ? (obj?.styling ?? app.styling) : app.styling);

import { backgroundImages, getRandomBackgroundImage } from './backgroundImageUtils';

import { onMount } from 'svelte';

import { get } from 'svelte/store';

// Initialize and sync backgroundImages store with styling.selFilterBgImages
onMount(() => {
	// Sync 'selected' images
	if (!styling.selFilterBgImages) {
		styling.selFilterBgImages = [];
	}
	if (get(backgroundImages).length === 0 && styling.selFilterBgImages.length > 0) { // Check length before setting
		backgroundImages.set([...styling.selFilterBgImages]);
	}

	// Initialize 'unavailable' images
	if (!styling.reqFilterBgImages) {
		styling.reqFilterBgImages = [];
	}
	if (reqImageInputs.length === 0 && styling.reqFilterBgImages.length > 0) {
		reqImageInputs = [...styling.reqFilterBgImages];
	}
});

$effect(() => {
	// Sync 'selected' images (styling -> store)
	if (styling.selFilterBgImages) { // Check if array exists
		const currentBackgroundImages = get(backgroundImages);
		if (JSON.stringify(currentBackgroundImages) !== JSON.stringify(styling.selFilterBgImages)) {
			backgroundImages.set([...styling.selFilterBgImages]);
		}
	}

	// Sync 'unavailable' images (local state <-> styling)
	if (styling.reqFilterBgImages) { // Check if array exists
		// Update styling from local state if they differ (after user input via bind:value)
		if (JSON.stringify(reqImageInputs) !== JSON.stringify(styling.reqFilterBgImages)) {
			styling.reqFilterBgImages = [...reqImageInputs];
		}
	} else {
         // Ensure styling.reqFilterBgImages is an array if reqImageInputs has items
         if(reqImageInputs.length > 0) {
              styling.reqFilterBgImages = [...reqImageInputs];
         }
    }

    // Ensure reqImageInputs reflects styling if styling is updated externally or initially empty
    if(styling.reqFilterBgImages && JSON.stringify(reqImageInputs) !== JSON.stringify(styling.reqFilterBgImages)) {
         reqImageInputs = [...styling.reqFilterBgImages];
    }

});

// Function to add a new image input
function addImageInput() {
    if (!styling.selFilterBgImages) styling.selFilterBgImages = []; // Ensure array exists
	if (styling.selFilterBgImages.length < 10) {
		styling.selFilterBgImages = [...styling.selFilterBgImages, ''];
	}
}

// Function to remove an image input
function removeImageInput(index: number) {
    if (!styling.selFilterBgImages) return; // Guard against undefined array
	styling.selFilterBgImages = styling.selFilterBgImages.filter((_, i) => i !== index);
}

// --- Functions for Unavailable Background Images ---

function addReqImageInput() {
	if (reqImageInputs.length < 10) {
		reqImageInputs = [...reqImageInputs, ''];
        // $effect handles syncing back to styling.reqFilterBgImages
	}
}

function removeReqImageInput(index: number) {
	reqImageInputs = reqImageInputs.filter((_, i) => i !== index);
    // $effect handles syncing back to styling.reqFilterBgImages
}

</script>

{#snippet Option(
	name: string,
	numKey: keyof typeof styling,
	boolKey: keyof typeof styling, // Consider stricter typing if possible
	suffix: string,
	isReq: boolean = false
)}
	<div class="flex flex-row items-center gap-x-1">
		<div class="flex flex-col items-end gap-y-1">
			<Label class="w-20 text-right" for="styling-{numKey}-input">{name}</Label>
			<Checkbox
				id="styling-{boolKey}-checkbox"
				bind:checked={() => (styling[boolKey] as boolean) ?? false, (v: boolean) => { (styling as any)[boolKey] = v; }}  
				disabled={isReq && styling.reqFilterVisibleIsOn}
			/>
		</div>
		<div class="flex flex-col gap-y-1">
			<div class="flex flex-row items-center gap-x-1">
				<Input
					class="max-w-24"
					id="styling-{numKey}-input"
					type="number"
					bind:value={(styling[numKey] as number)}
					disabled={(isReq && styling.reqFilterVisibleIsOn) || !(styling[boolKey] ?? false)}
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
				<div class="flex flex-row justify-around flex-wrap">
                    <!-- Filter Effects (Left Side) -->
					<div class="grid grid-flow-col grid-rows-3 gap-x-2 gap-y-2 mb-4 md:mb-0">
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
                    <!-- Appearance Overrides (Right Side) -->
					<div class="flex flex-col gap-y-2 w-full md:w-auto">
						<!-- Background Image (Selected) -->
						<div class="flex flex-col gap-y-2 border p-2 rounded">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-sel-bg-type-switch">Use Image Background</Label>
								<Checkbox
									id="styling-sel-bg-type-switch"
									bind:checked={() => styling.selFilterBgImageIsOn ?? false, (v) => styling.selFilterBgImageIsOn = v}
								/>
							</div>
							{#if styling.selFilterBgImageIsOn}
								<div class="flex flex-col gap-y-2 pl-4">
                                    {#if !styling.selFilterBgImages}{@const _ = styling.selFilterBgImages = []}{/if}
									{#each styling.selFilterBgImages as image, index (index)}
										<div class="flex flex-row items-center gap-x-2">
											<WrappedImageInput
												id="selected-bg-image-input-{index}"
												label="Image {index + 1}"
												bind:value={styling.selFilterBgImages[index]}
											/>
											<Button
                                                variant="destructive" size="sm"
												onclick={() => removeImageInput(index)}>X</Button>
										</div>
									{/each}
									{#if styling.selFilterBgImages.length < 10}
										<Button variant="outline" size="sm" onclick={addImageInput}> Add Image </Button>
									{/if}
									{#if styling.selFilterBgImages.length > 0 && styling.selFilterBgImages[0]}
                                        <div class="flex flex-row items-center gap-x-1">
											<Label for="styling-sel-bg-image-opacity">Image Opacity</Label>
											<Input class="max-w-24" id="styling-sel-bg-image-opacity" type="number" min="0" max="100" bind:value={styling.selFilterBgImageOpacity}/>
											<span>%</span>
										</div>
										<div class="flex flex-row items-center gap-x-1">
											<Label for="styling-sel-bg-image-position">Image Position</Label>
											<Input class="max-w-36" id="styling-sel-bg-image-position" placeholder="e.g., center, 50% 10px" bind:value={styling.selFilterBgImagePosition} />
										</div>
										<div class="flex flex-row items-center gap-x-1">
											<Label for="styling-sel-bg-image-width">Image Size</Label>
                                            <Input class="max-w-36" id="styling-sel-bg-image-width" placeholder="e.g., cover, 100% auto" bind:value={styling.selFilterBgImageWidth} />
										</div>
										<div class="flex flex-row items-center gap-x-1">
											<Label for="styling-sel-bg-image-repeat">Image Repeat</Label>
											<select id="styling-sel-bg-image-repeat" class="rounded border p-1" bind:value={styling.selFilterBgImageRepeat}>
												<option value="repeat">Repeat</option> <option value="round">Round</option> <option value="space">Space</option> <option value="no-repeat">No-repeat</option>
											</select>
										</div>
									{/if}
								</div>
							{/if}
						</div>
                        <!-- Background Color (Selected) -->
						<div class="flex flex-col gap-y-2 border p-2 rounded">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-sel-bg-color-switch">Use Background Color</Label>
								<Checkbox id="styling-sel-bg-color-switch" bind:checked={() => styling.selBgColorIsOn ?? false, (v) => styling.selBgColorIsOn = v} />
							</div>
							{#if styling.selBgColorIsOn}
								<ColorPicker bind:hex={styling.selFilterBgColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} isAlpha />
							{/if}
						</div>
                        <!-- Border Color (Selected) -->
						<div class="flex flex-col gap-y-2 border p-2 rounded">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-sel-border-color-switch">Use Border Color</Label>
								<Checkbox id="styling-sel-border-color-switch" bind:checked={() => styling.selBorderColorIsOn ?? false, (v) => styling.selBorderColorIsOn = v} />
							</div>
							{#if styling.selBorderColorIsOn}
								<ColorPicker bind:hex={styling.selFilterBorderColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} isAlpha />
							{/if}
						</div>
                        <!-- Drop Shadow (Selected) -->
                        <div class="flex flex-col gap-y-2 border p-2 rounded">
                            <div class="flex flex-row items-center gap-x-1">
                                <Label for="styling-sel-shadow-switch">Use Drop Shadow Override</Label>
                                <Checkbox id="styling-sel-shadow-switch" bind:checked={() => styling.selFilterDropShadowIsOn ?? false, (v) => styling.selFilterDropShadowIsOn = v} />
                            </div>
                            {#if styling.selFilterDropShadowIsOn}
                                <div class="pl-4 flex flex-col gap-y-1">
                                    <WrappedInput id="sel-shadow-h" label="H-Offset" type="number" suffix="px" bind:value={styling.selFilterDropShadowH} placeholder="0"/>
                                    <WrappedInput id="sel-shadow-v" label="V-Offset" type="number" suffix="px" bind:value={styling.selFilterDropShadowV} placeholder="0"/>
                                    <WrappedInput id="sel-shadow-blur" label="Blur" type="number" suffix="px" bind:value={styling.selFilterDropShadowBlur} placeholder="0"/>
                                    <WrappedInput id="sel-shadow-spread" label="Spread" type="number" suffix="px" bind:value={styling.selFilterDropShadowSpread} placeholder="0"/>
                                    <Label>Shadow Color</Label>
                                    <ColorPicker bind:hex={styling.selFilterDropShadowColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} isAlpha />
                                </div>
                            {/if}
                        </div>
                        <!-- Text Color (Selected) -->
						<div class="flex flex-col gap-y-2 border p-2 rounded">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-sel-text-color-switch">Use Text Color</Label>
								<Checkbox id="styling-sel-text-color-switch" bind:checked={() => styling.selCTextColorIsOn ?? false, (v) => styling.selCTextColorIsOn = v} />
							</div>
							{#if styling.selCTextColorIsOn}
								<ColorPicker bind:hex={styling.selFilterCTextColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} isAlpha />
							{/if}
						</div>
                        <!-- Title Color (Selected) -->
						<div class="flex flex-col gap-y-2 border p-2 rounded">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-sel-title-color-switch">Use Title Color</Label>
								<Checkbox id="styling-sel-title-color-switch" bind:checked={() => styling.selCTitleColorIsOn ?? false, (v) => styling.selCTitleColorIsOn = v} />
							</div>
							{#if styling.selCTitleColorIsOn}
								<ColorPicker bind:hex={styling.selFilterCTitleColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} isAlpha />
							{/if}
						</div>
					</div>
				</div>
			</div>
			<Separator class="my-4"/>
			<!-- Unavailable Object Filter -->
			<div>
				<h5>Filter on Choice that is missing its required</h5>
			</div>
			<Separator />
			<div class="mb-5">
				<div class="flex flex-row justify-around flex-wrap">
                    <!-- Filter Effects (Left Side) -->
					<div class="grid grid-flow-col grid-rows-3 gap-x-2 gap-y-2 mb-4 md:mb-0">
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
                    <!-- Appearance Overrides (Right Side) -->
					<div class="flex flex-col gap-y-2 w-full md:w-auto">
                        <!-- Background Image (Unavailable) -->
						<div class="flex flex-col gap-y-2 border p-2 rounded">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-req-bg-image-switch">Use Image Background</Label>
								<Checkbox id="styling-req-bg-image-switch" bind:checked={() => styling.reqFilterBgImageIsOn ?? false, (v) => styling.reqFilterBgImageIsOn = v} disabled={styling.reqFilterVisibleIsOn} />
							</div>
							{#if styling.reqFilterBgImageIsOn && !styling.reqFilterVisibleIsOn}
								<div class="flex flex-col gap-y-2 pl-4">
                                    {#if !styling.reqFilterBgImages}{@const _ = styling.reqFilterBgImages = []}{/if}
									{#each reqImageInputs as image, index (index)}
										<div class="flex flex-row items-center gap-x-2">
											<WrappedImageInput id="unavailable-bg-image-input-{index}" label={`Image ${index + 1}`} bind:value={reqImageInputs[index]} />
											<Button variant="destructive" size="sm" onclick={() => removeReqImageInput(index)}>X</Button>
										</div>
									{/each}
									{#if reqImageInputs.length < 10}
										<Button variant="outline" size="sm" onclick={addReqImageInput}> Add Image </Button>
									{/if}
									{#if reqImageInputs.length > 0 && reqImageInputs[0]}
                                        <div class="flex flex-row items-center gap-x-1">
											<Label for="styling-req-bg-image-opacity">Image Opacity</Label>
											<Input class="max-w-24" id="styling-req-bg-image-opacity" type="number" min="0" max="100" bind:value={styling.reqFilterBgImageOpacity}/>
											<span>%</span>
										</div>
										<div class="flex flex-row items-center gap-x-1">
											<Label for="styling-req-bg-image-position">Image Position</Label>
											<Input class="max-w-36" id="styling-req-bg-image-position" placeholder="e.g., center, 50% 10px" bind:value={styling.reqFilterBgImagePosition} />
										</div>
										<div class="flex flex-row items-center gap-x-1">
											<Label for="styling-req-bg-image-size">Image Size</Label>
											<Input class="max-w-36" id="styling-req-bg-image-size" placeholder="e.g., cover, 100% auto" bind:value={styling.reqFilterBgImageSize} />
										</div>
										<div class="flex flex-row items-center gap-x-1">
											<Label for="styling-req-bg-image-repeat">Image Repeat</Label>
											<select id="styling-req-bg-image-repeat" class="rounded border p-1" bind:value={styling.reqFilterBgImageRepeat}>
												<option value="repeat">Repeat</option> <option value="round">Round</option> <option value="space">Space</option> <option value="no-repeat">No-repeat</option>
											</select>
										</div>
									{/if}
								</div>
							{/if}
						</div>
                        <!-- Background Color (Unavailable) -->
						<div class="flex flex-col gap-y-2 border p-2 rounded">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-req-bg-color-switch">Use Background Color</Label>
								<Checkbox id="styling-req-bg-color-switch" bind:checked={() => styling.reqBgColorIsOn ?? false, (v) => styling.reqBgColorIsOn = v} disabled={styling.reqFilterVisibleIsOn} />
							</div>
							{#if styling.reqBgColorIsOn && !styling.reqFilterVisibleIsOn}
								<ColorPicker bind:hex={styling.reqFilterBgColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} isAlpha />
							{/if}
						</div>
                        <!-- Drop Shadow (Unavailable) -->
                        <div class="flex flex-col gap-y-2 border p-2 rounded">
                            <div class="flex flex-row items-center gap-x-1">
                                <Label for="styling-req-shadow-switch">Use Drop Shadow Override</Label>
                                <Checkbox id="styling-req-shadow-switch" bind:checked={() => styling.reqFilterDropShadowIsOn ?? false, (v) => styling.reqFilterDropShadowIsOn = v} disabled={styling.reqFilterVisibleIsOn} />
                            </div>
                            {#if styling.reqFilterDropShadowIsOn && !styling.reqFilterVisibleIsOn}
                                <div class="pl-4 flex flex-col gap-y-1">
                                    <WrappedInput id="req-shadow-h" label="H-Offset" type="number" suffix="px" bind:value={styling.reqFilterDropShadowH} placeholder="0"/>
                                    <WrappedInput id="req-shadow-v" label="V-Offset" type="number" suffix="px" bind:value={styling.reqFilterDropShadowV} placeholder="0"/>
                                    <WrappedInput id="req-shadow-blur" label="Blur" type="number" suffix="px" bind:value={styling.reqFilterDropShadowBlur} placeholder="0"/>
                                    <WrappedInput id="req-shadow-spread" label="Spread" type="number" suffix="px" bind:value={styling.reqFilterDropShadowSpread} placeholder="0"/>
                                    <Label>Shadow Color</Label>
                                    <ColorPicker bind:hex={styling.reqFilterDropShadowColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} isAlpha />
                                </div>
                            {/if}
                        </div>
                        <!-- Text Color (Unavailable) -->
						<div class="flex flex-col gap-y-2 border p-2 rounded">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-req-text-color-switch">Use Text Color</Label>
								<Checkbox id="styling-req-text-color-switch" bind:checked={() => styling.reqCTextColorIsOn ?? false, (v) => styling.reqCTextColorIsOn = v} disabled={styling.reqFilterVisibleIsOn} />
							</div>
							{#if styling.reqCTextColorIsOn && !styling.reqFilterVisibleIsOn}
								<ColorPicker bind:hex={styling.reqFilterCTextColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} isAlpha />
							{/if}
						</div>
                        <!-- Title Color (Unavailable) -->
						<div class="flex flex-col gap-y-2 border p-2 rounded">
							<div class="flex flex-row items-center gap-x-1">
								<Label for="styling-req-title-color-switch">Use Title Color</Label>
								<Checkbox id="styling-req-title-color-switch" bind:checked={() => styling.reqCTitleColorIsOn ?? false, (v) => styling.reqCTitleColorIsOn = v} disabled={styling.reqFilterVisibleIsOn} />
							</div>
							{#if styling.reqCTitleColorIsOn && !styling.reqFilterVisibleIsOn}
								<ColorPicker bind:hex={styling.reqFilterCTitleColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} isAlpha />
							{/if}
						</div>
					</div>
				</div>
                <!-- Hide Completely -->
				<div class="flex w-full flex-col items-center mt-4 border-t pt-4">
					<div class="flex flex-row items-center gap-x-1">
						<Label for="styling-req-filter-visible-switch">Hide The Choice Completely When Unavailable</Label>
						<Switch id="styling-req-filter-visible-switch" bind:checked={() => styling.reqFilterVisibleIsOn ?? false, (v) => styling.reqFilterVisibleIsOn = v} />
					</div>
				</div>
			</div>
		</div>
	</div>
</WrappedStyle>