import { existsSync } from 'fs'
import { isString } from './type'
import { mkdir } from 'fs/promises'
import type { Options } from './type'

export const normalizeOptions = (
	options: string | Options,
	defaultOptions: Omit<Required<Options>, 'url'>
): Required<Options> => {
	if (isString(options)) {
		return Object.assign(defaultOptions, { url: options })
	}
	return Object.assign(defaultOptions, options)
}

export const isHttpsProtocol = (url: string) => {
	return new URL(url).protocol === 'https:'
}

export const generateFilenameFromUrl = (url: string) => {
	const filename = new URL(url).pathname.split('/').pop()
	if (isString(filename)) {
		return filename
	}
	throw new Error('The url does not contain a file name')
}

export const ensureDir = async (dir: string) => {
	if (!existsSync(dir)) {
		await mkdir(dir, { recursive: true })
	}
}
