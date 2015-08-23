# Zeromq and Sockets

This is an experiment on sockets and building a messaging client using [zeromq](http://zeromq.org/) that can hopefully be a primer one day.

## Pre-requisites

I haven't tried this on a linux distribution yet, so for that please visit this [link](http://zeromq.org/distro:debian) (the **debian** solution will work on any ubuntu distributions, because ubuntu is built on top of debian anyway)

**OSX**

1. Make sure you have `Homebrew` installed, if not here's a [link](http://brew.sh/)
2. `brew install zeromq`
3. node/iojs (I use [`nvm`](https://github.com/creationix/nvm))


## Development

**Server**

I'm using babel for development, because I'm using all the ES6 goodies, got too used to it, you have the option of *NOT* doing that, it's entirely up to you.

1. run `npm install`
2. run `npm run build` (just once if it's your first time)
3. run `npm run watch` for development
4. run `npm run server` to run all the servers concurrently


**Client**

*Still working on it*


## The Plan

I'm trying to find a solution for a chat client (client written in react + flux)
