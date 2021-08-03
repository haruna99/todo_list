<template>
  <div class="main-body" :class="{ 'main-body-dark': mode == 'dark' }">
    <div class="navbar">
      <div class="logo">todo</div>
      <div class="icon">
        <button v-if="mode == 'dark'" class="" @click="setMode('light')">
          <img src="@/assets/img/icon-sun.svg" alt="" />
        </button>
        <button v-if="mode == 'light'" class="mt-3" @click="setMode('dark')">
          <img src="@/assets/img/icon-moon.svg" alt="" />
        </button>
      </div>
    </div>
    <div class="add-todo mt-5">
      <v-card>
        <button class="todo-content">
          <div class="circle mr-5"></div>
          <div class="todo-input">
            <v-text-field
              label="Create a new todo..."
              @keyup.enter="addTodo"
              v-model="todoValue"
              solo
            ></v-text-field>
          </div>
        </button>
      </v-card>
    </div>
    <div class="todo-list mt-5">
      <v-card>
        <span v-if="all">
          <Todo :todo="todos" />
        </span>
        <span v-if="completed">
          <Todo :todo="completedList" />
        </span>
        <span v-if="active">
          <Todo :todo="activeList" />
        </span>
        <div class="actions">
          <v-fade-transition leave-absolute>
            <div v-if="todosLength == 1">{{ todosLength }} Item left</div>
            <div v-else-if="todosLength > 1">{{ todosLength }} Items left</div>
            <div v-else>No item left</div>
          </v-fade-transition>

          <div class="actions-buttons hide-actions-1">
            <div>
              <button @click="allActive" :class="{ active: all }">All</button>
            </div>
            <div>
              <button @click="activeActive" :class="{ active: active }">
                Active
              </button>
            </div>
            <div>
              <button @click="completedActive" :class="{ active: completed }">
                Completed
              </button>
            </div>
          </div>
          <div>
            <v-dialog transition="dialog-top-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <button v-bind="attrs" v-on="on">Clear Completed</button>
              </template>
              <template v-slot:default="dialog">
                <v-card :class="{ 'delete-dialog-dark': mode == 'dark' }">
                  <v-card-text>
                    <div class="text-h6 text-center pa-2">
                      <div class="text-center py-15" style="font-size: 70px">
                        &#128686;
                      </div>
                      <h2>Do you want to delete all completed tasks?</h2>
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      text
                      @click="
                        dialog.value = false;
                        clearCompleted();"
                      class="action-btn"
                      color="green darken-1"
                      >Yes</v-btn
                    >
                    <v-btn color="red"
                      class="action-btn"
                     text @click="dialog.value = false"
                      >No</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>
      </v-card>
    </div>
    <v-card class="mt-10">
      <div class="actions-buttons hide-actions-2">
        <div>
          <button @click="allActive" :class="{ active: all }">All</button>
        </div>
        <div>
          <button @click="activeActive" :class="{ active: active }">
            Active
          </button>
        </div>
        <div>
          <button @click="completedActive" :class="{ active: completed }">
            Completed
          </button>
        </div>
      </div>
    </v-card>
    <div class="text-center mt-10">
      <p class="foot" :class="{ 'foot-dark': mode == 'dark' }">
        Drag and drop to reorder list
      </p>
    </div>
  </div>
</template>

<script>
import Todo from "./Todo";
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.$store.dispatch("addCompletedList");
    this.$store.dispatch("addActiveList");
  },
  components: {
    Todo,
  },
  computed: {
    todosLength() {
      return this.activeList.length;
    },
    ...mapGetters([
      "todos",
      "all",
      "active",
      "completed",
      "activeList",
      "completedList",
      "mode",
    ]),
  },
  data() {
    return {
      todoValue: null,
      modeValue: false,
    };
  },
  methods: {
    setMode(val) {
      this.$store.dispatch("setMode", val);
    },
    clearCompleted() {
      this.$store.dispatch("clearCompleted");
    },
    addTodo() {
      var ID = function () {
        return "_" + Math.random().toString(36).substr(2, 9);
      };
      this.$store.dispatch("addTodo", { text: this.todoValue, ID: ID() });
      this.todoValue = null;
    },
    allActive() {
      this.$store.dispatch("activeAction", {
        all: true,
        active: false,
        completed: false,
      });
    },
    activeActive() {
      this.$store.dispatch("activeAction", {
        all: false,
        active: true,
        completed: false,
      });
    },
    completedActive() {
      this.$store.dispatch("activeAction", {
        all: false,
        active: false,
        completed: true,
      });
    },
  },
};
</script>

<style lang="scss">
.action-btn {
  font-size: 1.5rem !important;
}
.delete-dialog-dark {
  background-color: hsl(235, 24%, 19%) !important;
  .text-h6 {
    color: #fff !important;
  }
}

.foot-dark {
  color: #fff !important;
}

