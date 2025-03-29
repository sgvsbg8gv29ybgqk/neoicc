<script lang="ts">
	import type { Object } from '$lib/store/types';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { app } from '$lib/store/store.svelte';
	import { generateID } from '$lib/store/utils';
	import { Switch } from '$lib/components/ui/switch';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Filter from '../style/Filter.svelte';
	import Text from '../style/Text.svelte';
	import ObjectImage from '../style/ObjectImage.svelte';
	import Background from '../style/Background.svelte';
	import ObjectDesign from '../style/ObjectDesign.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';

	const { open, onclose, obj }: { open: boolean; onclose: () => void; obj: Object } = $props();

	let modal = $state<
		'none' | 'appFilter' | 'appText' | 'appObjectImage' | 'appBackground' | 'appObjectDesign'
	>('none');

	function mergeObject() {
		for (const row of app.rows) {
			if (row.id === newRow) {
				row.objects.push(JSON.parse(JSON.stringify(obj)));
				row.objects[row.objects.length - 1].id = generateID();
			}
		}
	}

	let newRow = $state('');
</script>

{#snippet TooltipButton(btnText: string, navModal: typeof modal, tooltipText: string)}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger
				onclick={() => (modal = navModal)}
				class={buttonVariants({
					variant: 'default',
					size: 'default'
				})}
			>
				{btnText}
			</Tooltip.Trigger>
			<Tooltip.Content>
				<span>{tooltipText}</span>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/snippet}

<Dialog.Root bind:open={() => open, (v) => !v && onclose()}>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Object Settings</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="flex flex-col gap-y-2">
				<WrappedSelect
					label="Copy Choice Into Another Row"
					bind:value={newRow}
					items={app.rows.map((row) => ({ value: row.id, name: row.title }))}
					placeholder="Select a row"
				/>
				<Button onclick={() => mergeObject()}>Copy</Button>
			</div>
			<div class="flex flex-col gap-y-2">
				<div class="flex flex-row items-center gap-x-1">
					<Switch
						id="object-private-styling-switch"
						bind:checked={() => obj.isPrivateStyling ?? false,
						(v) => {
							if (v) obj.styling = JSON.parse(JSON.stringify(app.styling));
							obj.isPrivateStyling = v;
							if (obj.styling) {
								obj.styling.backgroundImage = '';
								obj.styling.rowBackgroundImage = '';
								obj.styling.rowBorderImage = '';
							}
						}}
					/>
					<Label for="object-private-styling-switch">Use Private Styling?</Label>
				</div>
				{#if obj.isPrivateStyling}
					<div class="flex flex-row flex-wrap gap-x-2 gap-y-2">
						{@render TooltipButton(
							'Manage Filter Design',
							'appFilter',
							'Here you can change the filters for choices that are selected and the ones you dont have the requirements for.'
						)}
						{@render TooltipButton(
							'Manage Text Design',
							'appText',
							'Here you can change the size, font and color of the text on titles and text.'
						)}
						{@render TooltipButton(
							'Manage Choices Image Design',
							'appObjectImage',
							'Here you can change the margin and padding of images on rows and objects.'
						)}
						{@render TooltipButton(
							'Manage Background Design',
							'appBackground',
							'Here you can change the color and place images in the background of rows, choices and the whole project.'
						)}
						{@render TooltipButton(
							'Manage Choice Design',
							'appObjectDesign',
							'Here you can change the margin, padding, borders, and drop-shadow on choices.'
						)}
					</div>
				{/if}
			</div>
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Filter open={modal === 'appFilter'} onclose={() => (modal = 'none')} from="private" {obj} />
<Text open={modal === 'appText'} onclose={() => (modal = 'none')} from="private" {obj} />
<ObjectImage
	open={modal === 'appObjectImage'}
	onclose={() => (modal = 'none')}
	from="private"
	{obj}
/>
<Background
	open={modal === 'appBackground'}
	onclose={() => (modal = 'none')}
	from="private"
	{obj}
/>
<ObjectDesign
	open={modal === 'appObjectDesign'}
	onclose={() => (modal = 'none')}
	from="private"
	{obj}
/>
