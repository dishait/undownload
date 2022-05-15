import { describe, expect, it } from 'vitest'
import {
	isHttpsProtocol,
	normalizeOptions,
	cachedGenerateURL,
	cachedPrettyBytes,
	generateFilenameFromUrl
} from '../src/shared'

describe('shared', () => {
	const localhost = {
		http: 'http://localhost:3000/foo.jpg',
		https: 'https://localhost:3000/foo.jpg'
	}

	it('isHttpsProtocol', () => {
		expect(isHttpsProtocol(localhost.http)).toBe(false)
		expect(isHttpsProtocol(localhost.https)).toBe(true)
	})

	it('generateFilenameFromUrl', () => {
		it('generated from the last part of pathname', () => {
			const filename = generateFilenameFromUrl(
				localhost.https
			)
			expect(filename).toBe('foo.jpg')
		})

		it('parameter type verification', () => {
			expect(() => {
				// @ts-ignore
				return generateFilenameFromUrl(100)
			}).toThrowError(
				'The url does not contain a file name'
			)
		})
	})

	it('normalizeOptions', () => {
		it('default options', () => {
			const basic = normalizeOptions(localhost.https, {
				method: 'GET',
				outDir: 'downloads',
				showProgressBar: true,
				generateFilename: generateFilenameFromUrl
			})

			expect(basic).toEqual({
				url: localhost.https,
				method: 'GET',
				outDir: 'downloads',
				showProgressBar: true,
				generateFilename: generateFilenameFromUrl
			})
		})

		it('change options', () => {
			const generateFilename = () => 'foo.jpg'
			const complex = normalizeOptions(
				{
					url: localhost.https,
					method: 'GET',
					outDir: 'downloads',
					showProgressBar: true,
					generateFilename
				},
				{
					method: 'POST',
					outDir: 'downloads',
					showProgressBar: true,
					generateFilename: generateFilenameFromUrl
				}
			)

			expect(complex).toEqual({
				url: localhost.https,
				method: 'GET',
				outDir: 'downloads',
				showProgressBar: true,
				generateFilename
			})
		})
	})

	it('cachedPrettyBytes', () => {
		expect(cachedPrettyBytes(10000)).toMatchInlineSnapshot(
			'"10 kB"'
		)
	})

	it('cachedGenerateURL', () => {
		expect(cachedGenerateURL(localhost.https)).toBe(
			cachedGenerateURL(localhost.https)
		)
	})
})
