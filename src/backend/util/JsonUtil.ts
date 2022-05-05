export async function toJson(string: string): Promise<JSON> {
    return new Promise<JSON>(function (resolve) {
        resolve(JSON.parse(string))
    })
}

export function toJsonSync(string: string) {
    return JSON.parse(string)
}

export async function toString(json) {
    return JSON.stringify(json)
}
