# yodl

## This project has been abandoned until further notice.

There are much better downloaders out there with the exact same proposed features as this one; go use them instead. Personally this has become an empty commitment and a waste of time. I can no longer maintain this failed, short-lived attempt at fulfilling a big dream. 

I thank the three amazing people that starred this project, and more importantly, apologize for letting you down.

<hr>

[![Waffle.io - Columns and their card count](https://badge.waffle.io/Luxray5474/yodl.svg?columns=all)](https://waffle.io/Luxray5474/yodl)

...not to be confused with [mgrahamjo/yodel](https://github.com/mgrahamjo/yodel), stands for **Yo**utube **D**own**l**oader. It is a wrapper for [fent/node-ytdl-core](https://github.com/fent/node-ytdl-core), just like [JimmyBoh/pully](https://github.com/JimmyBoh/pully) and [fent/node-ytdl](https://github.com/fent/node-ytdl). It (will) take inspiration from those two as well. Because of that, I was originally going to name it "yet another node youtube downloader wrapper", but 'yanydw' doesn't roll off the tongue as well. 

Two of the key features that are planned is **queue processing,** and a **player** which depends on said queue processing. You can see more planned features on Waffle.io.

## Usage

### Prerequisites

* Node.js
* ffmpeg and ffprobe ([guide](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#prerequisites))
* ffplay

### Installing 

**It is recommended to install this package globally `-g`, as it is its intended use.**

Through NPM: `npm i -g yodl`

You can also clone from the GitHub repo and run `npm i -g` at the root of the project.

### Command Usage

```yodl [options] "[id|url]"```

#### ID

Quotation marks are optional but necessary when the URL contains '&' like '&time='. Yes, you can pass a URL into the program and it will extract the ID from it. 

#### Options

##### Output Path

`-o=[default|path]`

This tells yodl to download to a given path.

* `default` - Default path: `[homedir]/Downloads/yodl/`
* `path` - A path. Enclose with "".

Example: `yodl -o="C:/Users/Owner/yodl/downloads/"`

##### Format

`-f=[mp4|mp3|m4a|mov|avi|flv]`

This tells yodl what output format to use.

* `mp3` - Default

#### Speaking of URLs...

YouTube can have extra 'junk' added to the URL, like '&t=' or '&index=', both of which I have tackled already. If you find any URL 'junk' that I haven't found yet, please open an issue on the repo. Thank you!

### Troubleshooting

**If it errors `[ERR!] Error: ffmpeg exited with code 1: No such file or directory`, usually it will mean that you have to create the directory first.** Create it as:

* `C:\Users\[user]\Downloads\yodl` - Windows
* `/home/[user]/Downloads/yodl` - Linux
* `/Users/[user]/Downloads/yodl` - macOS

If you have created an output directory beforehand, use the [Output Path](#output-path) option.

## Please Note...

It is against YouTube's TOS (4.C) to download its media through any means other than its website or Embeddable Player. **Use this software at your own risk.** 