.main-body {
  width: 50rem;
  padding-bottom: 4.5rem;
  margin-left: 50%;
  margin-top: -18rem;
  transform: translateX(-50%);
  .todo-input,
  .todo-text {
    width: 39rem;
  }

  .check-circle {
    padding: 0.9rem;
  }

  .foot {
    font-size: 1.3rem;
  }

  .footer {
    font-size: bold;
  }

  .todos {
    cursor: pointer;
    margin-bottom: 1px solid red;
  }

  .actions {
    justify-content: space-between;
    font-size: 13px;
    color: hsl(234, 11%, 52%);
    button {
      &:hover {
        color: hsl(233, 11%, 84%) !important;
      }
    }
  }

  .actions-buttons {
    display: flex;
    justify-content: space-around;
    button {
      padding: 0px 6px;
      font-size: 15px;
      font-weight: 700;
      &:hover {
        color: hsl(233, 11%, 84%) !important;
      }
      &.active,
      &.active:hover {
        color: hsl(220, 98%, 61%);
      }
    }
  }

  .icon {
    margin-top: 0.9rem;
  }

  .todo-main-text {
    font-size: 1.3rem;
    margin-top: 0.6rem;
  }

  .hide-actions-2 {
    display: none;
  }

  .todo-text {
    font-weight: 400;
    text-transform: capitalize;
    color: hsl(235, 19%, 35%);
  }

  .todo-check {
    text-decoration: line-through;
    color: hsl(233, 11%, 84%) !important;
  }

  .v-text-field__details {
    display: none;
  }

  .v-text-field.v-text-field--solo .v-label {
    top: calc(50% - 11px);
  }

  .v-text-field--solo .v-input__control {
    min-height: 30px !important;
    padding: 0;
  }

  .v-input {
    font-size: 14px;
    width: 250%;
  }

  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot {
    box-shadow: none;
  }

  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
    > .v-input__control
    > .v-input__slot,
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0px 3px;
  }
  .v-input__slot {
    margin-bottom: 0px;
  }

  .navbar {
    display: flex;
    justify-content: space-between;

    .logo {
      color: #fff;
      font-size: 3.5rem;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1.5rem;
    }
  }

  .add-todo .todo-content,
  .todo-list .todo-content,
  .actions {
    padding: 1rem 2rem;
    display: flex;

    .circle {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 1px solid hsl(233, 11%, 84%);
      &:hover {
        border: 1px solid hsl(280, 87%, 65%) !important;
      }
    }
  }
  .todo-div {
    border-bottom: 0.1px solid hsl(233, 11%, 84%);
  }

  .todo-list .todo-content {
    .active {
      background-image: linear-gradient(
        to right,
        hsl(192, 100%, 67%),
        hsl(280, 87%, 65%)
      );
    }
  }
}

.main-body-dark {
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot {
    background-color: hsl(235, 24%, 19%) !important;
  }

  .v-text-field.v-text-field--solo .v-label {
    color: hsl(234, 11%, 52%) !important;
  }

  .theme--light.v-input input,
  .theme--light.v-input textarea {
    color: hsl(233, 11%, 84%) !important;
  }

  .todo-text {
    color: hsl(233, 11%, 84%) !important;
  }

  .footer {
    color: hsl(234, 11%, 52%);
    font-size: bold;
  }

  .todo-check {
    color: hsl(235, 19%, 35%) !important;
  }

  .add-todo .todo-content,
  .todo-list .todo-content,
  .actions {
    .circle {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 1px solid hsl(235, 19%, 35%) !important;
      &:hover {
        border: 1px solid hsl(280, 87%, 65%) !important;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .main-body {
    width: 100%;
    margin-top: -20rem;
    padding: 0rem 3.5rem 4.5rem 3.5rem;
    transform: translateX(-50%);
    .todo-input,
    .todo-text {
      width: calc(100%);
    }

    .actions {
      font-size: 11px;
    }

    .v-input {
      font-size: 20px;
      width: 20rem;
    }

    .navbar {
      .logo {
        font-size: 2.3rem;
        letter-spacing: 0.6rem;
        margin-top: 0.5rem;
      }
    }

    .actions-buttons {
      button {
        font-size: 11px;
      }
    }

    .todo-text {
      font-size: 12px;
      margin-top: 0.3rem;
    }

    .icon {
      margin-top: 0.3rem;
    }

    .add-todo .todo-content,
    .todo-list .todo-content,
    .actions {
      padding: 1rem 1rem;
      display: flex;

      .circle {
        border-radius: 50%;
        border: 1px solid hsl(233, 11%, 84%);
        &:hover {
          border: 1px solid hsl(280, 87%, 65%) !important;
        }

        img {
          text-align: center;
        }
      }
    }
  }
}

@media screen and (max-width: 375px) {
  .main-body {
    .v-input {
      font-size: px;
      width: 18rem;
    }

    .hide-actions-1 {
      display: none;
    }

    .hide-actions-2 {
      color: hsl(234, 11%, 52%);

      display: flex;
      justify-content: center;
      padding: 0.6rem 0rem;
    }
  }
}
</style>