import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  fab
} from '@fortawesome/free-brands-svg-icons'

import {
  fas,
  faEnvelope,
  faCircleInfo,
  faUserLarge,
  faXmark,
  faBars,
  faDisplay,
  faUserNurse,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

import {
  far,
  faPaperPlane,
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons'

library.add(fas, fab, far, faEnvelope, faCircleInfo, faPaperPlane, faCircleCheck, faCircleXmark, faUserLarge, faXmark, faBars, faDisplay, faUserNurse, faArrowRightFromBracket)

export default FontAwesomeIcon