<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import { app } from '$lib/store/store.svelte';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();

	// Will make every id's in rows and choices to the titles, if the titles has two letters or more.
	function idToTitle() {
		for (const row of app.rows) {
			if (row.id.length > 2 && row.title != app.defaultRowTitle) row.id = row.title;
			for (const object of row.objects)
				if (object.id.length > 2 && object.title != app.defaultChoiceTitle)
					object.id = object.title;
		}
	}
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="max-h-screen overflow-y-auto sm:max-w-[1300px]">
		<Dialog.Header>
			<Dialog.Title>Project Defaults</Dialog.Title>
		</Dialog.Header>
		<div class="mx-auto grid w-max grid-cols-3 gap-8 py-4">
			<div class="flex flex-col gap-y-2">
				<h6>Row</h6>
				<WrappedInput
					label="Row Title"
					bind:value={app.defaultRowTitle}
					placeholder="Empty"
				/>
				<WrappedInput
					label="Row Text"
					bind:value={app.defaultRowText}
					placeholder="Empty"
				/>
			</div>
			<div class="flex flex-col gap-y-2">
				<h6>Addon</h6>
				<WrappedInput
					label="Addon Title"
					bind:value={app.defaultAddonTitle}
					placeholder="Empty"
				/>
				<WrappedInput
					label="Addon Text"
					bind:value={app.defaultAddonText}
					placeholder="Empty"
				/>
			</div>
			<div class="flex flex-col gap-y-2">
				<h6>Points</h6>
				<WrappedInput
					label="Before Points Text"
					bind:value={app.defaultBeforePoint}
					placeholder="Empty"
				/>
				<WrappedInput
					label="After Points Text"
					bind:value={app.defaultAfterPoint}
					placeholder="Empty"
				/>
			</div>
			<div class="flex flex-col gap-y-2">
				<h6>Choice</h6>
				<WrappedInput
					label="Choice Title"
					bind:value={app.defaultChoiceTitle}
					placeholder="Empty"
				/>
				<WrappedInput
					label="Choice Text"
					bind:value={app.defaultChoiceText}
					placeholder="Empty"
				/>
			</div>
			<div class="flex flex-col gap-y-2">
				<h6>Requirement</h6>
				<WrappedInput
					label="Before Required Text"
					bind:value={app.defaultBeforeReq}
					placeholder="Empty"
				/>
				<WrappedInput
					label="After Required Text"
					bind:value={app.defaultAfterReq}
					placeholder="Empty"
				/>
			</div>
			<div class="flex flex-col gap-y-2">
				<p class="max-w-64 text-sm">
					Clicking this will change the id of all of the choices and rows where the title is longer
					than 2 letters, or the default title, into the title, which can make it easier to manage
					on larger projects with large amounts of requirements being used.
				</p>
				<Button onclick={() => idToTitle()}>change Ids to titles</Button>
			</div>
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
