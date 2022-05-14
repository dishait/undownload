import prettyBytes from 'pretty-bytes'
import { bgLightBlue } from 'kolorist'
import { createWriteStream } from 'fs'
import { SingleBar } from 'cli-progress'
import { isHttpsProtocol } from './shared'
import type { IncomingMessage } from 'http'
import { request as httpRequest } from 'http'
import { request as httpsRequest } from 'https'

interface Options {
	url: string
	dest: string
	method: string
	filename: string
}

export function download(options: Options) {
	const { url, dest, method, filename } = options

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
			useProcessBar(filename, response)
			response.pipe(file)
			file.once('finish', () => resolve(dest))
			file.once('error', reject)
		})

		client.once('error', reject)
		client.end()
	})
}

export function useProcessBar(
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
				return prettyBytes(value)
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
