<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { app, appMetaState } from '$lib/store/store.svelte';
	import type { Score } from '$lib/store/types';
	import { getImageURL, pi } from '$lib/store/utils';
	import { KeyRound } from 'lucide-svelte';
	import Requirement from '../row/Requirement.svelte';
	import DOMPurify from 'dompurify';
	import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';

	const { isEditModeOn, score }: { isEditModeOn: boolean; score: Score } = $props();
	let modal = $state<'none' | 'appRequirement'>('none');

	const posOrNeg = $derived(pi(score.value) < 0 ? true : false);

	const pointType = $derived.by(() => {
		for (const pointType of app.pointTypes) {
			if (pointType.id === score.id) {
				return pointType;
			}
		}
		return {
			id: 'text',
			name: 'Points',
			startingSum: 0,
			activatedId: '',
			afterText: '',
			pointColorsIsOn: false
		} as (typeof app.pointTypes)[0];
	});

	// Checks if the pointtype has been activated if there is a activatedId in it.
	const isPointtypeActivated = $derived.by(() => {
		if (pointType.activatedId != '') return app.activated.includes(pointType.activatedId);
		return true;
	});

	const scoreTextStyle = $derived.by(() => {
		let style = '';
		style += `font-family: ${app.styling.scoreText};`;
		style += `font-size: ${app.styling.scoreTextSize}%;`;
		style += `text-align: ${app.styling.scoreTextAlign};`;
		style += 'display: flex; align-items: center; justify-content:center;';
		if (pointType) {
			if (pointType.pointColorsIsOn) {
				if (posOrNeg) {
					style += `color: ${pointType.positiveColor?.hex};`;
				} else {
					style += `color: ${pointType.negativeColor?.hex};`;
				}
			} else {
				style += `color: ${app.styling.scoreTextColor};`;
			}
		}
		return style;
	});

	const scoreValue = $derived.by(() => {
		const value = posOrNeg ? pi(score.value) * -1 : score.value;

		if (pointType?.plussOrMinusAdded) {
			if (
				(posOrNeg && !pointType.plussOrMinusInverted) ||
				(pointType.plussOrMinusInverted && !posOrNeg)
			) {
				return '+' + value;
			} else {
				return '-' + value;
			}
		}

		return value.toString();
	});

	const pointReqOperators = [
		{ name: '+ More than', value: '1' },
		{ name: '+= More or equal', value: '2' },
		{ name: '= Equal to', value: '3' },
		{ name: '-= Less or equal', value: '4' },
		{ name: '- Less than', value: '5' }
	];
</script>

{#snippet ScoreIcon()}
	{#if pointType.iconIsOn && pointType.imageOnSide && pointType.image}
		<img
			class="float-left inline-block"
			style:width={pointType.iconWidth + 'px'}
			style:height={pointType.iconHeight + 'px'}
			src={getImageURL(pointType.image, appMetaState.imagePrefix)}
			alt="Point Icon"
		/>
	{/if}
{/snippet}

<div>
	{#if isEditModeOn}
		<div>
			<Button onclick={() => (modal = 'appRequirement')} size="icon" variant="ghost">
				<KeyRound />
			</Button>
		</div>
		<div class="grid grid-cols-2 gap-x-2">
			<div class="flex flex-col gap-y-2">
				<WrappedSelect
					label="Point Type"
					bind:value={score.id}
					items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
					placeholder="Point Type"
				/>
				<WrappedInput
					label="Value"
					type="number"
					bind:value={score.value}
				/>
			</div>
			<!-- Where the user places in the value the object will cost/give -->
			<div class="flex flex-col gap-y-2">
				<WrappedInput
					label="Text Before"
					bind:value={score.beforeText}
				/>
				<WrappedInput
					label="Text After"
					bind:value={score.afterText}
				/>
			</div>
		</div>
		<div class="grid grid-cols-2 gap-x-2 gap-y-2 py-2">
			{#each score.requireds as required, index}
				<div class="flex flex-col gap-y-2">
					{#if required.type === 'id'}
						<!--
						<div class="flex flex-row items-start gap-x-1">
							<Label for="show-score-required-checkbox-{score.id}-{index}">Show Requirement</Label>
							<Checkbox
								id="show-score-required-checkbox-{score.id}-{index}"
								bind:checked={required.showRequired}
							/>
						</div>
						-->
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
							type="number"
							bind:value={required.reqPoints}
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
						<div class="flex flex-col items-start gap-y-1">
							<Label for="object-score-pointtype-{score.id}-{required.id}">Point Type A</Label>
							<Select.Root type="single" bind:value={required.reqId}>
								<Select.Trigger id="object-score-pointtype-{score.id}-{required.id}">
									{app.pointTypes.find((typ) => typ.id === required.reqId)?.name}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										<Select.GroupHeading>Point Types</Select.GroupHeading>
										{#each app.pointTypes as typ}
											<Select.Item value={typ.id}>
												{typ.name}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</div>
						<div class="flex flex-col items-start gap-y-1">
							<Label for="object-score-pointtype2-{score.id}-{required.id}">Point Type B</Label>
							<Select.Root type="single" bind:value={required.reqId2}>
								<Select.Trigger id="object-score-pointtype2-{score.id}-{required.id}">
									{app.pointTypes.find((typ) => typ.id === required.reqId2)?.name}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										<Select.GroupHeading>Point Types</Select.GroupHeading>
										{#each app.pointTypes as typ}
											<Select.Item value={typ.id}>
												{typ.name}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</div>
					{:else if required.type === 'or'}
						<WrappedInput
							label="N"
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
							const idx = score.requireds.indexOf(required);
							score.requireds.splice(idx, 1);
						}}
					>
						Delete
					</Button>
				</div>
			{/each}
		</div>
	{/if}
	<!-- Preview -->
	{#if !isEditModeOn && !pointType?.imageSidePlacement && score.showScore && isPointtypeActivated}
		<div style={scoreTextStyle}>
			<div class={[pointType?.imageOnSide ? 'pl-[3px] pr-[3px]' : 'pl-[1px] pr-[2px]']}>
				{@render ScoreIcon()}
			</div>
			<div>
				<p>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html DOMPurify.sanitize(`${score.beforeText} ${scoreValue} ${score.afterText}`)}
				</p>
			</div>
			<div style={scoreTextStyle}>
				<div class={[pointType?.imageOnSide ? 'pl-[3px] pr-[3px]' : 'pl-[1px] pr-[2px]']}>
					{@render ScoreIcon()}
				</div>
			</div>
		</div>
	{:else if pointType.imageSidePlacement && score.showScore && isPointtypeActivated}
		<div>
			<div style={scoreTextStyle}>
				<div>
					<p>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html DOMPurify.sanitize(`${score.beforeText} `)}
					</p>
				</div>
				<div class={[!pointType.imageOnSide ? 'pl-[3px] pr-[3px]' : 'pl-[1px] pr-[2px]']}>
					{@render ScoreIcon()}
				</div>
				<div>
					<p>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html DOMPurify.sanitize(` ${scoreValue} `)}
					</p>
				</div>
				<div class={[!pointType.imageOnSide ? 'pl-[3px] pr-[3px]' : 'pl-[1px] pr-[2px]']}>
					{@render ScoreIcon()}
				</div>
				<div>
					<p>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html DOMPurify.sanitize(score.afterText)}
					</p>
				</div>
			</div>
		</div>
	{/if}
	<Requirement open={modal === 'appRequirement'} onclose={() => (modal = 'none')} obj={score} />
</div>
