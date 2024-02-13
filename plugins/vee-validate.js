import Vue from "vue";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import {
  required,
  email,
  confirmed,
  alpha_spaces,
  min
} from "vee-validate/dist/rules";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

extend("required", {
  ...required,
  message: "This is field is required",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

extend("confirmed", {
  ...confirmed,
  message: "Password must be same",
});

extend("string", {
  ...alpha_spaces,
  message: "Only alphabetic characters",
});

extend("min",{
    ...min,
    message:"This field must be at least 4 characters"
})
