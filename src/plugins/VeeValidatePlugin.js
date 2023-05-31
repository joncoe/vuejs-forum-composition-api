import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
export default (app) => {
  defineRule('required', required)

  app.component('Form', Form)
  app.component('Field', Field)
  app.component('ErrorMessage', ErrorMessage)
}
