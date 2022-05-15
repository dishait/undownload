import { download } from '../src'

// Basic
download(
	'https://images.pexels.com/photos/11369918/pexels-photo-11369918.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
)

// Change outDir
download({
	url: 'https://images.pexels.com/photos/7015865/pexels-photo-7015865.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	outDir: 'playground/Downloads'
})

// hide progress bar
download({
	url: 'https://images.pexels.com/photos/7015865/pexels-photo-7015865.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	showProgressBar: false
})
