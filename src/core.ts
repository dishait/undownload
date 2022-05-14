import { createWriteStream } from 'fs'
import { request as httpRequest } from 'http'
import { request as httpsRequest } from 'https'
import { isHttpsProtocol } from './shared'

interface Options {
	url: string
	dest: string
	method: string
}

export function download(options: Options) {
	const { url, dest, method } = options

	// get request method according to protocol
	const request = isHttpsProtocol(url)
		? httpsRequest
		: httpRequest

	// download core
	const file = createWriteStream(dest)
	return new Promise<string>((resolve, reject) => {
		const client = request(url, {
			method: method.toUpperCase()
		})
		client.once('response', response => {
			response.pipe(file)
			file.once('finish', () => resolve(dest))
			file.once('error', reject)
		})
		client.once('error', reject)
		client.end()
	})
}
