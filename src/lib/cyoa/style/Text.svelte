<script lang="ts">
	import { app } from '$lib/store/store.svelte';
	import type { Object, Row } from '$lib/store/types';
	import { Separator } from '$lib/components/ui/separator';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
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

	const styling = $derived(from === 'private' ? (obj?.styling ?? app.styling) : app.styling);
	const textAlignment = [
		{ name: 'Center', value: 'center' },
		{ name: 'Left', value: 'left' },
		{ name: 'Right', value: 'right' },
		{ name: 'Justify', value: 'justify' }
	];
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

{#snippet TextContent(
	id: string,
	name: string,
	fontKey: keyof typeof app.styling,
	sizeKey: keyof typeof app.styling,
	alignKey: keyof typeof app.styling,
	colorKey: keyof typeof app.styling
)}
	<div class="flex flex-col gap-y-2">
		<span class="text-lg font-semibold">{name}</span>
		<Separator />
		<WrappedSelect
			label="Text Font"
			bind:value={styling[fontKey as keyof typeof styling] as string}
			items={textFonts}
			placeholder="Select Font"
		/>
		<WrappedInput
			label="Text Size"
			bind:value={styling[sizeKey as keyof typeof styling] as string}
			type="number"
		/>
		<WrappedSelect
			label="Text Alignment"
			bind:value={styling[alignKey as keyof typeof styling] as string}
			items={textAlignment}
			placeholder="Select Alignment"
		/>
		<ColorPicker
			bind:hex={() => (styling[colorKey as keyof typeof styling] as string) ?? '000000',
			(v) =>
				((styling as unknown as { [k in keyof typeof styling]: string })[
					colorKey as keyof typeof styling
				] = v as string)}
			components={ChromeVariant}
			sliderDirection="horizontal"
			isDialog={false}
			isAlpha
		/>
	</div>
{/snippet}

<WrappedStyle
	title="Text"
	{open}
	{onclose}
	{embedded}
	class="max-h-screen overflow-y-auto sm:max-w-[1300px]"
>
	<div class="grid gap-4 py-4">
		<div class="flex flex-row flex-wrap justify-center gap-x-8 gap-y-8">
			{@render TextContent(
				'rowTitle',
				'Row Title',
				'rowTitle',
				'rowTitleTextSize',
				'rowTitleAlign',
				'rowTitleColor'
			)}
			{@render TextContent(
				'rowText',
				'Row Text',
				'rowText',
				'rowTextTextSize',
				'rowTextAlign',
				'rowTextColor'
			)}
			{@render TextContent(
				'objectTitle',
				'Choice Title',
				'objectTitle',
				'objectTitleTextSize',
				'objectTitleAlign',
				'objectTitleColor'
			)}
			{@render TextContent(
				'objectText',
				'Choice Text',
				'objectText',
				'objectTextTextSize',
				'objectTextAlign',
				'objectTextColor'
			)}
			{@render TextContent(
				'addonTitle',
				'Addon Title',
				'addonTitle',
				'addonTitleTextSize',
				'addonTitleAlign',
				'addonTitleColor'
			)}
			{@render TextContent(
				'addonText',
				'Addon Text',
				'addonText',
				'addonTextTextSize',
				'addonTextAlign',
				'addonTextColor'
			)}
			{#if (styling as unknown as { scoreText: string }).scoreText !== undefined}
				{@render TextContent(
					'scoreText',
					'Score and Requirement Text',
					'scoreText',
					'scoreTextSize',
					'scoreTextAlign',
					'scoreTextColor'
				)}
			{/if}
		</div>
	</div>
</WrappedStyle>
