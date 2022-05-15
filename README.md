# download

`all in one` 的 `node` 下载

<br />

## features 🦕

- `cli` 支持
- 进度条支持
- `http` 和 `https` 支持

<br />
<br />

## Usage 🦖

### program

#### install

```shell
npm i @markthree/download
```

<br />

##### basic

基础

```ts
import { download } from '@markthree/download'

// 将输出到工作区的 downloads 目录下
download('https://...')
```

<br />

##### change outDir

改变输出目录，默认为 `downloads`

```ts
import { download } from '@markthree/download'

// 将输出到工作区的 downloads/imgs 目录下
download({
    url: 'https://.../foo.jpg',
    outDir: 'downloads/imgs'
})
```

<br />

##### hide progress bar

隐藏进度条

```ts
import { download } from '@markthree/download'

download({
	url: 'https://...',
	showProgressBar: false
})
```

<br />

##### dest

返回结果 `Promise<string>` 输出路径 `dest`

```ts
import { download } from '@markthree/download'

const runDownload = async () => {
    const dest = await download('https://...')
    
    console.log(dest)
}

runDownload()
```

<br />
<br />

### cli
#### install

```shell
npm i @markthree/download -g
```

<br />

##### download

下载，`url` 支持 `http` 和 `https` 协议

```shell
download <url>
```

<br />

##### help

帮助

```shell
download -h
```

<br />

##### version

版本号

```shell
download -v
```

<br />

##### method

方法，支持 `GET` 和 `POST`，默认为 `GET` 

```shell
download <url> --method POST
```

<br />

##### outDir

下载后文件的输出目录，默认为 `downloads`

```shell
download <url> --outDir downloads/imgs
```

<br />

##### showProgressBar

显示进度条，默认为 `true`

```shell
download <url> --showProgressBar false
```

<br />
<br />

## License

Made with [markthree](https://github.com/markthree)

Published under [MIT License](./LICENSE).


<br />