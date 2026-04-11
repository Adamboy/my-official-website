import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/global.less";


const app = createApp(App);

// 修正：只设置初始状态和类名切换，transition 由 CSS 控制


app.use(router).mount("#app");