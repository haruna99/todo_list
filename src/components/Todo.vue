<template>
  <div class="todos">
    <draggable
      :list="todo"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div class="todo-content todo-div" v-for="element in todo" :key="element.id" @click="selectTask(element.id)">
        <div class="circle text-center mr-5" :class="{ active: !element.active }">
          <img src="@/assets/img/icon-check.svg" class="check-circle" v-if="!element.active" alt="" />
        </div>
        <div
          class="text-left todo-text todo-main-text"
          :class="{ 'todo-check': !element.active }"
        >
          {{ element.text }}
        </div>
      </div>
      <v-divider style="width: 98%"></v-divider>
    </draggable>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      enabled: true,
      dragging: false,
    };
  },
  props: ["todo"],
  computed: {
    ...mapGetters(["todos", "ind", "all", "active", "completed"]),

    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
  },
  methods: {
    selectTask(id) {
      this.$store.dispatch("changeTodoState", id);
    },
 },
};
</script>

<style lang="scss">
</style>