export default {
    setMode({commit}, payload) {
      commit('SET_MODE', payload)
    },
    clearCompleted(context) {
      context.commit('CLEAR_COMPLETED')
      context.dispatch('addActiveList')
      context.dispatch('addCompletedList')
      context.dispatch('todoCopy')
    },
    addTodo(context, payload) {
      context.commit('ADD_TODO', payload)
      context.dispatch("addCompletedList");
      context.dispatch("addActiveList");
    },
    activeAction({commit}, payload) {
      commit("SET_ACTIVE_ACTION", payload)
    },
    changeTodoState(context, payload) {
      context.commit("CHANGE_TODO_STATE", payload)
      context.dispatch("addCompletedList");
      context.dispatch("addActiveList");
      context.dispatch("todoCopy");
    },
    addActiveList({commit}) {
      commit('SET_ACTIVE_LIST')
    },
    addCompletedList({commit}) {
      commit('SET_COMPLETED_LIST')
    },
    todoCopy({commit}) {
      commit('TODO_COPY')
    }
  }