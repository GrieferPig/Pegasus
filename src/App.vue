<template>
  <div class="background">
  <v-app>
    <v-main class="overflow-hidden">
      <v-app-bar  dense
                  elevation="1"
                  flat
                  outlined>
        <v-btn
            depressed
            icon
        ><font-awesome-icon icon="bars" />
        </v-btn>
        <v-app-bar-title>
          <span class="appTitle"> {{ appTitle }} </span>
        </v-app-bar-title>
      </v-app-bar>
      <HelloWorld/>
    </v-main>
  </v-app>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data() {
    return {
      appTitle: 'Title Placeholderdfdsfusdfdsffkudfsusdujksdfjkdsfjkdsfjk'
    }
  }
}

</script>

<style>
html::-webkit-scrollbar{
  width:0px;/** hide scroolbar**/
}

.appTitle{
  display: block;
  width: 230px;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-app-region: drag;
  padding-left: 0 !important;
}

.background{
  height: 600px;
  width: 350px;
  border-radius: 10px;
  display: block;
}
</style>
