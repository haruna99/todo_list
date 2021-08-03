export default {
    SET_MODE(state, payload) {
      state.mode = payload
    },
    CLEAR_COMPLETED(state) {
      state.todos = state.todos.filter(item => item.active)
    },
    ADD_TODO(state, payload) {
      state.todos.push({id: payload.ID, text: payload.text, active: true})
    },
    SET_ACTIVE_ACTION(state, payload) {
      state.all = payload.all
      state.active = payload.active
      state.completed = payload.completed
    },
    CHANGE_TODO_STATE(state, id) {
      let ind = state.todos.findIndex((item) => {
        return item.id == id
      })
      state.todos[ind] = {id: state.todos[ind].id, text: state.todos[ind].text, active: !state.todos[ind].active}
    },
    SET_ACTIVE_LIST(state) {
      state.activeList = state.todos.filter(item => item.active)     
    },
    SET_COMPLETED_LIST(state) {
      state.completedList = state.todos.filter(item => !item.active)  
    },
    TODO_COPY(state) {
      state.todos = state.todos.slice()
    }
  }