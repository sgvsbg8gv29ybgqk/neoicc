<script lang="ts">
	import type { Backpack, Object, Requireds, Row } from '$lib/store/types';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import {
		BadgePlus,
		ChevronLeft,
		ChevronRight,
		Copy,
		Group,
		KeyRound,
		MessageSquarePlus,
		Minus,
		Plus,
		Settings,
		Trash2,
		type Icon as LucideIcon
	} from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { generateID, getImageURL, pi } from '$lib/store/utils';
	import { Label } from '$lib/components/ui/label';
	import { app, appMetaState } from '$lib/store/store.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Accordion from '$lib/components/ui/accordion';
	import ObjectScore from './object/ObjectScore.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { getRandomBackgroundImage, backgroundImages } from './style/backgroundImageUtils';
	import {
		activateObject,
		checkRequireds,
		selectedOneLess,
		selectedOneMore
	} from '$lib/store/actions';
	import ImageUpload from './row/ImageUpload.svelte';
	import Requirement from './row/Requirement.svelte';
	import ObjectSettings from './object/ObjectSettings.svelte';
	import ObjectAddon from './object/ObjectAddon.svelte';
	import ObjectRequirements from './object/ObjectRequirements.svelte';
	import DOMPurify from 'dompurify';
	import { onMount } from 'svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';

	onMount(() => {
		if (object.selectedThisManyTimesProp === undefined) {
			object.selectedThisManyTimesProp = object.multipleUseVariable;
		}
	});

	function multiplyOrDivide(object: Object) {
		// TODO if object Multiplies or divides.
		// This will divide a point type when activated.
		if (object.multiplyPointtypeIsOnCheck) {
			// used when checing if
			object.multiplyPointtypeIsOnCheck = false;
			for (const pointType of app.pointTypes) {
				if (pointType.id == object.pointTypeToMultiply) {
					pointType.startingSum = pi(pointType.startingSum) - pi(object.startingSumAtMultiply);
					//pointType.startingSum /= object.multiplyWithThis;
					console.log('Multiply:' + object.startingSumAtMultiply);
				}
			}
		}

		// This will multiply a point type when activated.
		if (object.dividePointtypeIsOnCheck) {
			// used when checing if
			object.dividePointtypeIsOnCheck = false;
			for (const pointType of app.pointTypes) {
				if (pointType.id == object.pointTypeToDivide) {
					pointType.startingSum = pi(pointType.startingSum) * pi(object.divideWithThis);
					console.log('Multiply:');
				}
			}
		}
	}

	const {
		class: className,
		object,
		row,
		isCreator,
		isEditModeOn
	}: {
		class: string;
		object: Object;
		row: Row | Backpack;
		isCreator: boolean;
		isEditModeOn: boolean;
	} = $props();

	let modal = $state<'none' | 'appImageUpload' | 'objectSettings' | 'appRequirement'>('none');

	const styling: NonNullable<typeof object.styling> & Partial<typeof app.styling> = $derived(
		object.isPrivateStyling
			? (object.styling ?? (row.isPrivateStyling ? row.styling : app.styling))
			: row.isPrivateStyling
				? row.styling
				: app.styling
	);

	$effect(() => {
		const hasRequireds = checkRequireds(object);
		if (hasRequireds) return;
		// Turns the object inactive and removes the id from the activated-array.
		if (object.isActive) {
			activateObject(object, row);
			// If the choice is tier-based with multiple.
		} else if (object.isSelectableMultiple) {
			// Will go trough all tiers left to lowest tier.
			for (let i = 0; i < pi(object.numMultipleTimesPluss) - pi(object.numMultipleTimesMinus); i++)
				selectedOneLess(object);
		}

		if (object.multiplyPointtypeIsOnCheck || object.dividePointtypeIsOnCheck) {
			multiplyOrDivide(object);
		}

		// Is here to make the activated choice selectable.
		if (object.activateOtherChoice) {
			for (const row of app.rows) {
				for (const object2 of row.objects) {
					if (object2.id === object.activateThisChoice && object2.isActive)
						object2.isNotSelectable = true;
				}
			}
		}
	});

	const objectBackground = $derived.by(() => {
		let style = '';

		if (styling.objectBorderImage) {
			style += `border-image: url("${styling.objectBorderImage}") ${styling.objectBorderImageSliceTop} ${styling.objectBorderImageSliceRight} ${styling.objectBorderImageSliceBottom} ${styling.objectBorderImageSliceLeft} / ${styling.objectBorderImageWidth}px ${styling.objectBorderImageRepeat};`;
			style += `border-style: solid; padding: ${styling.objectBorderImageWidth}px !important;`;
		}

		// Styles the color of the background, margin and selected color if selected.
		if (!object.isActive) {
			if (styling.objectBackgroundImage) {
				style += `background-image: url("${styling.objectBackgroundImage}");`;
				style += `background-repeat: ${styling.selFilterBgImageRepeat};`;
			}
		}
		if (styling.objectBgColorIsOn) style += `background-color: ${styling.objectBgColor};`;
		style += `margin: ${styling.objectMargin}px;`;
		if (object.isActive || (object.isImageUpload && object.image.length > 0)) {
		if (styling.selFilterBgImageIsOn && styling.selFilterBgImages && styling.selFilterBgImages.length > 0) {
			const randomBackgroundImage = getRandomBackgroundImage(styling.selFilterBgImages, object.id);
			style += `background-image: url("${randomBackgroundImage}");`;
			style += `background-repeat: ${styling.selFilterBgImageRepeat};`;
			style += `background-position: ${styling.selFilterBgImagePosition};`;
			style += `background-origin: border-box;`;
			style += `background-size: ${styling.selFilterBgImageWidth} auto;`;
			style += `opacity: ${styling.selFilterBgImageOpacity}%;`;
			style += `filter: blur(${styling.selFilterBlur}px) brightness(${styling.selFilterBright}%) contrast(${styling.selFilterCont}%) grayscale(${styling.selFilterGray}%) hue-rotate(${styling.selFilterHue}deg) invert(${styling.selFilterInvert}%) saturate(${styling.selFilterSatur}) sepia(${styling.selFilterSepia}%);`;
		} else if (styling.selBgColorIsOn) {
				style += `background-color: ${styling.selFilterBgColor};`;
			}
		}

		// Border Radius
		const suffix = styling.objectBorderRadiusIsPixels ? 'px' : '%';

		if (styling.objectGradientIsOn)
			style += `background-image: linear-gradient(${styling.objectGradient});`;

		if (pi(object.template) === 1 || row.choicesShareTemplate)
			style += `border-radius: ${styling.objectBorderRadiusTopLeft}0${suffix} ${styling.objectBorderRadiusTopRight}0${suffix} ${styling.objectBorderRadiusBottomRight}0${suffix} ${styling.objectBorderRadiusBottomLeft}0${suffix};`;
		else if (pi(object.template) === 2)
			style += `border-radius: ${styling.objectBorderRadiusTopLeft}0${suffix} ${styling.objectBorderRadiusBottomLeft}0${suffix} ${styling.objectBorderRadiusBottomRight}0${suffix} ${styling.objectBorderRadiusTopRight}0${suffix};`;
		else
			style += `border-radius: ${styling.objectBorderRadiusBottomLeft}0${suffix} ${styling.objectBorderRadiusTopLeft}0${suffix} ${styling.objectBorderRadiusTopRight}0${suffix} ${styling.objectBorderRadiusBottomRight}0${suffix};`;

		if (styling.objectOverflowIsOn) style += `overflow: hidden;`;

		if (styling.objectBorderIsOn || (object.isActive && styling.selBorderColorIsOn))
			style += `border: ${styling.objectBorderWidth}px ${styling.objectBorderStyle} ${
				object.isActive && styling.selBorderColorIsOn 
					? styling.selFilterBorderColor 
					: styling.objectBorderColor
			};`;

		// Styles here the drop-shadow.
		let filter = '';
		if (styling.objectDropShadowIsOn)
			filter += ` drop-shadow(${styling.objectDropShadowH}px ${styling.objectDropShadowV}px ${styling.objectDropShadowBlur}px ${styling.objectDropShadowColor});`;

		// TODO Make this part more efficient.

		// Needs to check if the object have all of the requireds.
		const hasRequireds = checkRequireds(object);

		// If the object is selected.
		if (
			(object.isActive || (object.isSelectableMultiple && pi(object.multipleUseVariable) > 0)) &&
			hasRequireds
		) {
			if (styling.selFilterBlurIsOn) filter += ` blur(${styling.selFilterBlur}px)`;
			if (styling.selFilterBrightIsOn) filter += ` brightness(${styling.selFilterBright}%)`;
			if (styling.selFilterContIsOn) filter += ` contrast(${styling.selFilterCont}%)`;
			if (styling.selFilterGrayIsOn) filter += ` grayscale(${styling.selFilterGray}%)`;
			if (styling.selFilterHueIsOn) filter += ` hue-rotate(${styling.selFilterHue}deg)`;
			if (styling.selFilterInvertIsOn) filter += ` invert(${styling.selFilterInvert}%)`;
			if (styling.selFilterOpacIsOn) filter += ` opacity(${styling.selFilterOpac}%)`;
			if (styling.selFilterSaturIsOn) filter += ` saturate(${styling.selFilterSatur})`;
			if (styling.selFilterSepiaIsOn) filter += ` sepia(${styling.selFilterSepia}%)`;

			if (styling.objectGradientIsOn)
				style += `background-image: linear-gradient(${styling.objectGradientOnSelect});`;
		} else {
			// If the object does not have alle of the conditions.
			if (!hasRequireds) {
				if (styling.reqFilterBlurIsOn) filter += ` blur(${styling.reqFilterBlur}px)`;
				if (styling.reqFilterBrightIsOn) filter += ` brightness(${styling.reqFilterBright}%)`;
				if (styling.reqFilterContIsOn) filter += ` contrast(${styling.reqFilterCont}%)`;
				if (styling.reqFilterGrayIsOn) filter += ` grayscale(${styling.reqFilterGray}%)`;
				if (styling.reqFilterHueIsOn) filter += ` hue-rotate(${styling.reqFilterHue}deg)`;
				if (styling.reqFilterInvertIsOn) filter += ` invert(${styling.reqFilterInvert}%)`;
				if (styling.reqFilterOpacIsOn) filter += ` opacity(${styling.reqFilterOpac}%)`;
				if (styling.reqFilterSaturIsOn) filter += ` saturate(${styling.reqFilterSatur})`;
				if (styling.reqFilterSepiaIsOn) filter += ` sepia(${styling.reqFilterSepia}%)`;

				if (styling.reqBgColorIsOn) style += `background-color: ${styling.reqFilterBgColor};`;
				else style += `background-color: ${styling.objectBgColor};`;

				if (styling.objectGradientIsOn)
					style += `background-image: linear-gradient(${styling.objectGradientOnReq});`;
			}
		}

		style += `filter: ${filter};`;

		return style;
	});

	const findRowTitle = app.rows.find((row) => row.objects.includes(object))?.title ?? '';

	const objectImageBorderRadius = $derived.by(() => {
		const suffix = styling.objectImgBorderRadiusIsPixels ? 'px' : '%';
		// Border Radius
		if (pi(object.template) === 1 || row.choicesShareTemplate) {
			return `${styling.objectImgBorderRadiusTopLeft}0${suffix} ${styling.objectImgBorderRadiusTopRight}0${suffix} ${styling.objectImgBorderRadiusBottomRight}0${suffix} ${styling.objectImgBorderRadiusBottomLeft}0${suffix}`;
		} else if (pi(object.template) === 2) {
			return `${styling.objectImgBorderRadiusTopLeft}0${suffix} ${styling.objectImgBorderRadiusBottomLeft}0${suffix} ${styling.objectImgBorderRadiusBottomRight}0${suffix} ${styling.objectImgBorderRadiusTopRight}0${suffix}`;
		} else {
			return `${styling.objectImgBorderRadiusBottomLeft}0${suffix} ${styling.objectImgBorderRadiusTopLeft}0${suffix} ${styling.objectImgBorderRadiusTopRight}0${suffix} ${styling.objectImgBorderRadiusBottomRight}0${suffix}`;
		}
	});

	// Used on the img in the object.
	const replaceObjectTitleText = $derived.by(() => {
		let newObjectText = object.title;
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

	/**
	 * Collects the title of the required id in the requirements.
	 * And shows it when showrequired is true.
	 */
	function getChoiceTitle(required: Requireds) {
		if (required.showRequired) {
			if (required.type == 'id') {
				for (const row of app.rows) {
					for (const object of row.objects) {
						if (required.reqId == object.id)
							return `${required.beforeText} ${object.title} ${required.afterText}`;
					}
				}
			} else if (required.type == 'points') {
				for (const pointType of app.pointTypes) {
					if (required.reqId == pointType.id) {
						return `${required.beforeText} ${required.reqPoints} ${pointType.name} ${required.afterText}`;
					}
				}
			} else if (required.type == 'or') {
				let listOfOrTitles = '';
				for (const orRequired of required.orRequired) {
					for (const row of app.rows) {
						for (const object of row.objects) {
							if (orRequired.req == object.id) listOfOrTitles += object.title + ', ';
						}
					}
				}

				return `${required.beforeText} ${listOfOrTitles} ${required.afterText}`;
			}
		}
		return '';
	}

	const replaceObjectText = $derived.by(() => {
		let newObjectText = object.text;
		let isPointType = false;

		// TODO Add point type if it is.

		if (typeof app.words != 'undefined') {
			// Checks if the word is the ID of a point-type.
			for (const word of app.words) {
				isPointType = false;

				for (const pointType of app.pointTypes) {
					if (pointType.id == word.id) {
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

	const templates = [
		{ name: 'Image top', value: '1' },
		{ name: 'Image left', value: '2' },
		{ name: 'Image right', value: '3' }
	];
</script>

{#snippet TooltipIconButton(Icon: typeof LucideIcon, text: string, onclick: () => void)}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })} {onclick}>
				<Icon />
			</Tooltip.Trigger>
			<Tooltip.Content>
				<span>{text}</span>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/snippet}

{#snippet ObjectImage()}
	{#if object.image}
		<img
			class="inline-block"
			style:width={styling.objectImageWidth + '%'}
			style:margin-top={styling.objectImageMarginTop + '%'}
			style:margin-bottom={styling.objectImageMarginBottom + '%'}
			style:object-fit={styling.objectImgObjectFillIsOn
				? styling.objectImgObjectFillStyle
				: undefined}
			style:height={styling.objectImgObjectFillIsOn
				? styling.objectImgObjectFillHeight + 'px'
				: undefined}
			style:border-radius={objectImageBorderRadius}
			style:overflow={styling.objectImgOverflowIsOn ? 'hidden' : undefined}
			style:border={styling.objectImgBorderIsOn
				? `${styling.objectImgBorderWidth}px ${styling.objectImgBorderStyle} ${styling.objectImgBorderColor}`
				: undefined}
			src={getImageURL(object.image, appMetaState.imagePrefix)}
			alt="object"
		/>
	{/if}
{/snippet}

{#snippet ObjectImageWrapper()}
	{#if object.imageSourceTooltip !== '' && typeof object.imageSourceTooltip !== 'undefined'}
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{@render ObjectImage()}
				</Tooltip.Trigger>
				<Tooltip.Content>
					<span>{object.imageSourceTooltip}</span>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	{:else}
		{@render ObjectImage()}
	{/if}
{/snippet}

{#snippet ObjectInfoWrapper()}
	<h3
		style:font-family={styling.objectTitle}
		style:font-size={`${styling.objectTitleTextSize}%`}
		style:text-align={styling.objectTitleAlign}
		style:color={
			!checkRequireds(object) && styling.reqCTitleColorIsOn 
				? styling.reqFilterCTitleColor 
				: (object.isActive && styling.selCTitleColorIsOn 
					? styling.selFilterCTitleColor 
					: styling.objectTitleColor)
		}
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html DOMPurify.sanitize(replaceObjectTitleText)}
	</h3>
	<!-- If the choice can be selected multiple times. -->
	{#if object.isSelectableMultiple}
		<div class="flex w-full flex-row items-center justify-evenly">
			<Button
				class="my-[5px]"
				disabled={!checkRequireds(object)}
				variant="ghost"
				size="icon"
				type="button"
				onclick={() => !row.isInfoRow && selectedOneLess(object)}
				style={`color: ${styling.scoreTextColor};`}
			>
				<Minus />
			</Button>
			<div
				class="p-0"
				style:font-family={styling.multiChoiceTextFont}
				style:color={styling.scoreTextColor}
				style:font-size={`${styling.multiChoiceTextSize}%`}
			>
				{object.selectedThisManyTimesProp}
			</div>
			<Button
				class="my-[5px]"
				disabled={!checkRequireds(object)}
				variant="ghost"
				size="icon"
				type="button"
				onclick={() => !row.isInfoRow && selectedOneMore(object)}
				style={`color: ${styling.scoreTextColor};`}
			>
				<Plus />
			</Button>
		</div>
	{/if}
	<!-- Lists up all of the Scores added to the object. -->
	{#each object.scores as score}
		<div>
			{#if score.showScore && checkRequireds(score)}
				<ObjectScore {isEditModeOn} {score} />
			{/if}
		</div>
	{/each}
	<!-- Will show off the required if showRequired is selected -->
	{#each object.requireds as required}
		<div>
			{#if required.showRequired}
				<div
					style:font-family={styling.scoreText}
					style:font-size={`${styling.scoreTextSize}%`}
					style:text-align={styling.scoreTextAlign}
					style:color={styling.scoreTextColor}
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html DOMPurify.sanitize(getChoiceTitle(required))}
				</div>
			{/if}
		</div>
	{/each}
	<!-- The text of the object. -->
	{#if !row.textIsRemoved && object.text !== ''}
		<p
			class="my-0 whitespace-pre-line"
			style:font-family={styling.objectText}
			style:text-align={styling.objectTextAlign}
			style:font-size={`${styling.objectTextTextSize}%`}
			style:color={
				!checkRequireds(object) && styling.reqCTextColorIsOn 
					? styling.reqFilterCTextColor 
					: (object.isActive && styling.selCTextColorIsOn 
						? styling.selFilterCTextColor 
						: styling.objectTextColor)
			}
			style:padding={`${styling.objectTextPadding}px`}
		>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html DOMPurify.sanitize(replaceObjectText)}
		</p>
	{/if}
{/snippet}

<div class={cn('flex', className)}>
	<!-- Will only show when the Boolean isEditModeOn is true. -->
	{#if isCreator && isEditModeOn}
		<div class="mx-1 mt-2 w-full divide-y rounded border bg-gray-200">
			<div class="flex flex-row justify-around p-1">
				{@render TooltipIconButton(ChevronLeft, 'Move Left', () => {
					const idx = row.objects.indexOf(object);
					if (idx > 0) {
						const el = row.objects[idx];
						row.objects[idx] = row.objects[idx - 1];
						row.objects[idx - 1] = el;
					}
				})}
				{@render TooltipIconButton(Trash2, 'Delete Object', () => {
					const idx = row.objects.indexOf(object);
					row.objects.splice(idx, 1);
				})}
				{@render TooltipIconButton(Settings, 'Object Settings', () => (modal = 'objectSettings'))}
				{@render TooltipIconButton(Copy, 'Clone Object', () => {
					const idx = row.objects.indexOf(object);
					row.objects.splice(idx + 1, 0, JSON.parse(JSON.stringify($state.snapshot(object))));
					row.objects[idx + 1].id = generateID();
				})}
				{@render TooltipIconButton(ChevronRight, 'Move Right', () => {
					const idx = row.objects.indexOf(object);
					if (idx < row.objects.length - 1) {
						const el = row.objects[idx];
						row.objects[idx] = row.objects[idx + 1];
						row.objects[idx + 1] = el;
					}
				})}
			</div>
			<div class="flex flex-col gap-y-1 p-1">
				{#if row.isWeightedRandom && row.isButtonRow && row.buttonRandom}
					<WrappedInput
						label="Random Weight"
						bind:value={object.randomWeight}
						type="number"
						placeholder="100"
					/>
				{/if}
				<div class="flex flex-col items-center gap-y-2">
					<div class="w-full relative">
						<button onclick={() => (modal = 'appImageUpload')} class="w-full">
							{#if object.image}
								<img
									class="inline-block h-[250px] w-auto object-contain"
									src={getImageURL(object.image, appMetaState.imagePrefix)}
									alt="object"
									style="max-height: 250px; min-height: 150px;"
								/>
							{:else}
								<div 
									class="h-[250px] w-full flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50"
									style="max-height: 250px; min-height: 150px;"
								>
									<span class="text-gray-500">Set Image</span>
								</div>
							{/if}
						</button>
						{#if object.image}
							<button
								class="absolute top-1 right-1 bg-white/50 hover:bg-white/80 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
								onclick={(e) => {
									e.stopPropagation();
									object.image = '';
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
				<div class="mt-1 flex flex-col items-start gap-y-1">
					<Label for="object-text-textarea-{object.id}">Object Text</Label>
					<Textarea id="object-text-textarea-{object.id}" bind:value={object.text} rows={6} class="bg-gray-50"/>
				</div>
				<div class="grid grid-cols-2 gap-x-2 gap-y-2">
					<WrappedInput
						label="Object Title"
						bind:value={object.title} 
					/>
					<WrappedInput label="Object ID" bind:value={object.id} />
					<WrappedSelect
						label="Template"
						bind:value={object.template}
						items={templates}
						placeholder="Template"
					/>
					<WrappedSelect
						label="Object Width"
						bind:value={object.objectWidth}
						items={appMetaState.objectWidths}
						placeholder="Width"
						hasNone={true}
					/>
				</div>
			</div>
			<div class="flex flex-row justify-around p-1">
				{@render TooltipIconButton(BadgePlus, 'Create Score', () =>
					object.scores.push({
						id: generateID(),
						value: 0,
						type: '',
						requireds: [],
						beforeText: app.defaultBeforePoint,
						afterText: app.defaultAfterPoint,
						showScore: true // Shows the score if the checkbox is pressed.
					})
				)}
				{@render TooltipIconButton(MessageSquarePlus, 'Create Addon', () =>
					object.addons.push({
						id: generateID(),
						title: app.defaultAddonTitle,
						text: app.defaultAddonText,
						template: '',
						image: '',
						requireds: []
					})
				)}
				{@render TooltipIconButton(
					KeyRound,
					'Create Requirement',
					() => (modal = 'appRequirement')
				)}
				{@render TooltipIconButton(Group, 'Add To Group', () => object.groups.push({ id: generateID() }))}
			</div>
			<Accordion.Root type="multiple">
				{#if object.scores.length > 0}
					<Accordion.Item value="object-score" class="px-4">
						<Accordion.Trigger class="py-2">
							<span>Scores: {object.scores.length}</span>
						</Accordion.Trigger>
						<Accordion.Content>
							<div class="flex flex-col pb-2">
								<!-- Lists up the scores that the object holds. -->
								{#each object.scores as score}
									<div class="flex flex-col">
										<ObjectScore {isEditModeOn} {score} />
										<div class="grid grid-cols-2 items-center gap-x-2">
											<div class="mt-1 flex flex-row items-start gap-x-1">
												<Label for="show-score-checkbox-{object.id}-{score.id}">Show Score?</Label>
												<Checkbox
													id="show-score-checkbox-{object.id}-{score.id}"
													bind:checked={score.showScore}
												/>
											</div>
											<Button
												onclick={() => {
													const idx = object.scores.indexOf(score);
													object.scores.splice(idx, 1);
												}}
											>
												Delete
											</Button>
										</div>
									</div>
								{/each}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				{/if}
				{#if object.addons.length > 0}
					<Accordion.Item value="object-addons" class="px-4">
						<Accordion.Trigger class="py-2">
							<span>Addons: {object.addons.length}</span>
						</Accordion.Trigger>
						<Accordion.Content>
							<div class="flex flex-col pb-2">
								<!-- Lists up the addons that the object holds. -->
								{#each object.addons as addon}
									<div class="flex flex-col gap-y-1">
										<ObjectAddon {isEditModeOn} {addon} {row} />
										<Button
											onclick={() => {
												const idx = object.addons.indexOf(addon);
												object.addons.splice(idx, 1);
											}}
										>
											Delete
										</Button>
									</div>
								{/each}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				{/if}
				{#if object.requireds.length > 0}
					<Accordion.Item value="object-requireds" class="px-4">
						<Accordion.Trigger class="py-2">
							<span>Requirements: {object.requireds.length}</span>
						</Accordion.Trigger>
						<Accordion.Content>
							<div class="grid grid-cols-2 gap-x-2 gap-y-2 pb-2">
								<!-- Shows the requirements, allows the user to delete or change its id -->
								{#each object.requireds as required}
									<div
										class={cn(
											typeof required.requireds !== 'undefined' && required.requireds.length > 0
												? 'col-span-2'
												: 'col-span-1'
										)}
									>
										<div class="flex flex-col">
											<ObjectRequirements obj={object} {required} />
											<Button
												onclick={() => {
													const idx = object.requireds.indexOf(required);
													object.requireds.splice(idx, 1);
												}}
											>
												Delete
											</Button>
										</div>
									</div>
								{/each}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				{/if}
				{#if typeof object.groups !== 'undefined' && object.groups.length > 0}
					<Accordion.Item value="object-groups" class="px-4">
						<Accordion.Trigger class="py-2">
							<span>Groups: {object.groups?.length ?? ''}</span>
						</Accordion.Trigger>
						<Accordion.Content>
							<div class="grid grid-cols-2 gap-x-2 gap-y-2 pb-2">
								<!-- Shows the requirements, allows the user to delete or change its id -->
								{#each object.groups as group, index}
									<div class="flex flex-col gap-y-1">
										<WrappedSelect
											label="Group ID"
											bind:value={group.id}
											items={app.groups.map((e) => ({ name: e.name, value: e.id }))}
											placeholder="Group ID"
										/>
										<Button
											onclick={() => {
												const idx = object.groups.indexOf(group);
												object.groups.splice(idx, 1);
											}}
										>
											Delete
										</Button>
									</div>
								{/each}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				{/if}
				<Accordion.Item value="object-functions" class="px-4">
					<Accordion.Trigger class="py-2">
						<span>Functions</span>
					</Accordion.Trigger>
					<Accordion.Content>
						<div class="flex flex-col gap-y-2">
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-clean-activated-on-select-{object.id}"
									bind:checked={() => object.cleanACtivatedOnSelect ?? false,
									(v) => (object.cleanACtivatedOnSelect = v)}
								/>
								<Label for="object-clean-activated-on-select-{object.id}">
									Selecting this choice will de-select all other choices
								</Label>
							</div>
							<!-- Where the elements controlling multiple select choices is -->
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-selectable-multiple-{object.id}"
									bind:checked={() => object.isSelectableMultiple ?? false,
									(v) => (object.isSelectableMultiple = v)}
								/>
								<Label for="object-selectable-multiple-{object.id}">
									The choice can be selected multiple times
								</Label>
							</div>
							{#if object.isSelectableMultiple}
								<div class="flex flex-row items-center gap-x-1">
									<Checkbox
										id="object-multiple-use-variable-{object.id}"
										bind:checked={() => object.isMultipleUseVariable ?? false,
										(v) => {
											object.isMultipleUseVariable = v;
											object.multipleUseVariable = undefined;
										}}
									/>
									<Label for="object-multiple-use-variable-{object.id}">
										Press this to use a simple variable instead of a Point-type?
									</Label>
								</div>
							{/if}
							{#if object.isSelectableMultiple && !object.isMultipleUseVariable}
								<p>
									The point type used here should only be used for this choice, and it can be hidden
									by placing something in 'ID needed to activate' in Features -> Manage Points.
								</p>
								<WrappedSelect
									label="Point Type that will be used"
									bind:value={object.multipleScoreId}
									items={app.pointTypes.map((e) => ({ name: e.name, value: e.id }))}
									placeholder="Point Type that will be used"
								/>
							{/if}
							{#if object.isSelectableMultiple}
								<WrappedInput
									label="Number where the minus will stop working"
									bind:value={object.numMultipleTimesMinus}
									type="number"
								/>
								<WrappedInput
									label="Number where the pluss will stop working"
									bind:value={object.numMultipleTimesPluss}
									type="number"
								/>
							{/if}
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-not-selectable-{object.id}"
									bind:checked={() => object.isNotSelectable ?? false,
									(v) => (object.isNotSelectable = v)}
								/>
								<Label for="object-not-selectable-{object.id}">
									Selecting this choice will be impossible
								</Label>
							</div>
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-activate-other-choice-{object.id}"
									bind:checked={() => object.activateOtherChoice ?? false,
									(v) => (object.activateOtherChoice = v)}
								/>
								<Label for="object-activate-other-choice-{object.id}">
									Forces another choice active
								</Label>
							</div>
							{#if object.activateOtherChoice}
							<div class="flex flex-row items-center gap-x-1 ml-4">
								<Checkbox
									id="object-ignore-forced-activation-{object.id}"
									bind:checked={() => object.isAllowDeselect ?? false,
									(v) => (object.isAllowDeselect = v)}
								/>
								<Label for="object-ignore-forced-activation-{object.id}">
									Allow deactivation of forced choices
								</Label>
							</div>
							{/if}
							{#if object.activateOtherChoice}
								<div class="flex flex-row items-center gap-x-1 ml-4">
									<Checkbox
										id="object-cancel-deactivate-{object.id}"
										bind:checked={() => object.isNotDeactivate ?? false,
										(v) => (object.isNotDeactivate = v)}
									/>
									<Label for="object-cancel-deactivate-{object.id}">
										Keep forced choices active after deselecting this choice
									</Label>
								</div>
							{/if}
							{#if object.activateOtherChoice}
								<p>
									Works badly if multiple of these have the same ID, or if the target has
									requirements attached. You can use comma to activate multiple (ID,ID,ID/ON#1).
								</p>
								<WrappedInput
									label="ID of the choice that will be activated"
									bind:value={object.activateThisChoice}
								/>
							{/if}
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-deactivate-other-choice-{object.id}"
									bind:checked={() => object.deactivateOtherChoice ?? false,
									(v) => (object.deactivateOtherChoice = v)}
								/>
								<Label for="object-deactivate-other-choice-{object.id}">
									Will make another choice unselected
								</Label>
							</div>
							{#if object.deactivateOtherChoice}
								<p>
									Will be useful if the target has scores with requirements, use a Group ID to turn
									off multiple. You can use comma to deactivate multiple (ID,ID,ID).
								</p>
								<WrappedInput
									label="ID of the choice that will be deactivated"
									bind:value={object.deactivateThisChoice}
								/>
							{/if}
							<!-- Muliply Points -->
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-multiply-pointtype-is-on-{object.id}"
									bind:checked={() => object.multiplyPointtypeIsOn ?? false,
									(v) => (object.multiplyPointtypeIsOn = v)}
								/>
								<Label for="object-multiply-pointtype-is-on-{object.id}">
									Multiply Points when activated
								</Label>
							</div>
							{#if object.multiplyPointtypeIsOn}
								<p>
									Not to be used on choices with scores. Won't work if the Allowed Choices on the
									row is bigger than 0.
								</p>
								<WrappedSelect
									label="Point-Type to multiply"
									bind:value={object.pointTypeToMultiply}
									items={app.pointTypes.map((e) => ({ name: e.name, value: e.id }))}
									placeholder="Point-Type to multiply"
								/>
							{/if}
							{#if object.multiplyPointtypeIsOn}
								{#if object.multiplyPointtypeIsId}
									<WrappedSelect
										label="Multiplied with this Point-Type"
										bind:value={object.multiplyWithThis}
										items={app.pointTypes.map((e) => ({ name: e.name, value: e.id }))}
										placeholder="Multiplied with this Point-Type"
									/>
								{:else}
									<WrappedInput
										label="Multiplied by X"
										bind:value={object.multiplyWithThis}
										type="number"
									/>
								{/if}
							{/if}
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-multiply-pointtype-is-id-{object.id}"
									bind:checked={() => object.multiplyPointtypeIsId ?? false,
									(v) => (object.multiplyPointtypeIsId = v)}
								/>
								<Label for="object-multiply-pointtype-is-id-{object.id}">
									Is point-type id, multiplies by the sum
								</Label>
							</div>
							<!-- Divide Points -->
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-divide-pointtype-is-on-{object.id}"
									bind:checked={() => object.dividePointtypeIsOn ?? false,
									(v) => (object.dividePointtypeIsOn = v)}
								/>
								<Label for="object-divide-pointtype-is-on-{object.id}">
									Divide Points when activated
								</Label>
							</div>
							{#if object.dividePointtypeIsOn}
								<WrappedSelect
									label="Point-Type to divide"
									bind:value={object.pointTypeToDivide}
									items={app.pointTypes.map((e) => ({ name: e.name, value: e.id }))}
									placeholder="Point-Type to divide"
								/>
								<WrappedInput
									label="Divided by X"
									bind:value={object.divideWithThis}
									type="number"
								/>
							{/if}
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-textfield-is-on-{object.id}"
									bind:checked={() => object.textfieldIsOn ?? false,
									(v) => (object.textfieldIsOn = v)}
								/>
								<Label for="object-textfield-is-on-{object.id}">
									Word will be changed to something else at select
								</Label>
							</div>
							{#if object.textfieldIsOn}
								<WrappedSelect
									label="ID of word that will change"
									bind:value={object.idOfTheTextfieldWord}
									items={app.words.map((e) => ({ name: e.id, value: e.id }))}
									placeholder="Word ID"
								/>
								<WrappedInput
									label="Will be changed to this on select"
									bind:value={object.wordChangeSelect}
								/>
								<WrappedInput
									label="Will be changed to this on deselect"
									bind:value={object.wordChangeDeselect}
								/>
							{/if}
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-is-image-upload-{object.id}"
									bind:checked={() => object.isImageUpload ?? false,
									(v) => (object.isImageUpload = v)}
								/>
								<Label for="object-is-image-upload-{object.id}">
									Player can upload a picture by pressing this choice
								</Label>
							</div>
							<div class="flex flex-row items-center gap-x-1">
								<Checkbox
									id="object-add-to-allow-choice-{object.id}"
									bind:checked={() => object.addToAllowChoice ?? false,
									(v) => (object.addToAllowChoice = v)}
								/>
								<Label for="object-add-to-allow-choice-{object.id}">
									Adds or takes away a row's Allowed Choices
								</Label>
							</div>
							{#if object.addToAllowChoice}
								<WrappedSelect
									label="ID of the row whose Allowed Choices will be changed."
									bind:value={object.idOfAllowChoice}
									items={app.rows.map((e) => ({ name: `${e.id} - ${e.title}`, value: e.id }))}
									placeholder="Row ID"
								/>
								<WrappedInput
									label="This number will be added to the Allowed Choices on select."
									bind:value={object.numbAddToAllowChoice}
									type="number"
								/>
							{/if}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	{/if}
	<!-- Preview and templates -->
	<!-- If the row is not an info row or is not selectable, make it clickable -->
	<!-- Added the object.isImageUpload -->
	{#if (!isCreator || !isEditModeOn) && checkRequireds(row)}
		<div
			class="w-full p-0"
			style={objectBackground}
			onclick={() => {
				// Allow deactivation if isNotDeactivate is active
				if (object.isActive && object.forcedActivated) {
					return;
				}
				
				if (object.isImageUpload) modal = 'appImageUpload';
				else if (
					!row.isInfoRow &&
					!object.isNotSelectable &&
					!object.isSelectableMultiple &&
					!object.isButtonObject
				) {
					activateObject(object, row);
					// Remove forced activation when isNotDeactivate is active
					if (object.isNotDeactivate) {
						object.forcedActivated = false;
					}
				}
			}}
			role="button"
			tabindex="-1"
			onkeydown={(e) => {
				if (e.key === 'Enter') {
					if (object.isImageUpload) modal = 'appImageUpload';
					else if (
						!row.isInfoRow &&
						!object.isNotSelectable &&
						!object.isSelectableMultiple &&
						!object.isButtonObject
					) {
						activateObject(object, row);
					}
				}
			}}
		>
			<!-- Template 1 - Picture on top. -->
			{#if pi(object.template) === 1 || innerWidth < 1000 || row.choicesShareTemplate}
				<div class="m-0 w-full">
					{#if row.resultShowRowTitle}
						<div
							style:margin-top="0px"
							style:margin-bottom="0px"
							style:background-image={row.isPrivateStyling && styling.backgroundImage
								? `url("${styling.backgroundImage}")`
								: null}
							style:background-color={row.isPrivateStyling ? styling.backgroundColor : null}
							style:background-repeat={row.isPrivateStyling ? 'repeat' : null}
							style:margin-left={!isEditModeOn ? `${styling.rowBodyMarginSides}%` : '1%'}
							style:margin-right={!isEditModeOn ? `${styling.rowBodyMarginSides}%` : '1%'}
						>
							<div
								style:font-family={styling.scoreText}
								style:font-size={`${styling.scoreTextSize}%`}
								style:text-align={styling.scoreTextAlign}
								style:color={styling.scoreTextColor}
							>
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html DOMPurify.sanitize(findRowTitle)}
							</div>
						</div>
					{/if}

					{@render ObjectImageWrapper()}
					<div>
						{@render ObjectInfoWrapper()}
						<!-- Lists up the addons that the object holds. -->
						{#each object.addons as addon}
							<div>
								<ObjectAddon {addon} {row} {isEditModeOn} />
							</div>
						{/each}
					</div>
				</div>
			{:else if pi(object.template) === 2 && innerWidth > 1000}
				<!-- Template 2 - Picture on left side. -->
				<div class="m-0 grid w-full grid-cols-2 p-0">
					<!-- The object choice in the preview. -->
					<div>
						{@render ObjectImageWrapper()}
					</div>
					<div class="p-1">
						{@render ObjectInfoWrapper()}
					</div>
					<!-- Lists up the addons that the object holds. -->
					{#each object.addons as addon}
						<div class="col-span-2 p-0">
							<ObjectAddon {addon} {row} {isEditModeOn} />
						</div>
					{/each}
				</div>
			{:else if pi(object.template) === 3 && innerWidth > 1000}
				<!-- Template 3 - Picture on right side. -->
				<div class="m-0 grid w-full grid-cols-2 p-0">
					<div class="p-1">
						{@render ObjectInfoWrapper()}
					</div>
					<!-- The object choice in the preview. -->
					<div class="m-0 p-0">
						{@render ObjectImageWrapper()}
					</div>
					<!-- Lists up the addons that the object holds. -->
					{#each object.addons as addon}
						<div class="col-span-2 p-0">
							<ObjectAddon {addon} {row} {isEditModeOn} />
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
	<ImageUpload open={modal === 'appImageUpload'} onclose={() => (modal = 'none')} obj={object} />
	<ObjectSettings open={modal === 'objectSettings'} onclose={() => (modal = 'none')} obj={object} />
	<Requirement open={modal === 'appRequirement'} onclose={() => (modal = 'none')} obj={object} />
</div>
