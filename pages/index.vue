<template>
  <div class="mt-8 flex-col flex-center">
    <div v-if="isLoggedIn">
      <div>
        <el-button :icon="Upload" :loading="isLoading">Upload</el-button>
        <el-button :icon="Refresh" @click="loadFileList()" :loading="isLoading">Refresh</el-button>
      </div>
      <div class="FileList mt-8">
        <a
          v-for="fp in fileList"
          class="FileItem"
          :href="`/api/drive/file/${fp}`"
          target="_blank"
        >
          <el-text size="large">{{ fp }}</el-text>
        </a>
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
import { Upload, Refresh } from '@element-plus/icons-vue'
import { appName } from '~/constants/app';

const { isLoggedIn } = useAuth();

const isLoading = ref(false);
const fileList = ref<string[]>([]);

async function loadFileList() {
  isLoading.value = true;
  const loading = ElLoading.service({ text: 'Loading...' });
  try {
    const res = await $fetch('/api/drive/list', { method: 'POST' });
    fileList.value = res.data;
  } catch {}
  isLoading.value = false;
  loading.close();
}

watch(isLoggedIn, (value) => value ? loadFileList() : null);

if (process.client) {
  if (isLoggedIn.value) loadFileList();
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
  display: block;
  padding: .5rem 1rem;
  border-bottom: 1px solid #80808080;
  transition: .3s ease-in-out;
}

.FileItem:hover {
  background: #ffffff10;
}
</style>