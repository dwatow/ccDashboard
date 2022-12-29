import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

// import icons from './utility/fontawesome'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faRotateRight)

createApp(App)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')
