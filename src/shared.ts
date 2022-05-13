import { existsSync } from 'fs'
import { mkdir } from 'fs/promises'
import type { Options } from './type'

type CheckoutOptions = Pick<Options, 'url' | 'outputDir'>

export const checkOptions = (options: CheckoutOptions) => {
	const { url, outputDir } = options
	if (!url || !outputDir) {
		throw new Error('url and outputDir are required')
	}
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
