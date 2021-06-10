<template>
  <div class="todos">
    <div
      @click="selectTask()"
      draggable="true"
      @dragstart="dragStart(ind, $event)"
      @dragover.prevent
      @dragenter="dragEnter"
      @dragleave="dragLeave"
      @dragend="dragEnd"
      @drop="dragFinish(ind, $event)"
    >
      <div class="todo-content">
        <div class="circle text-center mr-5" :class="{ active: !todo.active }">
          <img src="@/assets/img/icon-check.svg" v-if="!todo.active" alt="" />
        </div>
        <div
          class="text-left todo-text"
          :class="{ 'todo-check': !todo.active }"
        >
          {{ todo.text }}
        </div>
      </div>
      <v-divider style="width: 98%"></v-divider>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      checked: false,
      dragging: -1,
      index: null
    };
  },
  props: ["todo"],
  computed: {
    ...mapGetters(["todos", "ind", "all", "active", "completed"]),

    isDragging() {
      return this.dragging > -1;
    },
  },
  methods: {
    selectTask() {
      let index = this.todos.indexOf(
        this.todos.find((val) => val.id === this.todo.id)
      );
      this.$store.dispatch("changeTodoState", index);
      this.checked = !this.todos[index].active;
    },
    checkValue() {
      let index = this.todos.indexOf(
        this.todos.find((val) => val.id === this.todo.id)
      );
      this.checked = !this.todos[index].active;
    },

    dragStart(which, ev) {
      ev.dataTransfer.setData("Text", this.id);
      ev.dataTransfer.dropEffect = "move";
      this.dragging = which;
    },
    dragEnter() {
      /* 
      if (ev.clientY > ev.target.height / 2) {
        ev.target.style.marginBottom = '10px'
      } else {
        ev.target.style.marginTop = '10px'
      }
      */
    },
    dragLeave() {
      /* 
      ev.target.style.marginTop = '2px'
      ev.target.style.marginBottom = '2px'
      */
    },
    dragEnd() {
      this.dragging = -1;
    },
    dragFinish(to, ev) {
      this.moveItem(this.dragging, to);
      ev.target.style.marginTop = "2px";
      ev.target.style.marginBottom = "2px";
    },
    moveItem(from, to) {
      if (to === -1) {
        this.removeItemAt(from);
      } else {
        this.todos.splice(to, 0, this.todos.splice(from, 1)[0]);
      }
    },
  },
  mounted() {
    this.checkValue();
  },
};
</script>

<style lang="scss">
</style>