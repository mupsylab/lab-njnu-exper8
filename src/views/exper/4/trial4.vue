<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const emits = defineEmits(["endTrial"]);
const props = defineProps({
    title: String,
    desc: String,
    options: {
        type: Array<Number>,
        default: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    optionLabelMax: String,
    optionLabelMin: String,
    view: {
        type: Boolean,
        default: false
    }
});

const res = ref(0);
const keyboardEvent = (e: KeyboardEvent) => {
    const { key } = e;
    if (key == " " && res.value > 0) {
        emits("endTrial", res.value);
        document.body.parentElement?.removeEventListener("keypress", keyboardEvent);
    } else if (key == " ") {
        ElMessage.error("请选择合适的选项");
    }
    e.preventDefault();
    return false;
}
onMounted(() => {
    if (!props.view) document.body.parentElement?.addEventListener("keypress", keyboardEvent);
});
</script>

<template>
    <div class="trial4-box">
        <div class="title">
            {{ props.title }}
        </div>
        <div class="choose">
            <label v-for="o, i in props.options" :for="`cc_${i}`">
                <input type="radio" :id="`cc_${i}`" name="cc" :value="o" v-model="res" />
                <span>{{ o }}</span>
                <p v-if="i == 0">{{ props.optionLabelMin }}</p>
                <p v-if="i == (props.options.length - 1)">{{ props.optionLabelMax }}</p>
            </label>
        </div>
        <div class="desc">
            {{ props.desc }}
        </div>
    </div>
</template>

<style scoped>
.trial4-box {
    width: 920px;
    text-align: center;
    user-select: none;
}

.title {
    font-size: 36px;
    line-height: 48px;
}

label {
    display: inline-block;
    width: 96px;
    padding: 30px 0 0 0;
    margin: 60px 0 0 0;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
    background-image: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), 
                      linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%);
    background-repeat: no-repeat;
    background-position: 47px 0px, 0px 41px;
    background-size: 2px 30px, 100% 2px;
}

label:first-child {
    background-image: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), 
                      linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%);
    background-repeat: no-repeat;
    background-position: 47px 0px, 100% 41px;
    background-size: 2px 30px, 50% 2px;
}
label:last-child {
    background-image: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), 
                      linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%);
    background-repeat: no-repeat;
    background-position: 47px 0px, 0% 41px;
    background-size: 2px 30px, 50% 2px;
}

label p {
    width: 96px;
    text-align: center;
}

label input {
    display: block;
    margin: auto;
    width: 24px;
    height: 24px;
}

label span {
    display: block;
    width: 24px;
    height: 24px;
    margin: auto;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
}

.desc {
    font-size: 24px;
    line-height: 36px;
    font-weight: 100;
}
</style>