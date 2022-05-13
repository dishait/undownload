import { download } from '../src'

// Basic
download({
	url: 'https://images.pexels.com/photos/7015865/pexels-photo-7015865.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	outputDir: 'playground/Downloads'
})

// Nested Directory
download({
	url: 'https://images.pexels.com/photos/11990061/pexels-photo-11990061.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
	outputDir: 'playground/Downloads/imgs/photos'
})
