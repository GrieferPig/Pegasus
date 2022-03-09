<template>
  <v-list lines="three" active-strategy="multiple">
    <v-list-subheader
    :v-for="category in category">
      {{ category }}
      <v-list-item
          v-for="item in category.General.items"
          :disabled="item.disabled"
          :title="item.title"
          :subtitle="item.subtitle">
        <template v-slot:default="{ isActive }">

        </template>
      </v-list-item>
    </v-list-subheader>
  </v-list>
</template>

<script>
export default {
  name: "SettingsPage",
  data() {
    return {
      category: {
        General: {
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
              data: '',
              disabled: true
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
              data: '',
              disabled: false
            },
          }
        },
        Language: {

        }
      }
    }
  }
}
</script>

<style scoped>

</style>