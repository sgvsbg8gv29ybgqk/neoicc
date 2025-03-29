<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import WrappedImageInput from '$lib/components/wrapped/WrappedImageInput.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import { app } from '$lib/store/store.svelte';
	import { generateID } from '$lib/store/utils';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="max-h-screen overflow-y-auto sm:max-w-[1920px]">
		<Dialog.Header>
			<Dialog.Title>Point Types</Dialog.Title>
		</Dialog.Header>
		<div class="grid grid-cols-3 gap-8 py-4">
			{#each app.pointTypes as point, index}
				<div class="flex flex-col gap-y-2">
					<div class="flex flex-col gap-y-2">
						<div class="flex flex-row items-center gap-x-1">
							<Switch
								id="point-below-zero-not-allowed-{point.id}-{index}"
								bind:checked={() => point.belowZeroNotAllowed ?? false,
								(v) => (point.belowZeroNotAllowed = v)}
							/>
							<Label for="point-below-zero-not-allowed-{point.id}-{index}">
								This score is not allowed to go under 0.
							</Label>
						</div>
						<div class="flex flex-row items-center gap-x-1">
							<Switch
								id="point-plus-or-minus-added-{point.id}-{index}"
								bind:checked={() => point.plussOrMinusAdded ?? false,
								(v) => (point.plussOrMinusAdded = v)}
							/>
							<Label for="point-plus-or-minus-added-{point.id}-{index}">
								Add a + or - in front of the scores.
							</Label>
						</div>
						{#if point.plussOrMinusAdded}
							<div class="flex flex-row items-center gap-x-1">
								<Switch
									id="point-plus-or-minus-inverted-{point.id}-{index}"
									bind:checked={() => point.plussOrMinusInverted ?? false,
									(v) => (point.plussOrMinusInverted = v)}
								/>
								<Label for="point-plus-or-minus-inverted-{point.id}-{index}">
									Invert the + and -.
								</Label>
							</div>
						{/if}
						<div class="flex flex-row items-center gap-x-1">
							<Switch
								id="point-point-colors-is-on-{point.id}-{index}"
								bind:checked={() => point.pointColorsIsOn ?? false,
								(v) => (point.pointColorsIsOn = v)}
							/>
							<Label for="point-point-colors-is-on-{point.id}-{index}">
								Set colors for positive or negative.
							</Label>
						</div>
						<div class="flex flex-row items-center gap-x-1">
							<Switch
								id="point-icon-is-on-{point.id}-{index}"
								bind:checked={() => point.iconIsOn ?? false, (v) => (point.iconIsOn = v)}
							/>
							<Label for="point-icon-is-on-{point.id}-{index}">This score has a Icon.</Label>
						</div>
						{#if point.iconIsOn}
							<WrappedImageInput
								label="Upload Point Icon"
								bind:value={() => point.image ?? '', (v) => (point.image = v)}
							/>
							<div class="flex flex-row items-center gap-x-1">
								<Switch
									id="point-image-on-side-{point.id}-{index}"
									bind:checked={() => point.imageOnSide ?? false, (v) => (point.imageOnSide = v)}
								/>
								<Label for="point-image-on-side-{point.id}-{index}">
									Image is on Right/Left side.
								</Label>
							</div>
							<div class="flex flex-row items-center gap-x-1">
								<Switch
									id="point-image-side-placement-{point.id}-{index}"
									bind:checked={() => point.imageSidePlacement ?? false,
									(v) => (point.imageSidePlacement = v)}
								/>
								<Label for="point-image-side-placement-{point.id}-{index}">
									Image is Before/After text.
								</Label>
							</div>
							<WrappedInput
								label="The Image Width"
								bind:value={point.iconWidth}
								type="number"
							/>
							<WrappedInput
								label="The Image Height"
								bind:value={point.iconHeight}
								type="number"
							/>
						{/if}
						{#if point.pointColorsIsOn}
							<div class="flex flex-row">
								<ColorPicker
									bind:hex={() => point.positiveColor?.hex ?? '#000000',
									(v) =>
										(point.positiveColor = {
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
								<ColorPicker
									bind:hex={() => point.negativeColor?.hex ?? '#000000',
									(v) =>
										(point.negativeColor = {
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
						{/if}
					</div>
					<div class="grid grid-cols-3 gap-2">
						<WrappedInput
							label="The Pointype Id"
							bind:value={point.id}
						/>
						<WrappedInput
							label="The Pointtype Name"
							bind:value={point.name}
						/>
						<WrappedInput
							label="Starting Sum"
							bind:value={point.startingSum}
							type="number"
						/>
						<WrappedInput
							label="Id Needed To Show"
							bind:value={point.activatedId}
							placeholder="No Id Needed"
						/>
						<WrappedInput
							label="Text Before Number"
							bind:value={point.beforeText}
						/>
						<WrappedInput
							label="Text After Number"
							bind:value={point.afterText}
						/>
					</div>
					<Button onclick={() => app.pointTypes.splice(index, 1)}>Delete</Button>
				</div>
			{/each}
		</div>
		<Dialog.Footer>
			<Button
				onclick={() =>
					app.pointTypes.push({
						id: generateID(2),
						name: 'Points',
						startingSum: 0,
						activatedId: '',
						afterText: '',
						beforeText: 'Points:'
					})}
			>
				Create new Point Type
			</Button>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
