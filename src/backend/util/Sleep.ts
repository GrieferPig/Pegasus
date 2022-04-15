// hush now quiet now it's time to go to bed

export function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}