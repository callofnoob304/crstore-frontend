import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  transition: "vue-toastification__fade",
  maxToasts: 10,
  newestOnTop: true,
  position: "bottom-right",
})