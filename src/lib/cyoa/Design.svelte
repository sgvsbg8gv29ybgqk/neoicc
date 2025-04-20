<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import Filter from './style/Filter.svelte';
	import Text from './style/Text.svelte';
	import ObjectImage from './style/ObjectImage.svelte';
	import RowImage from './style/RowImage.svelte';
	import Background from './style/Background.svelte';
	import ObjectDesign from './style/ObjectDesign.svelte';
	import RowDesign from './style/RowDesign.svelte';
	import PointBar from './style/PointBar.svelte';
	import Backpack from './style/Backpack.svelte';
	import MultiChoice from './style/MultiChoice.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import DOMPurify from 'dompurify';
	import { appMetaState } from '$lib/store/store.svelte';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();

	let modal = $state<
		| 'none'
		| 'appFilter'
		| 'appText'
		| 'appObjectImage'
		| 'appBackground'
		| 'appObjectDesign'
		| 'appRowDesign'
		| 'appPointBar'
		| 'appBackpack'
		| 'appRowImage'
		| 'appMultiChoice'
	>('none');

	const designComponentButtons = [
		{
			component: 'appObjectDesign',
			text: 'Manage Choice Design',
			tooltip: ' Here you can change the margin,<br />padding, borders, and drop-shadow on choices.'
		},
		{
			component: 'appRowDesign',
			text: 'Manage Row Design',
			tooltip: 'Here you can change the margin, <br />padding, borders, and drop-shadow on rows.'
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
			component: 'appFilter',
			text: 'Manage Filter Design',
			tooltip:
				"Here you can change the filters for choices that are selected<br />and the one's you dont have the requirements for."
		},
		{
			component: 'appBackground',
			text: 'Manage Background Design',
			tooltip:
				'Here you can change the color and place images in <br />the background of rows, choices and the whole project.'
		},
		{
			component: 'appText',
			text: 'Manage Text Design',
			tooltip: 'Here you can change the size, font and<br />color of the text on titles and text.'
		},
		{
			component: 'appPointBar',
			text: 'Manage Point-Bar Design',
			tooltip:
				'Here you can change the color, postition and font of the <br />bar that holds the created points.'
		},
		{
			component: 'appMultiChoice',
			text: 'Manage Multi Choice Design',
			tooltip:
				'Here you can change the color, size and font of the <br /> choices that can be selected multiple times.'
		},
		{
			component: 'appBackpack',
			text: 'Manage Backpack Design',
			tooltip: 'Here you can change the backpack.'
		}
	] as const;
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="sm:max-w-[800px]">   <!-- note for datk mode! -->
		<Dialog.Header>
			<Dialog.Title>Design</Dialog.Title>
			<Dialog.Description>Hover over the buttons to see what they do.</Dialog.Description>
		</Dialog.Header>
		<div class="grid grid-cols-2 gap-4 py-4">
			{#each designComponentButtons as button}
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger
							class={buttonVariants()}
							onclick={() => (appMetaState.currentDesignComponent = button.component)}
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
			{/each}
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Filter open={modal === 'appFilter'} onclose={() => (modal = 'none')} />
<Text open={modal === 'appText'} onclose={() => (modal = 'none')} />
<ObjectImage open={modal === 'appObjectImage'} onclose={() => (modal = 'none')} />
<Background open={modal === 'appBackground'} onclose={() => (modal = 'none')} />
<ObjectDesign open={modal === 'appObjectDesign'} onclose={() => (modal = 'none')} />
<RowDesign open={modal === 'appRowDesign'} onclose={() => (modal = 'none')} />
<PointBar open={modal === 'appPointBar'} onclose={() => (modal = 'none')} />
<Backpack open={modal === 'appBackpack'} onclose={() => (modal = 'none')} />
<RowImage open={modal === 'appRowImage'} onclose={() => (modal = 'none')} />
<MultiChoice open={modal === 'appMultiChoice'} onclose={() => (modal = 'none')} />
