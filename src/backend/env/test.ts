// test file
//
// i hate promise

import {detectJre, isJrePresent} from "./DetectEnv";

detectJre().then(function (d) {
    console.log(d)
});

isJrePresent().then(function (d){
    console.log(d)
})