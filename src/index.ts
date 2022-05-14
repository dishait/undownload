import { resolve } from 'path'
import { existsSync } from 'fs'
import { lightCyan } from 'kolorist'
import type { Options } from './type'
import { download as _download } from './core'
import {
	ensureDir,
	normalizeOptions,
	generateFilenameFromUrl
} from './shared'

export function download(url: string): Promise<string>
export function download(options: Options): Promise<string>
export async function download(options: string | Options) {
	const { url, method, outDir, generateFilename } =
		normalizeOptions(options, {
			method: 'GET',
			outDir: 'downloads',
			generateFilename: generateFilenameFromUrl
		})

	let dest = resolve(outDir, generateFilename(url))

	await ensureDir(outDir)

	// file is existsed
	if (existsSync(dest)) {
		console.log(lightCyan(dest + ' is existsed'))
		return dest
	}

	// download
	dest = await _download({ url, method, dest })

	return dest
}
