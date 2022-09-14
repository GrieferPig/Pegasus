import en from './langs/en'
import zhHans from './langs/zhHans'
import poEqt from "./langs/poEqt";
import {readConf} from "../utils/SettingMgr";

const messages = {
    en: en,
    zhHans: zhHans,
    poEqt: poEqt,
}

export default {
    locale: 'en',           // lang setting is read in vuex
    fallbackLocale: 'en',
    messages
}

export function getAllLocales(){
    let array = [];
    for (let lang in messages) {
        array.push(messages[lang].lang)
    }
    return array;
}

export function findLangById(id: string){
    for (let lang in messages) {
        if ((messages[lang].lang.id as string).includes(id)){
            return messages[lang];
        }
    }
}
