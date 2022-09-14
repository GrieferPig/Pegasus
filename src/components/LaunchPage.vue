<template>
    <label v-if="gotAccount">Account: {{ name }}</label>
    <label v-else>Gathering account info</label>
    <label v-if="error">Error: {{ errorNo }}</label>
</template>

<script>
import { verify } from '../utils/Auth'

export default {
    name: 'LaunchPage',
    data() {
        return {
            gotAccount: false,
            error: false,
            errorNo: 0,
            name: "",
        }
    },
    async mounted() {
        let _res = await verify();
        if (_res[3] !== 0) {
            this.error = true;
            this.errorNo = _res[3]
        } else {
            this.gotAccount = true;
            this.name = _res[2]
        }
    }
}
</script>
