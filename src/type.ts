export interface Options {
	url: string
	/**
	 * @default 'downloads'
	 */
	outDir?: string
	/**
	 * @default 'GET'
	 */
	method?: 'GET' | 'POST'
	/**
	 * @default will be automatically generated from 'pathname' in 'url'
	 */
	generateFilename?: (url: string) => string
}

export const isString = (v: unknown): v is string => {
	return typeof v === 'string'
}

export const isFunction = (v: unknown): v is Function => {
	return typeof v === 'function'
}
