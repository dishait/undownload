import { existsSync } from 'fs'
import { mkdir } from 'fs/promises'
import type { Options } from './type'

export const normalizeOptions = (
	options: string | Options
): Options => {
	if (typeof options === 'string') {
		return { url: options }
	}

	if (typeof options.url !== 'string') {
		throw new Error('url of options is a required string')
	}

	return options
}

export const isHttps = (url: string) => {
	return new URL(url).protocol === 'https:'
}

export const getFilename = (url: string) => {
	const filename = new URL(url).pathname.split('/').pop()
	if (typeof filename === 'string') {
		return filename
	}
	throw new Error('The url does not contain a file name')
}

export const ensureDir = async (dir: string) => {
	if (!existsSync(dir)) {
		await mkdir(dir, { recursive: true })
	}
}
