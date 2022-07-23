<template>
    <v-snackbar
            v-model="snackbar_on"
            :timeout="snackbar_timeout"
            :vertical="snackbar_subtext !== undefined"
    >
        <div class="text-subtitle-1 pb-2">{{ snackbar_text }}</div>

        <p v-if="snackbar_subtext !== undefined">{{ snackbar_subtext }}</p>
        <template v-slot:actions>
            <v-btn
                    color="blue"
                    variant="text"
                    @click="this.$store.commit('closeSnackBar')"
            >
                {{ snackbar_close_text }}
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
/**
 * how to use this
 *
 *                 <v-btn v-on:click="showSnackBar(5000, 'This is a snackbar test', 'Toss it', 'Cross my heart and hope to fly, stick a cupcake in my eye!')">
 *                     Snackbar Test
 *                 </v-btn>
 */

import {mapState} from "vuex";

export default {
    name: "GlobalSnackBar",
    computed: {
        ...mapState(["snackbar_timeout", "snackbar_text", "snackbar_close_text", "snackbar_on", "snackbar_subtext"])
    }
}
</script>