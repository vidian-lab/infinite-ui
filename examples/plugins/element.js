import Vue from 'vue'

// import {
//   Col,
//   Row,
//   Container,
//   Header,
//   Main,
//   Aside,
//   Input,
//   Message,
//   Notification
// } from 'element-ui'

import Col from 'element-ui/lib/col'
import Row from 'element-ui/lib/row'
import Container from 'element-ui/lib/container'
import Header from 'element-ui/lib/header'
import Main from 'element-ui/lib/main'
import Aside from 'element-ui/lib/aside'
import Input from 'element-ui/lib/input'
import Message from 'element-ui/lib/message'
import Notification from 'element-ui/lib/notification'
import Step from 'element-ui/lib/step'
Vue.use(Col)
Vue.use(Row)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Input)
Vue.use(Step)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification

// import elementUi from 'element-ui'
// Vue.use(elementUi)
