<template>
  <div class="mt-8 flex-col flex-center">
    <div v-if="isLoggedIn">
      <div>
        <el-button :icon="Upload" @click="fileUplaodEl().click()" :loading="isLoading">Upload</el-button>
        <el-button :icon="Refresh" @click="loadFileList()" :loading="isLoading">Refresh</el-button>
        <form style="display: none;">
          <input class="FileUpload" type="file" multiple @change="fileUploadChanged()" />
        </form>
      </div>
      <div class="FileList mt-8">
        <div v-if="fileList.length === 0">
          <div class="text-center select-none">
            <el-text type="info">No files</el-text>
          </div>
        </div>
        <div v-for="fp in fileList" class="FileItem flex justify-center items-center">
          <a
            class="flex-1"
            :href="`/api/drive/file/${fp}`"
            target="_blank"
          >
            <el-text size="large">{{ fp }}</el-text>
          </a>
          <el-button
            class="FileItemDeleteBtn mx-1"
            :icon="Delete" type="danger"
            plain
            :loading="isLoading"
            @click="deleteFile(fp)"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Welcome to Drive!</h1>
      <div class="mt-8 text-center">
        <el-text size="large">You are not logged in. </el-text>
        <el-text size="large">Please </el-text>
        <NuxtLink href="/login">
          <el-button size="small" class="HomepageLoginButton mb-1">Log In</el-button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElLoading } from 'element-plus';
import { Upload, Refresh, Delete } from '@element-plus/icons-vue'
import { appName } from '~/constants/app';

const { isLoggedIn } = useAuth();

const isLoading = ref(false);
const fileList = ref<string[]>([]);

async function _fetchFileList() {
  try {
    const res = await $fetch('/api/drive/list', { method: 'POST' });
    fileList.value = res.data;
  } catch {}
}

async function loadFileList() {
  isLoading.value = true;
  const loading = ElLoading.service({ text: 'Loading...' });
  await _fetchFileList();
  isLoading.value = false;
  loading.close();
}

function fileUplaodEl() {
  return document.querySelector('.FileUpload') as HTMLInputElement;
}

async function fileUploadChanged() {
  isLoading.value = true;
  const loading = ElLoading.service({ text: 'Loading...' });
  const formData = new FormData();
  const files = fileUplaodEl().files || [];
  for (let i = 0; i < files.length; i++) formData.append(`${i}`, files[i]);
  await $fetch('/api/drive/file', { method: 'POST', body: formData });
  isLoading.value = false;
  loading.close();
}

async function deleteFile(fp: string) {
  isLoading.value = true;
  const loading = ElLoading.service({ text: 'Loading...' });
  await $fetch('/api/drive/file', { method: 'DELETE', body: { fp } });
  isLoading.value = false;
  loading.close();
}

watch(isLoggedIn, (value) => value ? loadFileList() : null);

if (process.client) {
  if (isLoggedIn.value) loadFileList();
}

async function startListening() {
  const controller = new AbortController()
  const streamRes = await fetch('/api/drive/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
    signal: controller.signal
  });
  const decoder = new TextDecoder();
  // @ts-ignore
  const reader = streamRes.body.getReader();
  const readChunks = async () => {
    await reader.read().then(async ({ value, done }) => {
      if (done) return;
      const decodedValue = decoder.decode(value);
      _fetchFileList();
      readChunks();
    });
  }
  readChunks()
}

if (process.client) {
  startListening();
}

useTitle(`Home - ${appName}`)
definePageMeta({
  layout: 'default'
})
</script>

<style>
.HomepageLoginButton span {
  transform: scale(1.125);
}

.FileList {
  max-width: 90vw;
  width: 540px;
}

.FileItem {
  border-bottom: 1px solid #80808080;
}

.FileItem a {
  padding: .5rem 1rem;
  transition: .3s ease-in-out;
}

.FileItem a:hover {
  background: #ffffff10;
}

.FileItemDeleteBtn {
  padding: 8px;
}
</style>