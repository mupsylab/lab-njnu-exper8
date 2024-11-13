<script setup lang="ts">
import { ElSlider } from 'element-plus';
import { onMounted, ref } from 'vue';

const emits = defineEmits(["endTrial"]);
const props = defineProps({
    title: String,
    leftLabel: String,
    rightLabel: String,
    length: Number
});

const res = ref(0);
const keyboardEvent = (e: KeyboardEvent) => {
    const { key } = e;
    if (key == " ") {
        emits("endTrial", res.value);
        document.body.parentElement?.removeEventListener("keypress", keyboardEvent);
    }
}
onMounted(() => {
    document.body.parentElement?.addEventListener("keypress", keyboardEvent);
});
</script>

<template>
    <div class="slider-box">
        <div class="title">{{ props.title }}</div>
        <div class="slider">
            <div class="label">{{ props.leftLabel }}</div>
            <div class="core">
                <ElSlider v-model="res"></ElSlider>
            </div>
            <div class="label">{{ props.rightLabel }}</div>
        </div>
    </div>
</template>

<style scoped>
.title {
    font-size: 24px;
    line-height: 36px;
    text-align: left;
    margin: 0 0 96px 0;
}
.slider {
    text-align: center;
}
.slider .label {
    display: inline-block;
    width: 128px;
    height: 48px;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    vertical-align: middle;
}
.slider .core {
    display: inline-block;
    width: calc(100% - 256px);
    vertical-align: middle;
    text-align: center;
}
</style>