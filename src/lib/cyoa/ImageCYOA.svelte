<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { checkRequireds, cleanActivated, loadApp } from '$lib/store/actions';
	import { generateID, pi } from '$lib/store/utils';
	import {
		Brush,
		CaptionsOff,
		ChevronDown,
		ChevronLeft,
		ChevronUp,
		CircleCheckBig,
		ClipboardList,
		Copy,
		FilePlus2,
		List,
		ListTodo,
		Menu,
		PencilRuler,
		Save,
		Trash2,
		Wrench
	} from 'lucide-svelte';
	import { app, appMetaState } from '$lib/store/store.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Separator } from '$lib/components/ui/separator';
	import Load from './storage/Load.svelte';
	import ActivatedViewer from './ActivatedViewer.svelte';
	import BackpackPreview from './BackpackPreview.svelte';
	import ConfirmDialog from './ConfirmDialog.svelte';
	import RowList from './RowList.svelte';
	import Feature from './Feature.svelte';
	import Design from './Design.svelte';
	import IDSearch from './features/IDSearch.svelte';
	import type { App } from '$lib/store/types';
	import { onMount } from 'svelte';
	import { innerWidth } from 'svelte/reactivity/window';
	import Row from './Row.svelte';
	import DOMPurify from 'dompurify';
	import { goto } from '$app/navigation';
	import Filter from './style/Filter.svelte';
	import Background from './style/Background.svelte';
	import MultiChoice from './style/MultiChoice.svelte';
	import ObjectDesign from './style/ObjectDesign.svelte';
	import ObjectImage from './style/ObjectImage.svelte';
	import PointBar from './style/PointBar.svelte';
	import RowDesign from './style/RowDesign.svelte';
	import RowImage from './style/RowImage.svelte';
	import Backpack from './style/Backpack.svelte';
	import Text from './style/Text.svelte';
	import { printDiv } from '$lib/utils';
	import { backgroundImages } from './style/backgroundImageUtils';
	import { getImageURL } from '$lib/store/utils';

	const { isCreator }: { isCreator: boolean } = $props();

	let ref = $state<HTMLDivElement | null>(null);
	let confirmDeleteRow = $state<App['rows'][0] | undefined>(undefined);
	let modal = $state<
		| 'none'
		| 'appLoad'
		| 'appActivatedViewer'
		| 'appBackpackPreview'
		| 'appRowList'
		| 'appFeatures'
		| 'appDesign'
		| 'appIDSearch'
		| 'appConfirm'
	>('none');
	let topNav = $state(false);

	onMount(() => {
		if (app.styling.selFilterBgImages) {
			backgroundImages.set([...app.styling.selFilterBgImages]);
			console.log('Initial backgroundImages in ImageCYOA:', app.styling.selFilterBgImages);
		}
	});

	const navButtons = [
		{
			text: 'New Row',
			component: FilePlus2,
			action: () => {
				const styling = JSON.parse(JSON.stringify($state.snapshot(app.styling)));
				// Removes the images when a new row is created, to stop bloating.
				styling.backgroundImage = '';
				styling.rowBackgroundImage = '';
				styling.objectBackgroundImage = '';
				app.rows.push({
					id: generateID(),
					title: app.defaultRowTitle,
					titleText: app.defaultRowText,
					objectWidth: 'col-md-3',
					image: '',
					template: '1',

					// Button in row.
					isButtonRow: false, // Does the row show an image(true) or an button(false)?
					buttonType: true, // True if permanent, false if switch.
					buttonId: '', // The id of the variable that the button uses.
					buttonText: 'Click',
					buttonRandom: false,
					buttonRandomNumber: 1,

					isResultRow: false, // Is the row a result row?
					resultGroupId: '',
					isInfoRow: false, // Is the row a information row?
					isPrivateStyling: false,

					defaultAspectWidth: 1, // The default width and height for cropper aspect.
					defaultAspectHeight: 1, // The default height for cropper aspect.
					allowedChoices: 0, // Allowed choices in the array.
					currentChoices: 0, // Current selected choices in the array.
					requireds: [],
					isEditModeOn: false,
					isRequirementOpen: false,

					objects: [],
					// Styling is collected like this to make a copy, and not a pointer to the same object.
					styling: styling
				});
			}
		},
		{
			text: 'Open Row List',
			component: List,
			action: () => (modal = 'appRowList')
		},
		{
			text: 'Open Features',
			component: PencilRuler,
			action: () => (modal = 'appFeatures')
		},
		{
			text: 'Modify Design',
			component: Brush,
			action: () => (modal = 'appDesign')
		},
	{
		text: 'Save/Load Project',
		component: Save,
		action: () => {
			console.log('Save/Load Project button clicked');
			modal = 'appLoad';
			console.log('Modal state after click:', modal);
		}
	}
	] as const;

	import { base } from '$app/paths';

	onMount(() => {
		fetch(`${base}/project.json`)
			.then((r) => r.json())
			.then(loadApp)
			.catch((e) => console.info(`No local project.json found: ${e}`));
	});
