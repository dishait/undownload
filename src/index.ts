import type { Options } from './type'
import { request as httpRequest } from 'http'
import { request as httpsRequest } from 'https'
import { existsSync, createWriteStream } from 'fs'
import {
	isHttps,
	ensureDir,
	getFilename,
	checkOptions
} from './shared'
import { resolve } from 'path'
import { lightCyan } from 'kolorist'

export const download = async (options: Options) => {
	const { url, outputDir, method = 'GET' } = options

	checkOptions({
		url,
		outputDir
	})

	const dest = resolve(outputDir, getFilename(url))

	await ensureDir(outputDir)

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
