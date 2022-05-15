import { bgLightBlue } from 'kolorist'
import { createWriteStream } from 'fs'
import { SingleBar } from 'cli-progress'
import type { IncomingMessage } from 'http'
import { request as httpRequest } from 'http'
import { request as httpsRequest } from 'https'
import {
	isHttpsProtocol,
	cachedPrettyBytes
} from './shared'

interface Options {
	url: string
	dest: string
	method: string
	filename: string
	showProgressBar: boolean
}

export function download(options: Options) {
	const { url, dest, method, filename, showProgressBar } =
		options

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
			if (showProgressBar) {
				useProgressBar(filename, response)
			}
			response.pipe(file)
			file.once('finish', () => resolve(dest))
			file.once('error', reject)
		})

		client.once('error', reject)
		client.end()
	})
}

export function useProgressBar(
	name: string,
	response: IncomingMessage
) {
	const format =
		`${name} |` +
		bgLightBlue('{bar}') +
		'| {percentage}% | {value}/{total}'

	const processBar = new SingleBar({
		format,
		formatValue(value, _, type) {
			if (type === 'total' || type === 'value') {
				return cachedPrettyBytes(value)
			}
			return String(value)
		},
		stopOnComplete: true,
		barCompleteChar: '\u2588',
		barIncompleteChar: '\u2591'
	})

	const total = Number(response.headers['content-length'])

	processBar.start(total, 0)
	let speed = 0
	response.on('data', (chunk: Buffer) => {
		speed += chunk.length
		processBar.update(speed)
	})

	return () => processBar.stop()
}
