export class JsonUtil{
    constructor() {}

    public async toJson(string: string): Promise<JSON>{
        return new Promise<JSON>(function(resolve){
            resolve(JSON.parse(string))
        })
    }

}