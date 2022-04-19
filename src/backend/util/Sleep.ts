// hush now quiet now it's time for little sleepy heads
// hush now quiet now it's time to go to bed

export function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}