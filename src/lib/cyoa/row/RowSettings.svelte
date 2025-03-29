<script lang="ts">
	import type { Row } from '$lib/store/types';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import Filter from '../style/Filter.svelte';
	import Text from '../style/Text.svelte';
	import ObjectImage from '../style/ObjectImage.svelte';
	import Background from '../style/Background.svelte';
	import ObjectDesign from '../style/ObjectDesign.svelte';
	import RowDesign from '../style/RowDesign.svelte';
	import RowImage from '../style/RowImage.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import { app } from '$lib/store/store.svelte';
	import { generateID } from '$lib/store/utils';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import DOMPurify from 'dompurify';

	const { open, onclose, row }: { open: boolean; onclose: () => void; row: Row } = $props();

	let modal = $state<
		| 'none'
		| 'appFilter'
		| 'appText'
		| 'appObjectImage'
		| 'appBackground'
		| 'appObjectDesign'
		| 'appRowDesign'
		| 'appRowImage'
	>('none');

	let sortType = $state<'1' | '2' | '3' | '4'>('1');
	let newRow = $state('');
	const sort = [
		{ name: 'Object Width - Biggest to smallest.', value: '1' },
		{ name: 'Object Width - Smallest to Biggest.', value: '2' },
		{ name: 'Text Length - Longest to Shortest.', value: '3' },
		{ name: 'Text Length - Shortest to Longest.', value: '4' }
	];

	/**
	 * Copies the objects of the row into another row.
	 */
	function mergeRow() {
		for (const row2 of app.rows) {
			if (row2.id === newRow) {
				for (const obj of row.objects) {
					row2.objects.push(JSON.parse(JSON.stringify(obj)));
					row2.objects[row2.objects.length - 1].id = generateID();
				}
			}
		}
	}

	/**
	 * Copies the objects of the row into another row.
	 * And then deletes this row.
	 */
	function mergeAndDeleteRow() {
		for (const row2 of app.rows) {
			if (row.id != newRow && row2.id == newRow) {
				for (const obj of row.objects) {
					row2.objects.push(obj);
				}
				app.rows.splice(app.rows.indexOf(row), 1);
				onclose();
				break;
			}
		}
	}

	function sortRowObjects() {
		const rowObjectWidth = parseInt(row.objectWidth.replace(/\D/g, ''));
		if (sortType == '1') {
			// If the user want to sort the objects after size
			row.objects.sort(function (a, b) {
				let keyA, keyB;
				if (b.objectWidth != '') {
					keyB = parseInt(b.objectWidth.replace(/\D/g, ''));
				} else {
					keyB = rowObjectWidth;
				}
				if (a.objectWidth != '') {
					keyA = parseInt(a.objectWidth.replace(/\D/g, ''));
				} else {
					keyA = rowObjectWidth;
				}
				// Compare the 2 dates
				if (keyA > keyB) return -1;
				if (keyA < keyB) return 1;
				return 0;
			});
		} else if (sortType == '2') {
			// If the user want to sort the objects after reverse size.
			row.objects.sort(function (a, b) {
				let keyA, keyB;
				if (b.objectWidth != '') {
					keyB = parseInt(b.objectWidth.replace(/\D/g, ''));
				} else {
					keyB = rowObjectWidth;
				}
				if (a.objectWidth != '') {
					keyA = parseInt(a.objectWidth.replace(/\D/g, ''));
				} else {
					keyA = rowObjectWidth;
				}
				// Compare the 2 dates
				if (keyA < keyB) return -1;
				if (keyA > keyB) return 1;
				return 0;
			});
		} else if (sortType == '3') {
			// If the user wants to sort the objects after text length.
			row.objects.sort(function (a, b) {
				let keyA = a.text.length;
				let keyB = b.text.length;
				// Compare the 2 dates
				if (keyA > keyB) return -1;
				if (keyA < keyB) return 1;
				return 0;
			});
		} else if (sortType == '4') {
			// If the user
			row.objects.sort(function (a, b) {
				let keyA = a.text.length;
				let keyB = b.text.length;
				// Compare the 2 dates
				if (keyA < keyB) return -1;
				if (keyA > keyB) return 1;
				return 0;
			});
		}
	}

	const buttons = [
		{
			component: 'appFilter',
			text: 'Manage Filter Design',
			tooltip:
				"Here you can change the filters for choices that are selected<br />and the one's you dont have the requirements for."
		},
		{
			component: 'appText',
			text: 'Manage Text Design',
			tooltip: 'Here you can change the size, font and<br />color of the text on titles and text.'
		},
		{
			component: 'appObjectImage',
			text: 'Manage Choices Image Design',
			tooltip: 'Here you can change the margin and padding <br />of images on rows and objects.'
		},
		{
			component: 'appRowImage',
			text: 'Manage Row Image Design',
			tooltip: 'Here you can change the margin and padding <br />of images on rows and objects.'
		},
		{
			component: 'appBackground',
			text: 'Manage Background Design',
			tooltip:
				'Here you can change the color and place images in <br />the background of rows, choices and the whole project.'
		},
		{
			component: 'appRowDesign',
			text: 'Manage Row Design',
			tooltip: 'Here you can change the margin, <br />padding, borders, and drop-shadow on rows.'
		},
		{
			component: 'appObjectDesign',
			text: 'Manage Choice Design',
			tooltip: 'Here you can change the margin, <br />padding, borders, and drop-shadow on choices.'
		}
	] as const;
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Row Settings</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-6 py-4">
			<div class="flex flex-col gap-y-2">
				<WrappedSelect
					label="Sort The Choices In The Row"
					items={sort}
					placeholder="Sort By..."
					bind:value={sortType}
				/>
				<Button onclick={() => sortRowObjects()}>Sort</Button>
			</div>
			<div class="flex flex-col gap-y-2">
				<WrappedSelect
					label="Copy Choices Into Another Row"
					items={app.rows.map((r) => ({ name: r.title, value: r.id }))}
					placeholder="Copy this row's objects into..."
					bind:value={newRow}
				/>
				<div class="flex w-full flex-row gap-x-2">
					<Button class="w-full" onclick={() => mergeRow()}>Copy</Button>
					<Button class="w-full" onclick={() => mergeAndDeleteRow()}>Copy and Delete</Button>
				</div>
			</div>
			<div>
				<WrappedSelect
					label="All Choices in Row is Members of This Group"
					items={app.groups.map((g) => ({ name: g.name, value: g.id }))}
					placeholder="All Rows and Objects"
					bind:value={row.resultGroupId}
				/>
			</div>
			{#if app.styling.objectImgObjectFillIsOn || (row.isPrivateStyling && row.styling.objectImgObjectFillIsOn)}
				<div>
					<WrappedInput
						label="Height of the image container"
						type="number"
						suffix="px"
						bind:value={row.styling.objectImgObjectFillHeight}
					/>
				</div>
			{/if}
			<div>
				<div class="flex flex-row items-center gap-x-1">
					<Switch
						id="row-settings-is-private-styling"
						bind:checked={() => row.isPrivateStyling,
						(v) => {
							if (v) {
								row.styling = JSON.parse(JSON.stringify(app.styling));
								row.styling.backgroundImage = '';
							}
							row.isPrivateStyling = v;
						}}
					/>
					<Label for="row-settings-is-private-styling">Use private styling?</Label>
				</div>
			</div>
			{#if row.isPrivateStyling}
				<div class="grid grid-cols-2 gap-2">
					{#each buttons as button}
						<div>
							<Tooltip.Provider>
								<Tooltip.Root>
									<Tooltip.Trigger
										class={[buttonVariants(), 'w-full']}
										onclick={() => (modal = button.component)}
									>
										{button.text}
									</Tooltip.Trigger>
									<Tooltip.Content>
										<span>
											<!-- eslint-disable-next-line svelte/no-at-html-tags -->
											{@html DOMPurify.sanitize(button.tooltip)}
										</span>
									</Tooltip.Content>
								</Tooltip.Root>
							</Tooltip.Provider>
						</div>
					{/each}
				</div>
			{/if}
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Filter open={modal === 'appFilter'} onclose={() => (modal = 'none')} obj={row} from="private" />
<Text open={modal === 'appText'} onclose={() => (modal = 'none')} obj={row} from="private" />
<ObjectImage
	open={modal === 'appObjectImage'}
	onclose={() => (modal = 'none')}
	obj={row}
	from="private"
/>
<Background
	open={modal === 'appBackground'}
	onclose={() => (modal = 'none')}
	obj={row}
	from="private"
/>
<ObjectDesign
	open={modal === 'appObjectDesign'}
	onclose={() => (modal = 'none')}
	obj={row}
	from="private"
/>
<RowDesign
	open={modal === 'appRowDesign'}
	onclose={() => (modal = 'none')}
	obj={row}
	from="private"
/>
<RowImage
	open={modal === 'appRowImage'}
	onclose={() => (modal = 'none')}
	obj={row}
	from="private"
/>
