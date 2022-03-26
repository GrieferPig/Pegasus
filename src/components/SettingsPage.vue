<template>
  <v-list lines="three" active-strategy="multiple">
    <div v-for="cate in category">
      <v-list-subheader>
        {{ cate.section }}
      </v-list-subheader>
      <div v-for="item in cate.items">
        <v-list-item
            :disabled="item.disabled"
            :title="item.title"
            :subtitle="item.subtitle">
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
        <v-slider v-if="item.type === 'slider'" class="item-subline"></v-slider>
      </div>
    </div>

  </v-list>
</template>

<script>
export default {
  name: "SettingsPage",
  data() {
    return {

      category: {
        General: {
          section: "General",
          items: {
            Test1: {
              title: 'Test1 title.',
              subtitle: 'switch',
              type: 'switch',
              data: 'false',
              disabled: false
            },
            Test2: {
              title: 'Test2 title.',
              subtitle: 'button test',
              type: 'button',
              data: 'wait what',
              disabled: false,
            },
            Test3: {
              title: 'Test3 title.',
              subtitle: 'slider test',
              type: 'slider',
              data: '0.7',
              disabled: false
            },
            Test4: {
              title: 'Test4 title.',
              subtitle: 'dropdown test',
              type: 'dropdown',
              data: '',
              disabled: false
            },
            Test5: {
              title: 'Test5 title.',
              subtitle: 'dropdown test',
              type: 'dropdown',
              data: '',
              disabled: false
            },
            Test6: {
              title: 'Test6 title.',
              subtitle: 'textarea test',
              type: 'textarea',
              data: 'HINT TEST',
              disabled: false
            },
          }
        },
        Language: {
          section: "Language",
          items: {
            chooseLang: {
              title: 'Language',
              subtitle: 'Choose the language that will be used by this launcher.',
              type: 'dropdown',
              data: '',
              disabled: false
            },
            ponify: {
              title: 'Ponify',
              subtitle: 'Language options for bronies.',
              type: 'switch',
              data: 'false',
              disabled: false,
            },
            memify: {
              title: 'Memify',
              subtitle: 'Pour memes into this.',
              type: 'switch',
              data: 'false',
              disabled: true
            },
          }
        }
      }
    }
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