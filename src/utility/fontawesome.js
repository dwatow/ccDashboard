import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'


export default {
  install() {
    /* add icons to the library */
    library.add(faRotateRight)
  }
}