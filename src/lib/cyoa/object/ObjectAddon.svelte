<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { checkRequireds } from '$lib/store/actions';
	import { app, appMetaState } from '$lib/store/store.svelte';
	import type { Addon, Backpack, Row } from '$lib/store/types';
	import { getImageURL } from '$lib/store/utils';
	import { KeyRound } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import DOMPurify from 'dompurify';
	import ImageUpload from '../row/ImageUpload.svelte';
	import Requirement from '../row/Requirement.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';

	const { isEditModeOn, addon, row }: { isEditModeOn: boolean; addon: Addon; row: Row | Backpack } =
		$props();

	let modal = $state<'none' | 'appImageUpload' | 'appRequirement'>('none');
	const styling: typeof row.styling & Partial<typeof app.styling> = $derived(
		row.isPrivateStyling ? row.styling : app.styling
	);

	const replaceAddonTitle = $derived.by(() => {
		let newObjectText = addon.title;
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

	const replaceAddonText = $derived.by(() => {
		let newObjectText = addon.text;
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

	const objectImgBorderSuffix = $derived(styling.objectImgBorderRadiusIsPixels ? 'px' : '%');

	const pointReqOperators = [
		{ name: '+ More than', value: '1' },
		{ name: '+= More or equal', value: '2' },
		{ name: '= Equal to', value: '3' },
		{ name: '-= Less or equal', value: '4' },
		{ name: '- Less than', value: '5' }
	];
</script>

<div>
	{#if isEditModeOn}
		<div class="pb-1">
			<Button onclick={() => (modal = 'appRequirement')} size="icon" variant="ghost">
				<KeyRound />
			</Button>
			{#if addon.image.length > 0}
				<div class="flex w-full flex-col items-center">
					<button onclick={() => (modal = 'appImageUpload')}>
						<img
							class="max-h-44 px-12"
							src={getImageURL(appMetaState.imagePrefix, addon.image)}
							alt=""
						/>
					</button>
				</div>
			{/if}
			<div>
				<Button size="lg" onclick={() => (modal = 'appImageUpload')}>Change Image</Button>
			</div>
			<WrappedInput
				label="Addon Title"
				bind:value={addon.title}
			/>
			<div class="mt-1 flex flex-col items-start gap-y-1">
				<Label for="object-addon-text-textarea-{addon.id}">Addon Text</Label>
				<Textarea id="object-addon-text-textarea-{addon.id}" bind:value={addon.text} rows={5} />
			</div>
			<div class="grid grid-cols-2">
				{#each addon.requireds as required, index}
					<div class="flex flex-col p-2">
						{#if required.type === 'id'}
							{#if required.showRequired}
								<WrappedInput
									label="Text Before"
									bind:value={required.beforeText}
								/>
								<WrappedInput
									label="Text After"
									bind:value={required.afterText}
								/>
							{/if}
							<WrappedInput
								label={required.required ? 'Selected ID' : 'Not Selected ID'}
								bind:value={required.reqId}
							/>
						{:else if required.type === 'points'}
							<WrappedSelect
								label="Operator"
								bind:value={required.operator}
								items={pointReqOperators}
								placeholder="Operator"
							/>
							<WrappedSelect
								label="Point Type"
								bind:value={required.reqId}
								items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
								placeholder="Point Type"
							/>
							<WrappedInput
								label={required.required ? 'More Than' : 'Less Than'}
								bind:value={required.reqPoints}
								type="number"
							/>
						{:else if required.type === 'pointCompare'}
							<span class="text-center">
								{required.operator.toString() === '1' && 'A is bigger than B'}
								{required.operator.toString() === '2' && 'A is equal to B'}
								{required.operator.toString() === '3' && 'A is bigger/equal to B'}
							</span>
							<WrappedSelect
								label="Operator"
								bind:value={required.operator}
								items={pointReqOperators}
								placeholder="Operator"
							/>
							<WrappedSelect
								label="Point Type A"
								bind:value={required.reqId}
								items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
								placeholder="Point Type"
							/>
							<WrappedSelect
								label="Point Type B"
								bind:value={required.reqId2}
								items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
								placeholder="Point Type"
							/>
						{:else if required.type === 'or'}
							<WrappedInput
								label="X"
								bind:value={() => required.orNum ?? 1,
								(v) => (required.orNum = Math.max(0, Math.min(v, required.orRequired.length)))}
								type="number"
								min="1"
								max={required.orRequired.length}
							/>
							{#each required.orRequired as orRequired, orIndex}
								<WrappedInput
									label={required.required ? 'Selected Choice ID' : 'Not Selected Choice ID'}
									bind:value={orRequired.req}
									placeholder={required.required ? 'Selected ID' : 'Not Selected ID'}
								/>
							{/each}
						{/if}
						<Button
							onclick={() => {
								const idx = addon.requireds.indexOf(required);
								addon.requireds.splice(idx, 1);
							}}
						>
							Delete
						</Button>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	{#if !isEditModeOn && checkRequireds(addon) && !row.textIsRemoved}
		<div class="w-full">
			<!-- Template 1 - Picture on top. -->
			{#if addon.imageSourceTooltip !== '' && typeof addon.imageSourceTooltip !== 'undefined'}
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<img
								class="inline-block"
								style:width={styling.objectImageWidth + '%'}
								style:margin-top={styling.objectImageMarginTop + '%'}
								style:margin-bottom={styling.objectImageMarginBottom + '%'}
								style:border-radius={`${styling.objectImgBorderRadiusTopLeft}0${objectImgBorderSuffix} ${styling.objectImgBorderRadiusTopRight}0${objectImgBorderSuffix} ${styling.objectImgBorderRadiusBottomRight}0${objectImgBorderSuffix} ${styling.objectImgBorderRadiusBottomLeft}0${objectImgBorderSuffix}`}
								style:overflow={styling.objectImgOverflowIsOn ? 'hidden' : undefined}
								style:border={styling.objectImgBorderIsOn
									? `${styling.objectImgBorderWidth}0px ${styling.objectImgBorderStyle} ${styling.objectImgBorderColor}`
									: undefined}
								src={getImageURL(addon.image, appMetaState.imagePrefix)}
								alt=""
							/>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<span>{addon.imageSourceTooltip}</span>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			{:else}
				<img
					class="inline-block"
					style:width={styling.objectImageWidth + '%'}
					style:margin-top={styling.objectImageMarginTop + '%'}
					style:margin-bottom={styling.objectImageMarginBottom + '%'}
					style:border-radius={`${styling.objectImgBorderRadiusTopLeft}0${objectImgBorderSuffix} ${styling.objectImgBorderRadiusTopRight}0${objectImgBorderSuffix} ${styling.objectImgBorderRadiusBottomRight}0${objectImgBorderSuffix} ${styling.objectImgBorderRadiusBottomLeft}0${objectImgBorderSuffix}`}
					style:overflow={styling.objectImgOverflowIsOn ? 'hidden' : undefined}
					style:border={styling.objectImgBorderIsOn
						? `${styling.objectImgBorderWidth}0px ${styling.objectImgBorderStyle} ${styling.objectImgBorderColor}`
						: undefined}
					src={getImageURL(addon.image, appMetaState.imagePrefix)}
					alt=""
				/>
			{/if}
			<div>
				{#if addon.title !== ''}
					<h4
						style:font-family={styling.addonTitle}
						style:font-size={styling.addonTitleTextSize + '%'}
						style:text-align={styling.addonTitleAlign}
						style:color={styling.addonTitleColor}
					>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html DOMPurify.sanitize(replaceAddonTitle)}
					</h4>
				{/if}
				<p
					style:font-family={styling.addonText}
					style:font-size={styling.addonTextTextSize + '%'}
					style:text-align={styling.addonTextAlign}
					style:color={styling.addonTextColor}
					class="whitespace-pre-line"
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html DOMPurify.sanitize(replaceAddonText)}
				</p>
			</div>
		</div>
	{/if}
	<ImageUpload open={modal === 'appImageUpload'} onclose={() => (modal = 'none')} obj={addon} />
	<Requirement open={modal === 'appRequirement'} onclose={() => (modal = 'none')} obj={addon} />
</div>
