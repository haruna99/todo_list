import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'

import getters from "./getters.js"
import actions from "./actions.js"
import mutations from "./mutations.js"

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({storage: window.localStorage})

export default new Vuex.Store({
    plugins: [vuexLocal.plugin],

    state: {
        mode: "light",
        todos: [],
        activeList: [],
        completedList: [],
        all: true,
        active: false,
        completed: false,
        checked: false
    },
    mutations,
    actions,
    getters
});