</script>

<div
	class="flex flex-row pb-16 text-center"  
	bind:this={ref} 
	style:background-image={app.styling.backgroundImage
		? `url("${getImageURL(app.styling.backgroundImage, appMetaState.imagePrefix)}")`
		: null}
	style:background-color={app.styling.backgroundColor}
    style:background-attachment={app.styling.backgroundAttachment ?? 'scroll'}  
    style:background-repeat={app.styling.backgroundRepeat ?? 'no-repeat'}    
    style:background-size={app.styling.backgroundSize ?? 'auto'}                   
>
	{#if isCreator && !topNav}
		<nav class="fixed z-20 flex h-screen flex-col justify-between bg-gray-200 p-2">
			<div class="flex flex-col gap-y-2">
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger
							class={buttonVariants({ variant: 'ghost', size: 'icon' })}
							onclick={() => goto('../')}
						>
							<ChevronLeft />
						</Tooltip.Trigger>
						<Tooltip.Content>
							<span>Return To Menu</span>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
				<Separator />
				{#each navButtons as button (button.text)}
					<Tooltip.Provider>
						<Tooltip.Root>
							<Tooltip.Trigger
								class={buttonVariants({ variant: 'ghost', size: 'icon' })}
								onclick={button.action}
							>
								<button.component />
							</Tooltip.Trigger>
							<Tooltip.Content>
								<span>{button.text}</span>
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				{/each}
			</div>
			<div class="flex flex-col gap-y-2">
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger
							class={buttonVariants({ variant: 'ghost', size: 'icon' })}
							onclick={cleanActivated}
						>
							<CaptionsOff />
						</Tooltip.Trigger>
						<Tooltip.Content>
							<span>Clean Selected Choices</span>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger
							class={buttonVariants({ variant: 'ghost', size: 'icon' })}
							onclick={() => (modal = 'appIDSearch')}
						>
							<ClipboardList />
						</Tooltip.Trigger>
						<Tooltip.Content>
							<span>See ID/Title List</span>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger
							class={buttonVariants({ variant: 'ghost', size: 'icon' })}
							onclick={() => (topNav = true)}
						>
							<Menu />
						</Tooltip.Trigger>
						<Tooltip.Content>
							<span>Use Alternate Menu</span>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			</div>
		</nav>
	{/if}
	<div class={[isCreator && !topNav && 'ml-14']}>
		{#if !isCreator}
		    <!-- This block should not be displayed in viewer mode. Do not remove this comment - it prevents the Svelte compiler from throwing an empty block error -->
			<!-- @dev-only -->
			<div class="flex flex-row justify-between p-2" data-html2canvas-ignore>
				<Button variant="outline" href="../" size="icon">
					<ChevronLeft />
				</Button>
				<div class="flex flex-row gap-x-2">
					<Button onclick={() => ref && printDiv(ref)}>
						Download Image (Go all the way to the bottom to load in the pictures first)
					</Button>
					<Button onclick={() => (modal = 'appLoad')}>Load Project</Button>
				</div>
			</div>
		{:else if isCreator && topNav}
			<nav
				class="grid w-full grid-cols-8 justify-evenly gap-4 bg-gray-200 px-2.5 py-2.5"
				data-html2canvas-ignore
			>
				<Button href="../" variant="ghost">
					<ChevronLeft />
				</Button>
				<Button onclick={() => cleanActivated()} variant="ghost">De-select Choices</Button>
				<Button onclick={() => (topNav = false)} variant="ghost">
					<Menu />
				</Button>
				{#each navButtons as button (button.text)}
					<Button onclick={button.action} variant="ghost">
						{button.text}
					</Button>
				{/each}
			</nav>
		{/if}

		<div>
			{#if appMetaState.currentDesignComponent === 'appFilter'}
				<Filter
					open={appMetaState.currentDesignComponent === 'appFilter'}
					onclose={() => (appMetaState.currentDesignComponent = 'none')}
					embedded={true}
				/>
			{:else if appMetaState.currentDesignComponent === 'appBackground'}
				<Background
					open={appMetaState.currentDesignComponent === 'appBackground'}
					onclose={() => (appMetaState.currentDesignComponent = 'none')}
					embedded={true}
				/>
			{:else if appMetaState.currentDesignComponent === 'appMultiChoice'}
				<MultiChoice
					open={appMetaState.currentDesignComponent === 'appMultiChoice'}
					onclose={() => (appMetaState.currentDesignComponent = 'none')}
					embedded={true}
				/>
			{:else if appMetaState.currentDesignComponent === 'appObjectDesign'}
				<ObjectDesign
					open={appMetaState.currentDesignComponent === 'appObjectDesign'}
					onclose={() => (appMetaState.currentDesignComponent = 'none')}
					embedded={true}
				/>
			{:else if appMetaState.currentDesignComponent === 'appObjectImage'}
				<ObjectImage
					open={appMetaState.currentDesignComponent === 'appObjectImage'}
					onclose={() => (appMetaState.currentDesignComponent = 'none')}
					embedded={true}
				/>
			{:else if appMetaState.currentDesignComponent === 'appPointBar'}
				<PointBar
					open={appMetaState.currentDesignComponent === 'appPointBar'}
					onclose={() => (appMetaState.currentDesignComponent = 'none')}
					embedded={true}
				/>
			{:else if appMetaState.currentDesignComponent === 'appRowDesign'}
				<RowDesign
					open={appMetaState.currentDesignComponent === 'appRowDesign'}
					onclose={() => (appMetaState.currentDesignComponent = 'none')}
					embedded={true}
				/>
			{:else if appMetaState.currentDesignComponent === 'appRowImage'}
				<RowImage
					open={appMetaState.currentDesignComponent === 'appRowImage'}
					onclose={() => (appMetaState.currentDesignComponent = 'none')}
					embedded={true}
				/>
			{:else if appMetaState.currentDesignComponent === 'appText'}
				<Text
					open={appMetaState.currentDesignComponent === 'appText'}
					onclose={() => (appMetaState.currentDesignComponent = 'none')}
					embedded={true}
				/>
			{:else if appMetaState.currentDesignComponent === 'appBackpack'}
				<Backpack
					open={appMetaState.currentDesignComponent === 'appBackpack'}
					onclose={() => (appMetaState.currentDesignComponent = 'none')}
					embedded={true}
				/>
			{/if}
		</div>

		<!-- Navbar that holds the pointtypes and backpack -->
		{#if app.pointTypes.length > 0 || app.backpack.length > 0 || app.importedChoicesIsOpen}
			<div
				class="fixed bottom-0 left-0 right-0 z-10 flex h-14 flex-row items-center justify-around"
				data-html2canvas-ignore
				style:background-color={app.styling.barBackgroundColor}
				style:margin={app.styling.barMargin + 'px'}
				style:padding={app.styling.barPadding + 'px'}
			>
				<div>
					{#if app.importedChoicesIsOpen}
						<Button
							variant="ghost"
							size="icon"
							type="button"
							onclick={() => (modal = 'appActivatedViewer')}
						>
							<ListTodo />
						</Button>
					{/if}
				</div>
				<div class="flex flex-row items-center justify-center">
					{#each app.pointTypes.filter((el) => el.activatedId === '' || app.activated.includes(el.activatedId)) as score}
						<div
							style:color={app.styling.barTextColor}
							style:margin={app.styling.barTextMargin + 'px'}
							style:padding={app.styling.barTextPadding + 'px'}
							style:font-family={app.styling.barTextFont}
							style:font-size={app.styling.barTextSize + 'px'}
						>
							{score.beforeText}
							<span
								style:color={pi(score.startingSum) >= 0
									? typeof app.styling.barPointPos !== 'undefined'
										? app.styling.barPointPos.hex
										: ''
									: typeof app.styling.barPointNeg !== 'undefined'
										? app.styling.barPointNeg.hex
										: ''}
							>
								{Math.round(pi(score.startingSum))}
							</span>
							{score.afterText}
						</div>
					{/each}
				</div>
				<div>
					{#if app.backpack.length > 0}
						<Button
							variant="ghost"
							size="icon"
							type="button"
							onclick={() => (modal = 'appBackpackPreview')}
						>
							<CircleCheckBig />
						</Button>
					{/if}
				</div>
			</div>
		{/if}
		<Load open={modal === 'appLoad'} onclose={() => (modal = 'none')} />
		<ActivatedViewer open={modal === 'appActivatedViewer'} onclose={() => (modal = 'none')} />
		<BackpackPreview
			open={modal === 'appBackpackPreview'}
			onclose={() => (modal = 'none')}
			type=""
		/>
		<ConfirmDialog
			open={modal === 'appConfirm'}
			onclose={() => (modal = 'none')}
			onconfirm={() => {
				if (confirmDeleteRow) {
					const idx = app.rows.indexOf(confirmDeleteRow);
					app.rows.splice(idx, 1);
					confirmDeleteRow = undefined;
				}
				modal = 'none';
			}}
			text="Are you sure you want to delete this row?"
		/>
		<RowList open={modal === 'appRowList'} onclose={() => (modal = 'none')} />
		<Feature open={modal === 'appFeatures'} onclose={() => (modal = 'none')} />
		<Design open={modal === 'appDesign'} onclose={() => (modal = 'none')} />
		<IDSearch open={modal === 'appIDSearch'} onclose={() => (modal = 'none')} />
		<div class={['grid grid-cols-2', isCreator && !topNav ? 'w-[calc(100vw-3.5rem)]' : 'w-screen']}>
			<!-- This is where the rows is shown -->
			{#each app.rows as row}
				<div
					class={[
						'grid h-max pb-0 pt-0',
						(innerWidth.current ?? 0) > 1200 && row.width ? 'col-span-1' : 'col-span-2'
					]}
				>
					<div>
						{#if isCreator}
							<div
								class="mx-2 mt-2 flex flex-row items-center justify-between rounded border bg-gray-400 px-4 py-4"
							>
								<div>
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									<b class="text-xl">{@html DOMPurify.sanitize(row.title)}</b>
								</div>
								<div class="flex flex-row gap-x-2">
									<Tooltip.Provider>
										<Tooltip.Root>
											<Tooltip.Trigger
												class={buttonVariants({ variant: 'ghost', size: 'icon' })}
												onclick={() => (row.isEditModeOn = !row.isEditModeOn)}
											>
												<Wrench />
											</Tooltip.Trigger>
											<Tooltip.Content>
												<span>Edit Row</span>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
									<Tooltip.Provider>
										<Tooltip.Root>
											<Tooltip.Trigger
												class={buttonVariants({ variant: 'ghost', size: 'icon' })}
												onclick={() => {
													confirmDeleteRow = row;
													modal = 'appConfirm';
												}}
											>
												<Trash2 />
											</Tooltip.Trigger>
											<Tooltip.Content>
												<span>Delete Row</span>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
									<Tooltip.Provider>
										<Tooltip.Root>
											<Tooltip.Trigger
												class={buttonVariants({ variant: 'ghost', size: 'icon' })}
												onclick={() => {
													const rowIdx = app.rows.indexOf(row);
													app.rows.splice(
														rowIdx + 1,
														0,
														JSON.parse(JSON.stringify($state.snapshot(row)))
													);
													app.rows[rowIdx + 1].id = generateID();
													for (const object of app.rows[rowIdx + 1].objects) {
														object.id = generateID();
													}
												}}
											>
												<Copy />
											</Tooltip.Trigger>
											<Tooltip.Content>
												<span>Clone Row</span>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
									<Tooltip.Provider>
										<Tooltip.Root>
											<Tooltip.Trigger
												class={buttonVariants({ variant: 'ghost', size: 'icon' })}
												onclick={() => {
													const rowIdx = app.rows.indexOf(row);
													if (rowIdx === 0) return;
													const el = app.rows[rowIdx];
													app.rows[rowIdx] = app.rows[rowIdx - 1];
													app.rows[rowIdx - 1] = el;
												}}
											>
												<ChevronUp />
											</Tooltip.Trigger>
											<Tooltip.Content>
												<span>Move Row Up</span>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
									<Tooltip.Provider>
										<Tooltip.Root>
											<Tooltip.Trigger
												class={buttonVariants({ variant: 'ghost', size: 'icon' })}
												onclick={() => {
													const rowIdx = app.rows.indexOf(row);
													if (rowIdx === app.rows.length - 1) return;
													const el = app.rows[rowIdx];
													app.rows[rowIdx] = app.rows[rowIdx + 1];
													app.rows[rowIdx + 1] = el;
												}}
											>
												<ChevronDown />
											</Tooltip.Trigger>
											<Tooltip.Content>
												<span>Move Row Down</span>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
								</div>
							</div>
						{/if}
						{#if isCreator || checkRequireds(row)}
							<Row {row} type="" {isCreator} />
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
