<script lang="ts">
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';
	import { app } from '$lib/store/store.svelte';
	import type { Object, Row } from '$lib/store/types';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';

	const {
		open,
		onclose,
		embedded
	}: {
		open: boolean;
		onclose: () => void;
		from?: 'private';
		obj?: Object | Row;
		embedded?: boolean;
	} = $props();

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

<WrappedStyle title="Point Bar" {open} {onclose} {embedded} class="sm:max-w-[600px]">
	<div class="mx-auto grid w-max grid-cols-2 gap-4 py-4">
		<div class="flex flex-col gap-y-2">
			<div class="flex flex-col gap-y-2 px-[10px]">
				<h6>Style of text inside the point-bar</h6>
				<WrappedInput
					label="Bar Text Padding"
					bind:value={app.styling.barTextPadding}
					suffix="px"
					type="number"
				/>
				<WrappedInput
					label="Bar Text Margin"
					bind:value={app.styling.barTextMargin}
					suffix="px"
					type="number"
				/>
				<WrappedSelect
					label="Text Font"
					bind:value={app.styling.barTextFont}
					items={textFonts}
					placeholder="Text Font"
				/>
			</div>
			<div class="flex flex-col gap-y-1">
				<h6>Bar Text Color</h6>
				<ColorPicker
					bind:hex={() => app.styling.barTextColor ?? '#000000',
					(v) => (app.styling.barTextColor = v)}
					components={ChromeVariant}
					sliderDirection="horizontal"
					isDialog={false}
					isAlpha
				/>
			</div>
			<div class="flex flex-col gap-y-1">
				<h6>Bar Points Color Positive</h6>
				<ColorPicker
					bind:hex={() => app.styling.barPointPos?.hex ?? '#000000',
					(v) =>
						(app.styling.barPointPos = {
							hex: v,
							alpha: 0,
							hexa: '',
							hsla: {
								h: 0,
								s: 0,
								l: 0,
								a: 0
							},
							hsva: {
								h: 0,
								s: 0,
								v: 0,
								a: 0
							},
							hue: 0,
							rgba: {
								r: 0,
								g: 0,
								b: 0,
								a: 0
							}
						})}
					components={ChromeVariant}
					sliderDirection="horizontal"
					isDialog={false}
					isAlpha
				/>
			</div>
		</div>
		<div class="flex flex-col gap-y-2">
			<div class="flex flex-col gap-y-2 px-[10px]">
				<h6>Style of the bar itself</h6>
				<WrappedInput
					label="Bar Padding"
					bind:value={app.styling.barPadding}
					suffix="px"
					type="number"
				/>
				<WrappedInput
					label="Bar Margin"
					bind:value={app.styling.barMargin}
					suffix="px"
					type="number"
				/>
				<WrappedInput
					label="Bar Text Size"
					bind:value={app.styling.barTextSize}
					suffix="px"
					type="number"
				/>
			</div>
			<div class="flex flex-col gap-y-1">
				<h6>Bar Background Color</h6>
				<ColorPicker
					bind:hex={() => app.styling.barBackgroundColor ?? '#FFFFFFFF',
					(v) => (app.styling.barBackgroundColor = v)}
					components={ChromeVariant}
					sliderDirection="horizontal"
					isDialog={false}
					isAlpha
				/>
			</div>
			<div class="flex flex-col gap-y-1">
				<h6>Bar Points Color Negative</h6>
				<ColorPicker
					bind:hex={() => app.styling.barPointNeg?.hex ?? '#000000',
					(v) =>
						(app.styling.barPointNeg = {
							hex: v,
							alpha: 0,
							hexa: '',
							hsla: {
								h: 0,
								s: 0,
								l: 0,
								a: 0
							},
							hsva: {
								h: 0,
								s: 0,
								v: 0,
								a: 0
							},
							hue: 0,
							rgba: {
								r: 0,
								g: 0,
								b: 0,
								a: 0
							}
						})}
					components={ChromeVariant}
					sliderDirection="horizontal"
					isDialog={false}
					isAlpha
				/>
			</div>
		</div>
	</div>
</WrappedStyle>
