import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueCompositionAPI from '@vue/composition-api';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import './registerServiceWorker';
import '@/assets/css/app.scss';

Vue.config.productionTip = false;

const requireComponent = require.context(
  // The relative path of the components folder
  './components/global',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /Gl[A-Z]\w+\.vue$/
);

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        ?.replace(/\.\w+$/, '')
    )
  );

  // Register component globally
  if (componentName !== '') {
    Vue.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      componentConfig.default || componentConfig
    );
  }
});
Vue.use(VueCompositionAPI);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
