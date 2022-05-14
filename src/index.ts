import type { Options } from './type'
import { request as httpRequest } from 'http'
import { request as httpsRequest } from 'https'
import { existsSync, createWriteStream } from 'fs'
import {
	isHttps,
	ensureDir,
	getFilename,
	normalizeOptions
} from './shared'
import { resolve } from 'path'
import { lightCyan } from 'kolorist'

export function download(url: string): Promise<string>
export function download(options: Options): Promise<string>
export async function download(options: string | Options) {
	const {
		url,
		method = 'GET',
		outDir = 'downloads'
	} = normalizeOptions(options)

	const dest = resolve(outDir, getFilename(url))

	await ensureDir(outDir)

	if (existsSync(dest)) {
		console.log(lightCyan(dest + ' is existsed'))
		return dest
	}

	const request = isHttps(url) ? httpsRequest : httpRequest

	const pending = new Promise<string>((resolve, reject) => {
		const client = request(url, {
			method: method.toUpperCase()
		})
		client.once('response', response => {
			const file = createWriteStream(dest)
			response.pipe(file)
			file.once('finish', () => resolve(dest))
			file.once('error', reject)
		})
		client.once('error', reject)
		client.end()
	})

	return await pending
}
