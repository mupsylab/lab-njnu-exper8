<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElButton } from 'element-plus';

const emits = defineEmits(["endTrial"]);
const props = defineProps({
    word: String
});

const desc = ref("");
</script>

<template>
    <div>
        <div class="instr-box">
            <p>您需要<strong>对屏幕上呈现的词语进行释义，填写时请输入中文汉字（要求：填写需尽可能详细，如果感觉有多个释义，可在每个释义后用 ；隔开），在完成后请按“提交”继续。</strong></p>
            <p>注意，对于每个词语的释义因人而异，没有对错之分，在填写的时候依据自己的理解即可。</p>
        </div>
        <div class="trial1-box">
            <div style="grid-column: 2 / 3;">释义</div>
            <div>{{ props.word }}</div>
            <div>
                <ElInput v-model="desc" />
                <div style="font-size: 16px; line-height: 24px;">请尽可能详细的填写</div>
            </div>
        </div>
        <div class="button-box">
            <ElButton type="primary" @click="emits('endTrial', desc)">提交</ElButton>
        </div>
    </div>
</template>

<style scoped>
.instr-box {
    margin: 0 0 100px 0;
}
.instr-box p {
    font-size: 16px;
    line-height: 28px;
}
.trial1-box {
    display: grid;
    width: 325px;
    height: 100px;
    margin: 30px auto;
    grid-template-columns: 75px 250px;
    grid-template-rows: 50px 50px;
    font-size: 24px;
    line-height: 36px;
}

.button-box {
    text-align: center;
}
</style>