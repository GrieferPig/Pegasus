<template>
  <v-list lines="three" active-strategy="multiple" style="overflow: hidden">
    <div v-for="cate in category">
      <v-list-subheader>
        {{ cate.section }}
      </v-list-subheader>
      <div v-for="item in cate.items"
           style="background: rgb(var(--v-theme-itembg))">
        <v-list-item
            :disabled="item.disabled"
            :title="item.title"
            :subtitle="item.subtitle"
        >
          <template v-slot:default="{ isActive }">
            <v-list-item-avatar right style="height: 40px;">
              <div style="height: 100%; width: 20%">
                <v-switch v-if="item.type === 'switch'" value="item.data" color="primary"></v-switch>
                <v-btn v-if="item.type === 'button'" style="margin-right: 10px">{{ item.data }}</v-btn>
              </div>
            </v-list-item-avatar>
          </template>
        </v-list-item>
        <v-text-field v-if="item.type === 'textarea'" class="item-subline" hint=$item.data></v-text-field>
        <v-slider v-if="item.type === 'slider'" class="item-subline" label="test" thumb-label="true" style="padding-left: 10px; padding-right: 10px"></v-slider>
      </div>
    </div>

  </v-list>
</template>

<script>

export default {
  name: "SettingsPage",
  data() {
    return {}
  }
}
</script>

<style scoped>
.item-subline{
  width: 90%;
  margin-top: -8px;
  margin-left: 15px;
}
</style>