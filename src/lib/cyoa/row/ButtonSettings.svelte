<script lang="ts">
	import type { Row } from '$lib/store/types';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import { app } from '$lib/store/store.svelte';
	import { Switch } from '$lib/components/ui/switch';

	const { open, onclose, row }: { open: boolean; onclose: () => void; row: Row } = $props();
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Button Settings</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="flex flex-col gap-y-4">
				<!-- The number of random choices that will be selected -->
				<WrappedInput
					label="Button Text"
					bind:value={row.buttonText}
				/>

				<div>
					<RadioGroup.Root
						bind:value={() => row.buttonTypeRadio ?? '', (v) => (row.buttonTypeRadio = v)}
					>
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value="sumaddon" id="button-settings-point-type-sum-addon-radio" />
							<Label for="button-settings-point-type-sum-addon-radio">Point Type Sum Addon</Label>
						</div>
						<div class="flex items-center space-x-2">
							<RadioGroup.Item value="choiceselect" id="button-settings-other-radio" />
							<Label for="button-settings-other-radio">Other</Label>
						</div>
					</RadioGroup.Root>
				</div>
				{#if row.buttonTypeRadio === 'choiceselect'}
					{#if !row.buttonRandom}
						<WrappedSelect
							label="Variable"
							items={app.variables.map((e) => ({ value: e.id, name: e.id }))}
							bind:value={row.buttonId}
							placeholder="Variable"
						/>
					{/if}
					{#if row.buttonRandom && !row.isWeightedRandom}
						<WrappedInput
							label="Number of random choices that will be selected"
							type="number"
							bind:value={row.buttonRandomNumber}
						/>
					{/if}
					<div class="flex items-center gap-x-2">
						<Switch
							id="button-settings-button-random"
							bind:checked={() => row.buttonRandom ?? false, (v) => (row.buttonRandom = v)}
						/>
						<Label for="button-settings-button-random">Random or Variable?</Label>
					</div>
					{#if row.buttonRandom}
						<div class="flex items-center gap-x-2">
							<Switch
								id="button-settings-uniform-or-weighted"
								bind:checked={() => row.isWeightedRandom ?? false,
								(v) => (row.isWeightedRandom = v)}
							/>
							<Label for="button-settings-uniform-or-weighted">Uniform or Weighted?</Label>
						</div>
						<div class="flex items-center gap-x-2">
							<Switch
								id="button-settings-only-unselected-choices"
								bind:checked={() => row.onlyUnselectedChoices ?? false,
								(v) => (row.onlyUnselectedChoices = v)}
							/>
							<Label for="button-settings-only-unselected-choices">Only unselected choices?</Label>
						</div>
						<div class="flex items-center gap-x-2">
							<Switch
								id="button-settings-no-choices-selected"
								bind:checked={() => row.onlyIfNoChoices ?? false, (v) => (row.onlyIfNoChoices = v)}
							/>
							<Label for="button-settings-no-choices-selected">
								Button can only be pressed if no choices is selected?
							</Label>
						</div>
					{:else}
						<div class="flex items-center gap-x-2">
							<Switch id="button-settings-button-type-toggleable" bind:checked={row.buttonType} />
							<Label for="button-settings-button-type-toggleable">Toggleable?</Label>
						</div>
					{/if}
				{:else if row.buttonTypeRadio === 'sumaddon'}
					<div class="flex items-center gap-x-2">
						<Switch
							id="button-settings-point-type-sum-addon"
							bind:checked={() => row.btnPointAddon ?? false, (v) => (row.btnPointAddon = v)}
						/>
						<Label for="button-settings-point-type-sum-addon">
							Button will add a sum to a Point-type
						</Label>
					</div>
					{#if row.btnPointAddon}
						<WrappedSelect
							label="Point-Type to use"
							items={app.pointTypes.map((e) => ({ value: e.id, name: e.name }))}
							bind:value={row.pointTypeRandom}
							placeholder="Point Type"
						/>
						<WrappedInput
							label="Random Min"
							type="number"
							bind:value={row.randomMin}
						/>
						<WrappedInput
							label="Random Max"
							type="number"
							bind:value={row.randomMax}
						/>
					{/if}
				{/if}
			</div>
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
