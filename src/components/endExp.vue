<script setup lang="ts">
import { onMounted } from 'vue';

const emits = defineEmits(["endTrial"]);
onMounted(() => {
    emits('endTrial');
});
</script>

<template>
    <div class="end-exp" @click="emits('endTrial');">
        <div class="content-box">
            <div>实验结束</div>
            <slot></slot>
        </div>
        <div class="footer">
            &copy; Mupsy 技术支持
        </div>
    </div>
</template>

<style scoped>
.end-exp {
    text-align: center;
    cursor: pointer;
}
.end-exp .content-box {
    font-size: 48px;
    line-height: 96px;
}
.end-exp .footer {
    color: var(--font-desc);
}
</style>