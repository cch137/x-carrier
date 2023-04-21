// const { createApp } = require('vue');
const { createApp } = Vue;


const { stringify } = JSON;

const getPin = () => {
  return localStorage.getItem('pin');
}

const app = createApp({
  data() {
    return {
      online: 0,
      items: []
    }
  },
  methods: {
    openFileInput() {
      app.$refs.fileInput.click();
    },
    uploadItem() {
      const formData = new FormData();
      const file = app.$refs.fileInput.files[0];
      formData.append('file', file);
      const xhr = new XMLHttpRequest();
      xhr.open('post', `/`);
      xhr.setRequestHeader('pin', getPin());
      xhr.send(formData);
      app.$refs.fileInput.value = '';
      xhr.onload = () => {
        if (xhr.status != 200) {
          alert(xhr.responseText);
        }
      }
    },
    deleteItem(fn) {
      // if (!confirm(`Do you want to permanently delete "${fn}"?`)) return;
      const xhr = new XMLHttpRequest();
      xhr.open('delete', `/?pin=${getPin()}file=${fn}`);
      xhr.setRequestHeader('pin', getPin());
      xhr.send();
      xhr.onload = () => {
        if (xhr.status != 200) {
          alert(xhr.responseText);
        }
      }
    },
    logout() {
      localStorage.removeItem('pin');
      location.reload();
    }
  },
  computed: {
    isNotEmpty() {
      return Boolean(this.items.length);
    }
  }
}).mount('#view');

const ws = new WebSocket(location.origin.replace(/^http/, 'ws'));

ws.onmessage = (ev) => {
  const { data: unparseData } = ev;
  const { event, data } = JSON.parse(unparseData);
  switch (event) {
    case 'update':
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/list');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.send(`pin=${getPin()}`);
      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          app.items = data;
        } else {
          alert(xhr.responseText);
        }
      }
      break;
    case 'online':
      app.online = data;
      break;
  }
}

ws.onclose = () => location.reload();

history.replaceState(0, 0, location.pathname);

document.getElementById('view').classList.remove('op-0');