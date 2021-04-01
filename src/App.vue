<template>
  <div id="app">
    <div id="mainChat">
      <div id="chatHeader">
        <button id="peopleButton" @click="showJoinedUsersList = !showJoinedUsersList">
          <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
          <g><path fill-rule="evenodd" d="M7 2a4 4 0 00-1.015 7.87c-.098.64-.651 1.13-1.318 1.13A2.667 2.667 0 002 13.667V18h2v-4.333c0-.368.298-.667.667-.667.908 0 1.732-.363 2.333-.953.601.59 1.425.953 2.333.953.369 0 .667.299.667.667V18h2v-4.333A2.667 2.667 0 009.333 11c-.667 0-1.22-.49-1.318-1.13A4.002 4.002 0 007 2zM5 6a2 2 0 104 0 2 2 0 00-4 0z" clip-rule="evenodd"></path><path d="M14 11.83V18h4v-3.75c0-.69-.56-1.25-1.25-1.25a.75.75 0 01-.75-.75v-.42a3.001 3.001 0 10-2 0z"></path></g>
        </svg>
        </button>
        <div v-show="showJoinedUsersList" id="joinedUsersList">
          <h2>Users</h2>
          <hr>
          <div v-for="(user, index) in users" :key="index" id="joinedUsersListSub">
            <div id="#userListUser">{{user}}</div>
          </div>
        </div>
        <h1>{{title}}</h1>
        <label class="switch">
        <input type="checkbox" @change="changeTheme()">
        <span class="slider round"></span>
        </label>
      </div>
      <div id="messageArea">
        <div id="messageAreaSub" v-for="(message, index) in chat" :key="index">
          <div id="messageName" :style="{ color: message.color}">{{message.name}}</div>:
          <div id="messageText">{{message.text}}</div>
        </div>
      </div>
      <div id="inputArea">
        <div id="inputAreaSub">
          <textarea v-model="message" name="chat" id="chatArea" cols="15" rows="2" @keyup="emitMessage($event)"></textarea>
          <picker v-show="showEmojiMenu" id="emojiMenu" set="emojione" title="Pick your emoji…" emoji="point_up" @select="addEmoji" />
          <button id="showEmojiMenu" @click="showEmojiMenu = !showEmojiMenu">
            <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px"><g><path d="M7 11a1 1 0 100-2 1 1 0 000 2zM14 10a1 1 0 11-2 0 1 1 0 012 0zM10 14a2 2 0 002-2H8a2 2 0 002 2z"></path><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z" clip-rule="evenodd"></path></g></svg>
          </button>
        </div>
        <!-- <input type="text" name="chat" id="chatInput"> -->
      </div>
    </div>
  </div>
</template>

<script>

import { Picker } from 'emoji-mart-vue'

export default {
  name: 'App',
  props: {
    messages: Array,
    title: {
      type: String,
      default: 'Chat'
    },
    users: Array,
    thisUser: String
  },
  components: {
    Picker
  },
  data () {
    return {
      theme: 'light',
      message: '',
      showEmojiMenu: false,
      showJoinedUsersList: false
    }
  },
  methods: {
    changeTheme () {
      if (this.theme === 'light') {
        this.theme = 'dark'
      } else {
        this.theme = 'light'
      }
    },
    addEmoji (e) {
      this.tempText + '' 
      this.tempText += e.native
    },
    emitMessage (e) {
      if (e.keyCode === 13) {
        this.$emit('sendMessage', {message: this.message, user: this.thisUser})
      }
    }
  },
  mounted() {
    // check for active theme
    let htmlElement = document.documentElement;

    if (htmlElement.getAttribute('theme') === 'dark') {
        htmlElement.setAttribute('theme', 'light')
        this.theme = 'light'
    } else {
        htmlElement.setAttribute('theme', 'ligth');
        this.theme = 'light'
    }
  },
  watch: {
    theme: function () {
      let htmlElement = document.documentElement;

      if (this.theme === 'dark') {
          htmlElement.setAttribute('theme', 'dark');
      } else {
          htmlElement.setAttribute('theme', 'light');
      }
    }
  }
}
</script>

<style>
* {
  overflow: hidden;
  font-family: HELVETICA, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
#app {
  min-height: 100vh;
  width: 100vw;
  background: var(--theme-background-color);
  transition: background 0.2s ease-in-out;
}
#mainChat {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: var(--theme-background-color);
  color: var(--theme-text-color);
  transition: background 0.2s ease-in-out;

}
#chatHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s ease-in-out;
  background: var(--theme-primary-color);
  text-align: center;
  padding: 5px;
}
#peopleButton {
  border-radius: 10px;
  cursor: pointer;
  background: var(--theme-primary-color);
  border: none;
  width: 50px;
  height: 50px;
  transition: background 0.2s ease-in-out;
}
#peopleButton svg {
  fill: var(--theme-text-color);
}
#peopleButton:hover {
  border-radius: 10px;
  background: var(--theme-background-color);
}
#chatHeader #joinedUsersList {
  height: 20%;
  width: 20%;
  position: absolute;
  background: var(--theme-primary-color);
  top: 7%;
  border-radius: 20px;
}
#joinedUsersListSub {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
}
/* #joinedUsersListSub #userListUser {
} */
#messageArea {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  margin-bottom: 15px;
}
#messageArea #messageAreaSub {
  display: flex;
  width: 95%;
  padding: 10px;
}
#messageAreaSub #messageName {
font-weight: 700;  
}
#messageAreaSub #messageText {
  margin-left: 15px;
}
#inputArea {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  margin-bottom: 10px;
}
#inputAreaSub {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  background: var(--theme-primary-color);
  border-color: #38383d;
  transition: background 0.2s ease-in-out;
  border-radius: 15px;
  width: 95%;
  height: 100%;
  padding-left: 10px;
}
#inputArea textarea {
  resize: none;
  border-radius: 15px;
  border: none;
  width: 90%;
  background: var(--theme-primary-color);
  border-color: #38383d;
  color:  var(--theme-text-color);
  transition: background 0.2s ease-in-out;
  font-size: 24px;
  overflow: hidden;
  height: 85%;
}
#inputArea textarea:focus {
  outline: none;
}
#inputAreaSub #showEmojiMenu {
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  float: right;
  margin-right: 2%;
  height: 50px;
  width: 50px;
}
#inputAreaSub #showEmojiMenu svg {
  fill: var(--theme-text-color);
}
#inputAreaSub #emojiMenu {
  position: absolute;
  z-index: 2000;
  top: auto;
  bottom: 10%;
  right: 5%;
}

.switch {
  border-radius: 34px;
  border: solid var(--theme-text-color) 2px;
  float: right;
  position: relative;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #101011;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101011;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
