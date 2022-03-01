<template>
  <div class="background">
    <v-app>
      <v-main>
        <v-app-bar dense
                    elevation="1"
                    outlined>
          <v-app-bar-title>
            <span class="appTitle"> {{ appTitle }} </span>
          </v-app-bar-title>
        </v-app-bar>
        <HelloWorld/>
        <div v-ripple>        <font-awesome-icon icon="bars"/>
        </div>
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

body{ /** weird fix **/
  padding: 0;
  margin: 0;
}
</style>