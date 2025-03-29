<script lang="ts">
	import type { Addon, Object, Row } from '$lib/store/types';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { centerCrop, SvelteCrop, type PixelCrop } from '$lib/crop';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';

	const { open, onclose, obj }: { open: boolean; onclose: () => void; obj: Row | Object | Addon } =
		$props();

	async function getDataURL(image: HTMLImageElement, crop: PixelCrop, scale = 100, quality = 100) {
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		const offscreen = new OffscreenCanvas(
			crop.width * scaleX * (scale / 100),
			crop.height * scaleY * (scale / 100)
		);
		const ctx = offscreen.getContext('2d');
		if (!ctx) throw new Error('No 2d context in offscreen canvas');
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = 'high';

		const cropX = crop.x * scaleX * 1;
		const cropY = crop.y * scaleY * 1;

		ctx.save();

		ctx.scale(scale / 100, scale / 100);
		ctx.translate(-cropX, -cropY);
		ctx.drawImage(
			image,
			0,
			0,
			image.naturalWidth,
			image.naturalHeight,
			0,
			0,
			image.naturalWidth,
			image.naturalHeight
		);

		ctx.restore();

		const blob = await offscreen.convertToBlob({ type: 'image/webp', quality: quality / 100 });
		const url = await new Promise<string>((resolve) => {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = function () {
				resolve(reader.result as string);
			};
		});
		return {
			url,
			size: blob.size,
			originalSize: 4 * Math.ceil(image.src.length / 3) * 0.5624896334383812,
			width: crop.width * (scale / 100),
			height: crop.height * (scale / 100)
		};
	}

	let crop = $state<PixelCrop | undefined>();
	let imgSrc = $state<string>('');
	let aspect = $state<number | undefined>(1);
	let selectAspect = $state<string>('1:1');
	let inputAspectWidth = $state<string>('1');
	let inputAspectHeight = $state<string>('1');
	let scale = $state<number>(100);
	let quality = $state<number>(100);
	let tooltip = $state<string>('');
	let resultImage = $state<
		| {
				url: string;
				size: number;
				originalSize: number;
				width: number;
				height: number;
		  }
		| undefined
	>();
	let currentTab = $state<'upload' | 'external'>('upload');
	let imageRef = $state<HTMLImageElement | null>(null);

	$effect(() => {
		if (!open) return;
		const w = obj.defaultAspectWidth;
		const h = obj.defaultAspectHeight;
		if (w && h) {
			const parsedW = typeof w === 'string' ? parseInt(w) : w;
			const parsedH = typeof h === 'string' ? parseInt(h) : h;
			aspect = parsedW / parsedH;
			inputAspectWidth = parsedW.toString();
			inputAspectHeight = parsedH.toString();
			if (parsedW === parsedH) selectAspect = '1:1';
			else if (parsedW === 3 && parsedH === 2) selectAspect = '3:2';
			else if (parsedW === 4 && parsedH === 3) selectAspect = '4:3';
			else if (parsedW === 16 && parsedH === 9) selectAspect = '16:9';
			else if (parsedW === 9 && parsedH === 16) selectAspect = '9:16';
			else selectAspect = 'custom';
		}
		if (!imgSrc && obj.image) {
			if (obj.image.length < 100) currentTab = 'external';
			imgSrc = obj.image;
		}
		if (!tooltip && obj.imageSourceTooltip) tooltip = obj.imageSourceTooltip;
	});

	function handleSelectAspectChange(value: string) {
		selectAspect = value;
		if (value === 'custom' || value === '') {
			aspect = 1;
			inputAspectWidth = '1';
			inputAspectHeight = '1';
			return;
		} else if (value === 'unbound') {
			aspect = undefined;
			inputAspectWidth = '';
			inputAspectHeight = '';
			return;
		}
		const [width, height] = value.split(':').map(Number);
		aspect = width / height;
		inputAspectWidth = width.toString();
		inputAspectHeight = height.toString();
	}

	function handleInputAspectWidthChange(value: string) {
		inputAspectWidth = value;
		if (!inputAspectHeight || !value) {
			selectAspect = 'unbound';
			aspect = undefined;
			return;
		}
		if (selectAspect !== 'custom') selectAspect = 'custom';
		aspect = Number(value) / Number(inputAspectHeight);
	}

	function handleInputAspectHeightChange(value: string) {
		inputAspectHeight = value;
		if (!inputAspectWidth || !value) {
			selectAspect = 'unbound';
			aspect = undefined;
			return;
		}
		if (selectAspect !== 'custom') selectAspect = 'custom';
		aspect = Number(inputAspectWidth) / Number(value);
	}

	function handleUploadImageChange(image: FileList | null) {
		if (!image) {
			imgSrc = '';
			return;
		}
		const reader = new FileReader();
		reader.onload = () => (imgSrc = reader.result as string);
		reader.readAsDataURL(image[0]);
	}

	function handleImageLoad(image: HTMLImageElement) {
		const newAspect = aspect ?? 1;
		const constrainedHeight = image.height * newAspect <= image.width;
		crop = centerCrop(
			{
				unit: 'px',
				width: constrainedHeight ? image.height * newAspect : image.width,
				height: constrainedHeight ? image.height : image.width / newAspect
			},
			image.width,
			image.height
		);
	}

	let timeoutRef: ReturnType<typeof setTimeout> | null = null;
	$effect(() => {
		if (!open) return;
		(() => [crop, imgSrc, imageRef, scale, quality])();
		clearTimeout(timeoutRef ?? undefined);
		timeoutRef = setTimeout(() => {
			(async () => {
				if (currentTab === 'external') return;
				if (!crop || !imgSrc || !imageRef) {
					resultImage = undefined;
					return;
				}
				const dataURL = await getDataURL(imageRef, crop, scale, quality);
				resultImage = dataURL;
			})();
		}, 100);
	});

	function setImage(image: string, aspectWidth?: number, aspectHeight?: number, tooltip?: string) {
		if (aspectWidth && aspectHeight) {
			obj.defaultAspectWidth = aspectWidth;
			obj.defaultAspectHeight = aspectHeight;
		}
		obj.image = image;
		obj.imageSourceTooltip = tooltip;
	}

	function handleSaveChanges() {
		if (currentTab === 'external') {
			setImage(imgSrc, undefined, undefined, tooltip ? tooltip : undefined);
			onclose();
			return;
		}
		if (!resultImage) {
			setImage('');
		} else if (resultImage.url) {
			if (inputAspectWidth && inputAspectHeight)
				setImage(
					resultImage.url,
					parseInt(inputAspectWidth),
					parseInt(inputAspectHeight),
					tooltip ? tooltip : undefined
				);
			else setImage(resultImage.url, undefined, undefined, tooltip ? tooltip : undefined);
		}
		onclose();
	}
