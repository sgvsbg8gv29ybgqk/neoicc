<script lang="ts">
	import { app, appMetaState } from '$lib/store/store.svelte';
	import type { App, Object, Row } from '$lib/store/types';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { generateID, getImageURL, pi } from '$lib/store/utils';
	import { type Icon as LucideIcon, FilePlus2, KeyRound, List, Settings } from 'lucide-svelte';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import ObjectRequirement from './object/ObjectRequirement.svelte';
	import ObjectList from './row/ObjectList.svelte';
	import Requirement from './row/Requirement.svelte';
	import RowSettings from './row/RowSettings.svelte';
	import ImageUpload from './row/ImageUpload.svelte';
	import ButtonSettings from './row/ButtonSettings.svelte';
	import AppObject from './Object.svelte';
	import { checkIfDeselect, checkRequireds, handleButtonActivate } from '$lib/store/actions';
	import DOMPurify from 'dompurify';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';

	const { row, type, isCreator }: { row: Row; type: string; isCreator: boolean } = $props();

	const isEditModeOn = $derived(row.isEditModeOn);
	let modal = $state<
		| 'none'
		| 'appObjectList'
		| 'appRequirement'
		| 'appRowSettings'
		| 'appImageUpload'
		| 'appButtonSettings'
	>('none');

	const widthMap = {
		'w-100': 100 / 1,
		'w-50': 100 / 2,
		'w-33': 100 / 3,
		'w-25': 100 / 4,
		'w-20': 100 / 5,
		'w-16': 100 / 6,
		'w-14': 100 / 7,
		'w-12': 100 / 8,
		'w-11': 100 / 9,
		'w-10': 100 / 10,
		'w-9': 100 / 11,
		'w-8': 100 / 12
	};

	const styling: typeof row.styling & Partial<typeof app.styling> = $derived(
		row.isPrivateStyling ? row.styling : app.styling
	);

	const borderRadiusSuffix = $derived(styling.rowBorderRadiusIsPixels ? 'px' : '%');
	const rowImageBorderRadiusSuffix = $derived(styling.rowImgBorderRadiusIsPixels ? 'px' : '%');

	const rowTitle = $derived.by(() => {
		let newObjectText = row.title;
		let isPointType = false;

		// TODO Add point type if it is.

		if (typeof app.words != 'undefined') {
			// Checks if the word is the ID of a point-type.
			for (const word of app.words) {
				isPointType = false;

				for (const pointType of app.pointTypes) {
					if (pointType.id === word.id) {
						newObjectText = newObjectText.replace(
							new RegExp(word.id, 'g'),
							pointType.startingSum.toString()
						);
						isPointType = true;
					}
				} // If its not a point-type.
				if (!isPointType) {
					for (const word of app.words) {
						newObjectText = newObjectText.replace(new RegExp(word.id, 'g'), word.replaceText);
					}
				}
			}
		}
		return newObjectText;
	});

	function parseColSpan(colSpan: string): number {
		const split = colSpan.split('-');
		if (split.length === 2) {
			if (split[0] !== 'col') return -1;
			const span = parseInt(split[1]);
			if (isNaN(span)) return -1;
			return span;
		} else if (split.length === 3) {
			if (split[0] !== 'col') return -1;
			const span = parseInt(split[2]);
			if (isNaN(span)) return -1;
			return span;
		}
		return -1;
	}

	// Used to find the backpack items in standard only.
	function findAllActiveObjects(obj: App['chapters'][0]['pages'][0], chapter: App['chapters'][0]) {
		const newObjectList: Object[] = [];
		// If the id of child is equal to the redirect end-id.
		for (const row of obj.app.rows) {
			for (const object of row.objects) {
				if (object.isActive) newObjectList.push(object);
			}
		}

		if (obj && obj.children && obj.children.length > 0) {
			// For each child page.
			for (const child of obj.children) newObjectList.push(...findAllActiveObjects(child, chapter));
		}
		return newObjectList;
	}

	const resultArray = $derived.by(() => {
		const objectArray: Object[] = [];

		if (type === 'standard') {
			// For each chapter.
			for (const chapter of app.chapters) {
				// For each page.
				for (const page of chapter.pages) {
					// Check out this page, send in value of end-id.
					objectArray.push(...findAllActiveObjects(page, chapter)); // ID is string like «30»
				}
			}
		} else {
			// If groups are not used.
			if (row.resultGroupId === '' || row.resultGroupId === null) {
				for (const row of app.rows) {
					for (const object of row.objects) {
						// If the object is active.
						if (object.isActive) {
							objectArray.push(object);
						} else if (object.isImageUpload) {
							if (object.image.length > 5) objectArray.push(object);
							// TODO
						} else if (object.isSelectableMultiple) {
							if (typeof object.multipleUseVariable !== 'undefined') {
								if (object.multipleUseVariable > 0) {
									objectArray.push(object);
								}
							}
						}
					}
				}
			} else {
				// For all of the objects in the rows.
				for (const row2 of app.rows) {
					for (const object of row2.objects) {
						// If the object is active...
						if (object.isActive) {
							// Move trough all groups...
							for (const group of object.groups) {
								if (
									row.resultGroupId === row2.resultGroupId &&
									row2 != row &&
									group.id === row2.resultGroupId
								) {
									objectArray.push(object);
								} else {
									for (const group2 of object.groups) {
										if (group2.id === row.resultGroupId && group.id === row.resultGroupId) {
											objectArray.push(object);
										}
									}
								}
							}
						} else if (object.isImageUpload && object.image.length > 5) {
							for (const group of object.groups) {
								if (
									row.resultGroupId === row2.resultGroupId &&
									row2 != row &&
									group.id === row2.resultGroupId
								) {
									objectArray.push(object);
								} else {
									for (const group2 of object.groups) {
										if (group2.id === row.resultGroupId && group.id === row.resultGroupId) {
											objectArray.push(object);
										}
									}
								}
							}
						} else if (object.isSelectableMultiple) {
							// console.log("Mul");
							if (typeof object.multipleUseVariable !== 'undefined') {
								if (object.multipleUseVariable > 0) {
									// Move trough all groups...
									for (const group of object.groups) {
										if (
											row.resultGroupId === row2.resultGroupId &&
											row2 != row &&
											group.id === row2.resultGroupId
										) {
											objectArray.push(object);
										} else {
											for (const group2 of object.groups) {
												if (group2.id === row.resultGroupId && group.id === row.resultGroupId) {
													objectArray.push(object);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return objectArray;
	});

	// The object height, checks if full object height is turned on and edit-mode is off.
	const objectHeight = $derived(styling.objectHeight && !isEditModeOn ? 'flex h-full' : '');

	// The select that decides the template of the row.
	const templates = [
		{ name: 'Image Top', value: '1' },
		{ name: 'Image Right', value: '2' },
		{ name: 'Image Left', value: '3' }, // 5 per row.
		{ name: 'Image Bottom', value: '4' }
	];

	const justify = [
		{ name: 'start', value: 'start' },
		{ name: 'center', value: 'center' },
		{ name: 'end', value: 'end' },
		{ name: 'space-around', value: 'space-around' },
		{ name: 'space-between', value: 'space-between' }
	];
</script>

{#snippet TooltipIconButton(Icon: typeof LucideIcon, text: string, onclick: () => void)}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger {onclick} class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
				<Icon />
			</Tooltip.Trigger>
			<Tooltip.Content>
				<span>{text}</span>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/snippet}

{#snippet RowImage()}
	{#if row.image}
		<div class="relative inline-block">
			<img
				class="inline-block"
				style:width={styling.rowImageWidth + '%'}
				style:margin-top={styling.rowImageMarginTop + '%'}
				style:margin-bottom={styling.rowImageMarginBottom + '%'}
				style:border-radius={`${styling.rowImgBorderRadiusTopLeft}0${rowImageBorderRadiusSuffix} ${styling.rowImgBorderRadiusTopRight}0${rowImageBorderRadiusSuffix} ${styling.rowImgBorderRadiusBottomRight}0${rowImageBorderRadiusSuffix} ${styling.rowImgBorderRadiusBottomLeft}0${rowImageBorderRadiusSuffix}`}
				style:overflow={styling.rowImgOverflowIsOn ? 'hidden' : undefined}
				style:border={styling.rowImgBorderIsOn
					? `${styling.rowImgBorderWidth}px ${styling.rowImgBorderStyle} ${styling.rowImgBorderColor}`
					: undefined}
				src={getImageURL(row.image, appMetaState.imagePrefix)}
				alt="row"
			/>
		</div>
	{:else}
		<div class="inline-block"></div>
	{/if}
{/snippet}

{#snippet RowImageWrapper()}
	{#if !row.isButtonRow && row.imageSourceTooltip !== '' && typeof row.imageSourceTooltip !== 'undefined'}
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
					{@render RowImage()}
				</Tooltip.Trigger>
				<Tooltip.Content>
					<span>{row.imageSourceTooltip}</span>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	{:else if !row.isButtonRow && row.image}
		{@render RowImage()}
	{:else if !row.isButtonRow && !row.image}
		<div class="inline-block"></div>
	{:else}
		<!-- If button is activated -->
		<Button
			class="mb-[5px]"
			disabled={(!row.buttonType && app.activated.includes(row.buttonId)) ||
				(row.onlyIfNoChoices && row.currentChoices !== 0)}
			onclick={() => handleButtonActivate(row)}
			style={`padding-left: ${styling.rowButtonYPadding}px; padding-right: ${styling.rowButtonYPadding}px; padding-top: ${styling.rowButtonXPadding}px; padding-bottom: ${styling.rowButtonXPadding}px; color: black;`}
		>
			{row.buttonText}
		</Button>
	{/if}
{/snippet}

{#snippet RowTextTitle()}
	<div>
		{#if row.title !== ''}
			<h2
				style:font-family={styling.rowTitle}
				style:font-size={styling.rowTitleTextSize + '%'}
				style:text-align={styling.rowTitleAlign}
				style:color={styling.rowTitleColor}
				class="mb-0"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html DOMPurify.sanitize(rowTitle)}
			</h2>
		{/if}
		{#if row.titleText !== ''}
			<p
				class="mb-0 whitespace-pre-line"
				style:font-family={styling.rowText}
				style:font-size={styling.rowTextTextSize + '%'}
				style:text-align={styling.rowTextAlign}
				style:color={styling.rowTextColor}
				style:padding-top={styling.rowTextPaddingX + 'px'}
				style:padding-bottom={styling.rowTextPaddingX + 'px'}
				style:padding-left={!isEditModeOn ? styling.rowTextPaddingY + '%' : null}
				style:padding-right={!isEditModeOn ? styling.rowTextPaddingY + '%' : null}
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html DOMPurify.sanitize(row.titleText)}
			</p>
		{/if}
	</div>
{/snippet}

<div
	class="bg-repeat text-center"
	style:margin-top={styling.rowBodyMarginTop + 'px'}
	style:margin-bottom={styling.rowBodyMarginBottom + 'px'}
	style:margin-left={!isEditModeOn ? styling.rowBodyMarginSides + '%' : '1%'}
	style:margin-right={!isEditModeOn ? styling.rowBodyMarginSides + '%' : '1%'}
	style:background-image={row.isPrivateStyling && styling.backgroundImage
		? `url("${styling.backgroundImage}")`
		: null}
	style:background-color={row.isPrivateStyling ? styling.backgroundColor : null}
	style:background-repeat={row.isPrivateStyling ? 'repeat' : null}
>
	{#if isEditModeOn}
		<div>
			<div class="flex flex-row justify-end rounded-t border bg-gray-200 p-2">
				{@render TooltipIconButton(FilePlus2, 'Create New Object', () => {
					row.objects.push({
						id: generateID(),
						title: app.defaultChoiceTitle,
						text: app.defaultChoiceText,
						image: '',
						template: 1,
						objectWidth: '',
						isActive: false,
						isVisible: true,
						multipleUseVariable: 0,
						selectedThisManyTimesProp: 0,
						defaultAspectWidth: row.defaultAspectWidth,
						defaultAspectHeight: row.defaultAspectHeight,
						requireds: [], // Holds the required's.
						addons: [], // Holds the created addons.
						scores: [], // Holds the created scores.
						groups: []
					});
				})}
				{@render TooltipIconButton(List, 'List of objects', () => {
					modal = 'appObjectList';
				})}
				{@render TooltipIconButton(KeyRound, 'Create Requirement', () => {
					modal = 'appRequirement';
				})}
				{@render TooltipIconButton(Settings, 'Open Row Settings', () => {
					modal = 'appRowSettings';
				})}
			</div>
			<div
				class="flex flex-row flex-wrap justify-around gap-4 rounded-b border-x border-b bg-gray-200 p-2"
			>
				<div class="w-[22%]">
					<!-- The upload of Image -->
					{#if !row.isButtonRow}
						<div class="flex flex-col items-center gap-y-2">
							<div class="w-full relative">
								<button onclick={() => (modal = 'appImageUpload')} class="w-full">
									{#if row.image}
										<img
											class="inline-block h-[270px] w-auto object-contain"
											src={getImageURL(row.image, appMetaState.imagePrefix)}
											alt="row"
											style="max-height: 270px; min-height: 150px;"
										/>
									{:else}
										<div 
											class="h-[270px] w-full flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50"
											style="max-height: 270px; min-height: 150px;"
										>
											<span class="text-gray-500">Set Image</span>
										</div>
									{/if}
								</button>
								{#if row.image}
									<button
										class="absolute top-1 right-1 bg-white/50 hover:bg-white/80 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
										onclick={(e) => {
											e.stopPropagation();
											row.image = '';
										}}
										aria-label="Remove image"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<line x1="18" y1="6" x2="6" y2="18"></line>
											<line x1="6" y1="6" x2="18" y2="18"></line>
										</svg>
									</button>
								{/if}
							</div>
						</div>
					{:else}
						<!-- The button that opens button settings -->
						<Button onclick={() => (modal = 'appButtonSettings')} class="min-w-48">
							Open Button Settings
						</Button>
					{/if}
				</div>
				<div class="flex flex-col gap-y-2">
					<!-- switch that let the user change between an image and button -->
					<div class="flex flex-row items-center gap-x-1">
						<Switch id="button-row-switch-{row.id}" bind:checked={row.isButtonRow} />
						<Label for="button-row-switch-{row.id}">Button?</Label>
					</div>
					<div class="flex flex-row items-center gap-x-1">
						<Switch id="row-info-switch-{row.id}" bind:checked={row.isInfoRow} />
						<Label for="row-info-switch-{row.id}">Non-activatable?</Label>
					</div>
					<div class="flex flex-row items-center gap-x-1">
						<Switch id="row-result-switch-{row.id}" bind:checked={row.isResultRow} />
						<Label for="row-result-switch-{row.id}">Selected Choices?</Label>
					</div>
					<div class="flex flex-row items-center gap-x-1">
						<Switch
							id="width-switch-{row.id}"
							bind:checked={() => row.width ?? false, (v) => (row.width = v)}
						/>
						<Label for="width-switch-{row.id}">Half of the screen?</Label>
					</div>
					{#if row.isResultRow}
						<WrappedSelect
							label="Select Choices From Group ID"
							items={app.groups.map((group) => ({ value: group.id, name: group.name }))}
							bind:value={() => row.resultGroupId ?? '',
							(v) => (row.resultGroupId = v === '' ? null : v)}
							triggerClass="w-[180px]"
							placeholder="Select a Group"
							hasNone={true}
						/>
					{/if}
				</div>
				<div class="flex flex-col gap-y-2">
					<WrappedSelect
						label="Template"
						items={templates}
						bind:value={row.template}
						triggerClass="w-[180px]"
						placeholder="Templates"
					/>
					<WrappedInput
						label="Row Title"
						placeholder="Placeholder"
						bind:value={row.title} 
					/>
					<WrappedInput
						label="Allowed Choices"
						type="number"
						placeholder="Placeholder"
						bind:value={row.allowedChoices} 
					/>
				</div>
				<div class="flex flex-col gap-y-2">
					<WrappedSelect
						label="Objects Per Row"
						items={appMetaState.objectWidths}
						bind:value={row.objectWidth}
						triggerClass="w-[180px]"
						placeholder="Object Widths"
						hasNone={true}
					/>
					<WrappedSelect
						label="Choices Justify"
						items={justify}
						bind:value={row.rowJustify}
						triggerClass="w-[180px]"
						placeholder="Justifies"
						hasNone={true}
					/>
					<WrappedInput label="Row ID" bind:value={row.id} />
					<WrappedInput
						label="Selected Choices"
						type="number"
						bind:value={row.currentChoices}
					/>
				</div>
				<div class="w-[45%]">
					<div class="flex flex-col items-start gap-y-1 w-full">
						<Label for="row-text-textarea-{row.id}">Row Text</Label>
						<Textarea
							id="row-text-textarea-{row.id}"
							bind:value={row.titleText}
							rows={10}
							class="w-full"
						/>
					</div>
				</div>
				<div class="flex w-full flex-row justify-around gap-x-2">
					{#if row.isResultRow}
						<div class="flex flex-row items-center gap-x-1">
							<Switch
								id="deselect-choices-switch-{row.id}"
								bind:checked={() => row.deselectChoices ?? false, (v) => (row.deselectChoices = v)}
							/>
							<Label for="deselect-choices-switch-{row.id}" class="text-left">
								Deselects choices when Row lack requirements?
							</Label>
						</div>
						<div class="flex flex-row items-center gap-x-1">
							<Switch
								id="choices-share-template-switch-{row.id}"
								bind:checked={() => row.choicesShareTemplate ?? false,
								(v) => (row.choicesShareTemplate = v)}
							/>
							<Label for="choices-share-template-switch-{row.id}" class="text-left">
								Choices will all be 'Template Top' and Row Width
							</Label>
						</div>
						<div class="flex flex-row items-center gap-x-1">
							<Switch
								id="text-is-removed-switch-{row.id}"
								bind:checked={() => row.textIsRemoved ?? false, (v) => (row.textIsRemoved = v)}
							/>
							<Label for="text-is-removed-switch-{row.id}" class="text-left">
								Remove the text of the choices.
							</Label>
						</div>
						<div class="flex flex-row items-center gap-x-1">
							<Switch
								id="result-show-row-title-switch-{row.id}"
								bind:checked={() => row.resultShowRowTitle ?? false,
								(v) => (row.resultShowRowTitle = v)}
							/>
							<Label for="result-show-row-title-switch-{row.id}" class="text-left">
								Show the title of the row in the choice.
							</Label>
						</div>
					{/if}
				</div>
			</div>
			<div class="flex flex-row flex-wrap justify-around">
				<!-- Shows the requirements, allows the user to delete or change its id -->
				{#each row.requireds as required, index}
					<div>
						<ObjectRequirement {required} obj={row} />
						<Button onclick={() => row.requireds.splice(index, 1)}>Delete</Button>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<!-- Preview and editable objects -->
	{#if isCreator || checkIfDeselect(row)}
		<div>
			<!-- The templates of the preview, show if !isEditModeOn and all requireds is selected. -->
			{#if !isCreator || (!isEditModeOn && checkIfDeselect(row))}
				<div
					class={[
						row.title !== '' && 'bg-repeat',
						row.title !== '' && styling.rowOverflowIsOn && 'overflow-hidden'
					]}
					style:border-image={row.title !== '' && styling.rowBorderImage
						? `url("${styling.rowBorderImage}") ${styling.rowBorderImageSliceTop} ${styling.rowBorderImageSliceRight} ${styling.rowBorderImageSliceBottom} ${styling.rowBorderImageSliceLeft} / ${styling.rowBorderImageWidth}px ${styling.rowBorderImageRepeat}`
						: null}
					style:padding={row.title !== '' && styling.rowBorderImage
						? `${styling.rowBorderImageWidth}px !important`
						: null}
					style:border-style={row.title !== '' && styling.rowBorderImage ? 'solid' : null}
					style:background-image={row.title !== ''
						? styling.rowGradientIsOn
							? `linear-gradient("${styling.rowGradient}")`
							: styling.rowBackgroundImage
								? `url("${styling.rowBackgroundImage}")`
								: null
						: null}
					style:background-repeat={row.title !== '' &&
					!styling.rowGradientIsOn &&
					styling.rowBackgroundImage
						? 'repeat'
						: null}
					style:background-color={row.title !== '' && styling.rowBgColorIsOn
						? styling.rowBgColor
						: null}
					style:margin-left={row.title !== '' ? styling.rowMargin + '%' : null}
					style:margin-right={row.title !== '' ? styling.rowMargin + '%' : null}
					style:border-radius={row.title !== ''
						? `${styling.rowBorderRadiusTopLeft}0${borderRadiusSuffix} ${styling.rowBorderRadiusTopRight}0${borderRadiusSuffix} ${styling.rowBorderRadiusBottomRight}0${borderRadiusSuffix} ${styling.rowBorderRadiusBottomLeft}0${borderRadiusSuffix}`
						: null}
					style:border={row.title !== '' && styling.rowBorderIsOn
						? `${styling.rowBorderWidth}px ${styling.rowBorderStyle} ${styling.rowBorderColor}`
						: null}
					style:filter={row.title !== '' && styling.rowDropShadowIsOn
						? `drop-shadow(${styling.rowDropShadowH}px ${styling.rowDropShadowV}px ${styling.rowDropShadowBlur}px ${styling.rowDropShadowColor})`
						: null}
				>
					<!-- The div that will show off the preview -->
					{#if pi(row.template) === 1 || innerWidth < 1000}
						<div>
							{@render RowImageWrapper()}
							{@render RowTextTitle()}
						</div>
					{:else if pi(row.template) === 2 && innerWidth > 1000}
						<div class="grid grid-cols-2">
							{@render RowTextTitle()}
							{@render RowImageWrapper()}
						</div>
					{:else if pi(row.template) === 3}
						<div class="grid grid-cols-2">
							{@render RowImageWrapper()}
							{@render RowTextTitle()}
						</div>
					{:else if pi(row.template) === 4}
						<div>
							{@render RowTextTitle()}
							{@render RowImageWrapper()}
						</div>
					{/if}
				</div>
			{/if}
			<!-- Where the object-components are created and listed. -->
			{#if !row.isResultRow}
				<div class="m-0 flex flex-row flex-wrap p-0" style:justify-content={row.rowJustify}>
					<!-- If objectWidth in the object is empty, use the row.objectWidth -->
					{#each row.objects as object}
						{@const widthClass = object.objectWidth || row.objectWidth}
						{@const span = parseColSpan(widthClass)}
						{@const widthPercentage =
							innerWidth <= 500
								? 100
								: innerWidth <= 1000
									? 50
									: span !== -1
										? (100 / 12) * span
										: widthMap[widthClass as keyof typeof widthMap]}
						{#if (isCreator && isEditModeOn) || checkRequireds(object) || (object.isPrivateStyling ? !object.styling?.reqFilterVisibleIsOn : !styling.reqFilterVisibleIsOn)}
							<div
								style:flex={`0 0 ${widthPercentage}%`}
								style:max-width={`${widthPercentage}%`}
								class="w-full"
							>
								<AppObject class={objectHeight} {object} {row} {isCreator} {isEditModeOn} />
							</div>
						{/if}
					{/each}
				</div>
			{:else}
				<!-- Where the object-components are created and listed. -->
				<!-- If objectWidth in the object is empty, use the row.objectWidth -->
				<div class="flex flex-row flex-wrap" style:justify-content={row.rowJustify}>
					{#each resultArray as object}
						{@const widthClass =
							object.objectWidth === '' || row.choicesShareTemplate
								? row.objectWidth
								: object.objectWidth}
						{@const span = parseColSpan(widthClass)}
						{@const widthPercentage =
							innerWidth <= 500
								? 100
								: innerWidth <= 1000
									? 50
									: span !== -1
										? (100 / 12) * span
										: widthMap[widthClass as keyof typeof widthMap]}
						<div
							class="w-full"
							style:flex={`0 0 ${widthPercentage}%`}
							style:max-width={`${widthPercentage}%`}
						>
							<AppObject class={objectHeight} {object} {row} {isCreator} {isEditModeOn} />
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
	<ObjectList open={modal === 'appObjectList'} onclose={() => (modal = 'none')} {row} />
	<Requirement open={modal === 'appRequirement'} onclose={() => (modal = 'none')} obj={row} />
	<RowSettings open={modal === 'appRowSettings'} onclose={() => (modal = 'none')} {row} />
	<ImageUpload open={modal === 'appImageUpload'} onclose={() => (modal = 'none')} obj={row} />
	<ButtonSettings open={modal === 'appButtonSettings'} onclose={() => (modal = 'none')} {row} />
</div>
