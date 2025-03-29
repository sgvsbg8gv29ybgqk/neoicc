<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import * as Table from '$lib/components/ui/table';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import { loadApp } from '$lib/store/actions';
	import { app, appMetaState } from '$lib/store/store.svelte';
	import type { App } from '$lib/store/types';
	import { base64ToBlob } from '$lib/utils';
	import JSZip from 'jszip';
	import { onMount } from 'svelte';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();

	onMount(() => {
		console.log('Load component mounted, open state:', open);
	});

	$effect(() => {
		console.log('Load component open state changed:', open);
	});

	// Loads the file when the file input is changed.
	function uploadFile(files: FileList | null) {
		const item = files?.item(0);
		if (!item) return;
		console.log(item);
		const reader = new FileReader();
		reader.onload = () => loadApp(JSON.parse(reader.result as string));
		reader.readAsText(item);
	}

	// Saves the app-object down to a JSON-file.
	function saveFile(filename: string) {
		const data = JSON.stringify(app);
		const blob = new Blob([data], { type: 'text/plain' });
		const a = document.createElement('a');
		const url = URL.createObjectURL(blob);
		a.href = url;
		a.download = filename + '.json';
		document.body.appendChild(a);
		a.click();
		setTimeout(() => {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}

	function getMime(e: string) {
		return e.match(/^data:(image\/[^;]+);/)?.[1] as string;
	}

	function getExt(e: string) {
		var ext = e.split('/')[1];
		const mt: Record<string, string> = {
			'svg+xml': 'svg',
			'vnd.microsoft.icon': 'ico',
			'x-icon': 'ico'
		};
		return mt[ext] ? mt[ext] : ext;
	}

	// Saves the app-object down to a JSON-file.
	function saveFileFinished(filename: string) {
		const zip = new JSZip();
		const tempApp: App = JSON.parse(JSON.stringify(app));

		function saveImage(img: string, fname: string): string {
			if (img.length <= 30) return img;
			const mime = getMime(img);
			const ext = getExt(mime);
			const blab = base64ToBlob(img.split(',')[1], mime);
			const actualName = `${fname}.${ext}`;
			zip.file(actualName, blab, { binary: true });
			return actualName;
		}

		if (tempApp.styling.backgroundImage)
			tempApp.styling.backgroundImage = saveImage(tempApp.styling.backgroundImage, 'images/Bg');
		if (tempApp.styling.rowBackgroundImage)
			tempApp.styling.rowBackgroundImage = saveImage(
				tempApp.styling.rowBackgroundImage,
				'images/RBg'
			);
		if (tempApp.styling.objectBackgroundImage)
			tempApp.styling.objectBackgroundImage = saveImage(
				tempApp.styling.objectBackgroundImage,
				'images/OBg'
			);
		if (tempApp.styling.rowBorderImage)
			tempApp.styling.rowBorderImage = saveImage(tempApp.styling.rowBorderImage, 'images/RB');
		if (tempApp.styling.objectBorderImage)
			tempApp.styling.objectBorderImage = saveImage(tempApp.styling.objectBorderImage, 'images/OB');

		// Save background images for activated objects
		if (tempApp.styling.backgroundImages) {
			tempApp.styling.backgroundImages = tempApp.styling.backgroundImages.map((img, index) =>
				saveImage(img, `images/ActivatedBg_${index}`)
			);
		}

		// Row image
		for (let i = 0; i < tempApp.rows.length; i++) {
			const row = tempApp.rows[i];

			if (row.styling?.rowBackgroundImage)
				row.styling.rowBackgroundImage = saveImage(
					row.styling.rowBackgroundImage,
					`images/R${i + 1}_RBg`
				);
			if (row.styling?.objectBackgroundImage)
				row.styling.objectBackgroundImage = saveImage(
					row.styling.objectBackgroundImage,
					`images/R${i + 1}_OBg`
				);
			if (row.styling?.rowBorderImage)
				row.styling.rowBorderImage = saveImage(row.styling.rowBorderImage, `images/R${i + 1}_RB`);
			if (row.styling?.objectBorderImage)
				row.styling.objectBorderImage = saveImage(
					row.styling.objectBorderImage,
					`images/R${i + 1}_OB`
				);
			if (row.image) row.image = saveImage(row.image, `images/R${i + 1}`);

			// Choice Image
			for (let j = 0; j < row.objects.length; j++) {
				const object = row.objects[j];

				if (object.styling?.objectBackgroundImage)
					object.styling.objectBackgroundImage = saveImage(
						object.styling.objectBackgroundImage,
						`images/R${i + 1}C${j + 1}_OBg`
					);
				if (object.styling?.objectBorderImage)
					object.styling.objectBorderImage = saveImage(
						object.styling.objectBorderImage,
						`images/R${i + 1}C${j + 1}_OB`
					);
				if (object.image) object.image = saveImage(object.image, `images/R${i + 1}C${j + 1}`);

				// Addon Image
				for (let k = 0; k < object.addons.length; k++) {
					const addon = object.addons[k];
					if (addon.image)
						addon.image = saveImage(addon.image, `images/R${i + 1}C${j + 1}A${k + 1}`);
				}
			}
		}

		for (let i = 0; i < tempApp.backpack.length; i++) {
			const row = tempApp.backpack[i];
			if (row.image) row.image = saveImage(row.image, `images/BR${i + 1}`);
			if (row.styling?.rowBackgroundImage)
				row.styling.rowBackgroundImage = saveImage(
					row.styling.rowBackgroundImage,
					`images/BR${i + 1}_RBg`
				);
			if (row.styling?.objectBackgroundImage)
				row.styling.objectBackgroundImage = saveImage(
					row.styling.objectBackgroundImage,
					`images/BR${i + 1}_OBg`
				);
			if (row.styling?.rowBorderImage)
				row.styling.rowBorderImage = saveImage(row.styling.rowBorderImage, `images/BR${i + 1}_RB`);
			if (row.styling?.objectBorderImage)
				row.styling.objectBorderImage = saveImage(
					row.styling.objectBorderImage,
					`images/BR${i + 1}_OB`
				);
			for (let j = 0; j < row.objects.length; j++) {
				const object = row.objects[j];
				if (object.image) object.image = saveImage(object.image, `images/BR${i + 1}C${j + 1}`);
				if (object.styling?.objectBackgroundImage)
					object.styling.objectBackgroundImage = saveImage(
						object.styling.objectBackgroundImage,
						`images/BR${i + 1}C${j + 1}_OBg`
					);
				if (object.styling?.objectBorderImage)
					object.styling.objectBorderImage = saveImage(
						object.styling.objectBorderImage,
						`images/BR${i + 1}C${j + 1}_OB`
					);
				for (let k = 0; k < object.addons.length; k++) {
					const addon = object.addons[k];
					if (addon.image)
						addon.image = saveImage(addon.image, `images/BR${i + 1}C${j + 1}A${k + 1}`);
				}
			}
		}

		const data = JSON.stringify(tempApp);
		const blob = new Blob([data], { type: 'text/plain' });

		zip.file(filename + '.json', blob);

		zip.generateAsync({ type: 'blob' }).then(function (blob) {
			const a = document.createElement('a');
			const url = URL.createObjectURL(blob);
			a.href = url;
			a.download = 'CYOA.zip';
			document.body.appendChild(a);
			a.click();
			setTimeout(() => {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		});
	}

	const {
		characters: characterCount,
		choices: choicesCount,
		images: imagesCount,
		rows: rowsCount,
		biggestImage,
		smallestImage
	} = $derived.by(() => {
		let biggestPicture = 0;
		let biggestPictureTitle;
		let smallestPicture = 0;
		let smallestPictureTitle;

		let characters = 0;
		let choices = 0;
		let images = 0;

		for (const row of app.rows) {
			choices += row.objects.length;
			if (typeof row.titleText !== 'undefined') {
				characters += row.titleText.length;
				characters += row.title.length;
			}
			if (row.image.length != 0) images++;

			for (const object of row.objects) {
				if (object.image.length != 0) {
					images++;
					const stringLength = object.image.length - 'data:image/webp;base64,'.length;
					const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
					// if (Math.floor(sizeInBytes / 1000) > 400) {
					// console.log(Math.floor(sizeInBytes / 1000) + " KB, " + object.title);
					// }
					if (biggestPicture < sizeInBytes) {
						biggestPicture = sizeInBytes;
						biggestPictureTitle = object.title;
					} else if (smallestPicture > sizeInBytes || smallestPicture == 0) {
						smallestPicture = sizeInBytes;
						smallestPictureTitle = object.title;
					}
				}
				if (typeof object.text !== 'undefined') {
					characters += object.title.length;
					characters += object.text.length;

					for (const addon of object.addons) {
						characters += addon.title.length;
						characters += addon.text.length;
					}
				}
			}
		}

		const biggestImage = Math.floor(biggestPicture / 1000) + ' KB, ' + biggestPictureTitle;
		const smallestImage = Math.floor(smallestPicture / 1000) + ' KB, ' + smallestPictureTitle;

		return {
			characters,
			choices,
			images,
			rows: app.rows.length,
			biggestImage,
			smallestImage
		};
	});
</script>

<Dialog.Root {open} onOpenChange={(a) => !a && onclose()}>
	<Dialog.Content class="max-w-2xl">
		<Dialog.Header>
			<Dialog.Title>Load/Save Project</Dialog.Title>
			<Dialog.Description>This is where you can load/save projects</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="flex flex-col gap-y-2">
				<WrappedInput
					label="Load Project"
					type="file"
					onchange={(e) => uploadFile((e.target as unknown as { files: FileList })?.files)}
				/>
				<WrappedInput
					class="w-full"
					label="Optional Image Prefix (Enter the full URL of the website, including the slash at the end)"
					bind:value={appMetaState.imagePrefix}
					placeholder="https://example.com/"
				/>
			</div>
			<Button onclick={() => saveFile('project')}>Save Project</Button>
			<p class="text-sm">
				You can use the button below to save when you have finished your project, it will keep the
				images separated from the JSON. Do not overwrite your project, as the new JSON-file inside
				the zip this downloads will have no pictures if loaded into the Creator. Place the JSON into
				the app-file like normal, and the images-folder besides the other folders. If the project
				has a lot of images then they might end up not showing when someone loads on the page, if so
				then just use the normal way, and use Image Compression in features to reduce the size of
				the project file.
			</p>
			<Button onclick={() => saveFileFinished('project')} class="w-full">
				Download Finished Project with separate images
			</Button>
			<Separator />
			<h2 class="text-lg font-semibold leading-none tracking-tight">Project Stats</h2>
			<Table.Root>
				<Table.Body>
					<Table.Row>
						<Table.Cell class="w-max text-nowrap p-1">Character Count</Table.Cell>
						<Table.Cell class="w-full p-1">{characterCount} Characters</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="w-max text-nowrap p-1">Choices Count</Table.Cell>
						<Table.Cell class="w-full p-1">{choicesCount} Choices</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="w-max text-nowrap p-1">Images Count</Table.Cell>
						<Table.Cell class="w-full p-1">{imagesCount} Images</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="w-max text-nowrap p-1">Rows Count</Table.Cell>
						<Table.Cell class="w-full p-1">{rowsCount} Rows</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="w-max text-nowrap p-1">Biggest Picture</Table.Cell>
						<Table.Cell class="w-full p-1">{biggestImage}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="w-max text-nowrap p-1">Smallest Picture</Table.Cell>
						<Table.Cell class="w-full p-1">{smallestImage}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="w-max text-nowrap p-1">Time Guesstimate</Table.Cell>
						<Table.Cell class="w-full p-1">
							{Math.floor(imagesCount * 5 + characterCount / 175)} Minutes/
							{Math.floor((imagesCount * 5 + characterCount / 175) / 60)} Hours <br />
							(175 Characters Per Minute,
							<br />5 Minutes Per Picture)
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</div>
	</Dialog.Content>
</Dialog.Root>