</script>

<Dialog.Root {open} onOpenChange={(a) => !a && onclose()}>
	<Dialog.Content class="max-h-screen max-w-max overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Image</Dialog.Title>
			<Dialog.Description>Upload your image or provide an external URL.</Dialog.Description>
		</Dialog.Header>
		<Tabs.Root bind:value={currentTab}>
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="upload">Upload Image</Tabs.Trigger>
				<Tabs.Trigger value="external">External URL</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="upload">
				<div class="flex flex-col gap-y-2">
					<div class="flex flex-row gap-x-2">
						<Input
							type="file"
							onchange={(e) =>
								handleUploadImageChange((e.target as unknown as { files: FileList })?.files)}
						/>
						<Button onclick={() => (imgSrc = '')}>Clear</Button>
					</div>
					{#if imgSrc}
						<SvelteCrop {crop} onchange={(c) => (crop = c)} {aspect} class="w-max">
							<img
								class="max-w-screen-md"
								src={imgSrc}
								onload={(e) => handleImageLoad(e.currentTarget as HTMLImageElement)}
								bind:this={imageRef}
								alt="Uploaded"
							/>
						</SvelteCrop>
					{/if}
					<div class="flex flex-col gap-y-1">
						<Label>Aspect Ratio</Label>
						<div class="grid grid-cols-2 gap-x-2">
							<WrappedSelect
								bind:value={() => selectAspect, (v) => handleSelectAspectChange(v)}
								items={[
									{ name: 'Custom', value: 'custom' },
									{ name: 'Unbound', value: 'unbound' },
									{ name: '1:1', value: '1:1' },
									{ name: '3:2', value: '3:2' },
									{ name: '4:3', value: '4:3' },
									{ name: '16:9', value: '16:9' },
									{ name: '9:16', value: '9:16' }
								]}
								placeholder="Select Aspect Ratio"
							/>
							<div class="flex flex-row items-center gap-x-2">
								<Input
									type="number"
									class="rounded-r-none"
									bind:value={() => inputAspectWidth, (v) => handleInputAspectWidthChange(v)}
								/>
								<span class="text-lg font-light text-neutral-300">/</span>
								<Input
									type="number"
									class="rounded-l-none"
									bind:value={() => inputAspectHeight, (v) => handleInputAspectHeightChange(v)}
								/>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-2 gap-x-2">
						<WrappedInput label="Scale" type="number" bind:value={scale} />
						<WrappedInput label="Quality" type="number" bind:value={quality} />
					</div>
					<span>
						Before: {Math.round((resultImage?.originalSize ?? 0) / 1000)}kB After: {Math.round(
							(resultImage?.size ?? 0) / 1000
						)}kB
					</span>
					{#if resultImage?.url}
						<img
							src={resultImage?.url}
							width={crop?.width ?? resultImage.width}
							height={crop?.height ?? resultImage.height}
							alt="Cropped"
						/>
					{/if}
				</div>
			</Tabs.Content>
			<Tabs.Content value="external">
				<div class="flex flex-col gap-y-2">
					<Input type="url" placeholder="https://example.com/image.jpg" bind:value={imgSrc} />
					{#if imgSrc}
						<img src={imgSrc} alt="External" />
					{/if}
				</div>
			</Tabs.Content>
		</Tabs.Root>
		<Input
			type="text"
			placeholder="Tooltip that shows when hovering over it"
			bind:value={tooltip}
		/>
		<Dialog.Footer>
			<Button type="button" onclick={handleSaveChanges}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
