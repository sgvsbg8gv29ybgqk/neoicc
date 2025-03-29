<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import { app } from '$lib/store/store.svelte';
	import imageCompression from 'browser-image-compression';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();

	const symbols = [
		{ symbol: '✅' },
		{ symbol: '✓' },
		{ symbol: '✔' },
		{ symbol: '🗸' },
		{ symbol: '☑' },
		{ symbol: '🗹' },

		{ symbol: '♂' },
		{ symbol: '♀' },
		{ symbol: '⚥' },
		{ symbol: '⚢' },
		{ symbol: '⚣' },
		{ symbol: '⚤' },
		{ symbol: '⚦' },
		{ symbol: '⚧' },
		{ symbol: '⚨' },
		{ symbol: '⚩' },

		{ symbol: '•' },
		{ symbol: '◘' },
		{ symbol: '○' },
		{ symbol: '◙' },
		{ symbol: '•' },
		{ symbol: '‣' },
		{ symbol: '⁃' },
		{ symbol: '⁌' },
		{ symbol: '⁍' },
		{ symbol: '◘' },
		{ symbol: '◦' },
		{ symbol: '⦾' },
		{ symbol: '⦿' },

		{ symbol: '♥' },
		{ symbol: '♡' },
		{ symbol: '🖤' },
		{ symbol: '💙' },
		{ symbol: '💚' },
		{ symbol: '💛' },
		{ symbol: '💜' },
		{ symbol: '🧡' },
		{ symbol: '🤍' },
		{ symbol: '🤎' },
		{ symbol: '❣' },
		{ symbol: '❤' },
		{ symbol: '❥' },
		{ symbol: '🎔' },
		{ symbol: '💓' },
		{ symbol: '💔' },
		{ symbol: '💖' },
		{ symbol: '💗' },
		{ symbol: '💕' },
		{ symbol: '💞' },
		{ symbol: '💘' },

		{ symbol: '↑' },
		{ symbol: '↓' },
		{ symbol: '→' },
		{ symbol: '←' },
		{ symbol: '↔' },
		{ symbol: '↕' },
		{ symbol: '↨' },
		{ symbol: '▲' },
		{ symbol: '▼' },
		{ symbol: '►' },
		{ symbol: '◄' },
		{ symbol: '⤴' },
		{ symbol: '⤵' },
		{ symbol: '↩' },
		{ symbol: '↪' },
		{ symbol: '🏹' },

		{ symbol: '⭐' },
		{ symbol: '★' },
		{ symbol: '☆' },
		{ symbol: '★' },
		{ symbol: '✯' }
	];

	let maxSize = $state(100);
	let imageCounter = $state(0);
	let sizeReduced = $state(0);

	function cleanAllStyles() {
		for (const row of app.rows) row.styling = app.styling;
	}

	async function compressImage(image: string): Promise<string | undefined> {
		const stringLength = image.length - 'data:image/webp;base64,'.length;
		const sizeInKBytes = 4 * Math.round(Math.ceil(stringLength / 3) * 0.5624896334383812 * 1000);
		if (image.length === 0 || sizeInKBytes <= maxSize) return;

		// convert base64 to raw binary data held in a string
		// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
		const byteString = atob(image.split(',')[1]);

		// separate out the mime component
		const mimeString = image.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to an ArrayBuffer
		const ab = new ArrayBuffer(byteString.length);

		// create a view into the buffer
		const ia = new Uint8Array(ab);

		// set the bytes of the buffer to the correct values
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		// write the ArrayBuffer to a blob, and you're done
		const blob = new Blob([ab], { type: mimeString });

		const file = new File([blob], 'image.webp', { type: mimeString });
		const newFile = await imageCompression(file, {
			maxSizeMB: maxSize / 1000, // the max size in MB, defaults to 2MB
			maxWidthOrHeight: 1920, // the max width or height of the output image, defaults to 1920px
			initialQuality: 0.75 // the initial quality of the image, max is 1
		});
		imageCounter++;
		sizeReduced += file.size / 1000000 - newFile.size / 1000000;
		const reader = new FileReader();
		reader.readAsDataURL(newFile);
		return new Promise<string>((resolve) => {
			reader.onloadend = () => {
				resolve(reader.result as string);
			};
		});
	}

	const COMPRESSION_CONCURRENCY = 16;

	async function compressAllImages() {
		let processing = 0;
		let finished = 0;
		for (const row of app.rows) {
			processing++;
			while (processing - finished > COMPRESSION_CONCURRENCY)
				await new Promise((resolve) => setTimeout(resolve, 100));
			console.log('Compressing row', row.id);
			compressImage(row.image).then((newImage) => {
				if (newImage) row.image = newImage;
				finished++;
			});
			for (const object of row.objects) {
				processing++;
				while (processing - finished > COMPRESSION_CONCURRENCY)
					await new Promise((resolve) => setTimeout(resolve, 100));
				console.log('Compressing object', object.id);
				compressImage(object.image).then((newImage) => {
					if (newImage) object.image = newImage;
					finished++;
				});
			}
		}
		console.log('Finished compressing all images');
	}
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="max-h-screen overflow-y-auto sm:max-w-[1300px]">
		<Dialog.Header>
			<Dialog.Title>Symbols and Image Compression</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div>
				{#each symbols as symbol}
					<span class="p-[5px] text-3xl">{symbol.symbol}</span>
				{/each}
				<p>
					More can be found on <a target="_blank" href="https://www.alt-codes.net/">
						https://www.alt-codes.net/
					</a>
				</p>
			</div>
			<div class="flex flex-col gap-y-2">
				<Button onclick={() => compressAllImages()}>Compress All Images</Button>
				<p>
					This will reduce the size and quality of every image in your project that is above the
					size in the text field below, down to lower than that size. Before you do this, make a
					backup, and you'll probably want to keep working on an uncompressed project file, as you
					might want a version with high-quality images later. Compressing below 100 Kb with 200+
					images might freeze your browser.
				</p>
				<div class="flex flex-row items-center gap-x-2">
					<WrappedInput
						label="Max Size of Images after compress (KB)"
						bind:value={maxSize}
						suffix="KB"
					/>
					<p class="w-full">
						{imageCounter} Images Compressed | Size Reduced By {Math.round(sizeReduced)} MB
					</p>
				</div>
			</div>
			<Button onclick={() => cleanAllStyles()}>Clean All Styles Of Choices</Button>
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
