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
        <div class="trial1-box">
            <div style="grid-column: 2 / 3;">释义</div>
            <div>{{ props.word }}</div>
            <div>
                <ElInput v-model="desc" />
            </div>
        </div>
        <div class="button-box">
            <ElButton type="primary" @click="emits('endTrial', desc)">提交</ElButton>
        </div>
    </div>
</template>

<style scoped>
.trial1-box {
    display: grid;
    width: 250px;
    height: 100px;
    grid-template-columns: 50px 200px;
    grid-template-rows: 50px 50px;
}

.button-box {
    text-align: center;
}
</style>