import Vue from "vue";
import Vuex from "vuex";
import user from "./user/userStore";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user: user
    }
});

export default store