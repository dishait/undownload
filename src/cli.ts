import cac from 'cac'
import { download } from './index'
import type { Options } from './type'
import { version } from '../package.json'

const cli = cac('download')

cli
	.command(
		'<url>',
		'Download file through any http or https protocol'
	)
	.option(
		'--method <method>',
		'choice method, you can use GET or POST',
		{
			default: 'GET'
		}
	)
	.option(
		'--outDir <dir>',
		'directory path of downloaded output',
		{
			default: 'downloads'
		}
	)
	.option('--showProgressBar', 'show progress bar', {
		default: true
	})
	.action((url: string, options: Options) => {
		const { method, outDir, showProgressBar } = options
		download({
			url,
			method,
			outDir,
			showProgressBar
		})
	})

cli.help()
cli.version(version)

cli.parse()
