
// serve webpack overlay
if (process.env.NODE_ENV === 'development') {
	// becomes dead code in builds other than dev,
	// which webpack should pick up and remove.
	require('webpack-serve-overlay');
}

import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Uncomment if you want to remove the tip in the console.
// Vue.config.productionTip = false 

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
