<script setup lang="ts">
import { ElButton } from 'element-plus';
import { Ref, ref } from 'vue';

const emits = defineEmits(["endTrial"]);
const r = ref(0);
const prev = () => {
    if(r.value > 1) r.value -= 1;
};
const next = () => {
    document.body.parentElement?.scrollTo(0, 0);
    if(r.value <= 2) r.value += 1;
    if(r.value == 3) emits("endTrial");
};
const domRef: Ref<HTMLDivElement | null> = ref(null);
</script>

<template>
    <div class="instr-box" ref="domRef">
        <template v-if="r == 0">
            <div>实验内容介绍</div>
            <div>
                <p>您好，欢迎参加本次实验。为充分保障您的权利，在以下关于实验的介绍结束后，您将看到两份知情同意书，表示您已经了解本研究的内容、潜在风险以及数据共享计划。如果您选择继续实验，则表示您已经清楚并同意知情同意书的所有内容。</p>
                <p>以下是关于实验任务的介绍：</p>
                <p>在本实验中，您会进行一系列实验任务，每个任务的要求不同。您需要根据每个任务的要求认真进行实验，回答没有正误之分，根据您的理解和直觉完成即可。</p>
                <p>在正式进入实验前，若您对实验的指导语或者本实验还有不清楚之处，可咨询实验员。</p>
            </div>
        </template>
        <template v-if="r == 1">
            <div>参与实验知情同意书</div>
            <div>
                <p><strong>调查目的:</strong>本实验目的是为了探究人们对于词语的使用和熟悉度。</p>
                <p><strong>您需要做什么:</strong>在本实验中，您需要根据每部分的实验任务要求进行回答。关于每部分任务的具体说明，可见实验指导语。</p>
                <p><strong>所需时间:</strong>本实验需要大约3-5分钟。</p>
                <p><strong>风险:</strong>参加本次实验没有任何可预见的风险，但您可能会由于实验任务而感到疲劳或者无聊。</p>
                <p><strong>收益:</strong>您在本实验中的主要收益是您对于科学研究的贡献！同时，为了补偿您参加研究所花费的时间和精力，我们将给予您一定的经济补偿 (¥5)，该经济补偿将通过网络进行发放。为保证本研究的数据质量，我们会在实验结束后对您的数据进行检查，如果存在不认真的情况，您的数据将被视为无效，您的报酬为0元。希望您能够理解本研究的设定，认真对待实验。当然，如果您认为本研究的这个设定不符合您的偏好，您有权选择不参加本次实验。</p>
                <p><strong>隐私:</strong>我们将完全保密您在本实验中给出的所有信息。您的数据将被存在安全的数据库，您的信息将会被编码，您的名字也不会在任何报告中出现。此外，您数据中的隐私部分（包括姓名，联系方式等）将至少被安全保存<10>年。在该期限后，我们将会销毁这些信息以保护您的隐私。在实验结束后，去除所有个人信息的数据将会公布出来，以用于其他研究的使用和评估。</p>
                <p><strong>自愿参与:</strong>是否参加本研究完全由您自愿决定。但是，参加本研究的前提是您理解本研究的指导语、实验流程和相关设置，并表示接受。如果您不理解本研究的指导语、实验流程和关于数据有效性的检测，您将无法参加这项研究。</p>
                <p><strong>退出实验的权利:</strong>您有权在实验中的任何阶段退出本次实验，不会有任何的惩罚。我们会根据您完成实验的情况，补偿您在本实验所花费的时间。</p>
                <p><strong>如何退出:</strong>如果您决定退出本次实验，请告知实验员，我们会立即终止实验。 如果您有任何疑问，请联系：胡传鹏教授（南京师范大学心理学院，江苏省南京市鼓楼区宁海路122号，210024；Email: hu.chuan-peng@nnu.edu.cn；Tel: 15910258380）</p>
                <p><strong>同意书:</strong>如果您点击“继续”按键继续实验，代表您已经理解了本研究的指导语、研究的流程和关于数据有效性的设置，也同意向未来的研究者共享您的数据。</p>
            </div>
        </template>
        <template v-if="r == 2">
            <div>公开数据知情同意书</div>
            <div>
                <p>本次研究的费用来自于政府的科研资助，也就是来自于纳税人公共资金，而本次实验的数据提供者是您本人，所以本次实验的实验数据的直接所有者是您本人。将本研究的数据公开、且能为其他研究者使用，将会更大程度上地充分利用公共资金（例如，其他研究者可能不需要再次收集类似的数据），从而将您对科研界及人类社会的贡献最大化。但数据公开需要获得您的直接同意。</p>
                <p>公开本实验的数据，意味着您在本研究中所提供的数据未来可能会被其他研究项目使用。未来这些项目也许会与本研究的问题相关，也有可能无关。我们使用网络存储的公开数据库，将本次研究中的数据完全公开。</p>
                <p>共享的数据中不会出现您的姓名，而仅以代号显示，所以他人不会获知您的姓名，也无法将数据与您进行对应。此外，我们也将对其他敏感信息进行保密，避免了解您的人通过某些信息猜测到哪些是您的数据。</p>
                <p>如果您改变主意并想将此同意书撤回（您可以通过拨打『+8615910258380』致电『胡传鹏博士』来执行此操作），我们将不会录入关于您的任何额外数据。如果您在数据被录入数据库之前申请撤回，您的数据将能够被及时删除。请注意，所有已经公开共享给其他研究者或公开的数据和研究结果已经被匿名处理，无法再进行销毁或撤回。</p>
                <p>同意参与本研究，意味着您的数据将可能会在其他研究中被重复使用，这些研究可能会让人类社会变得更好。还有可能的是，使用您所共享数据的研究会有助于开发出新的诊断量表、新药物或其他产出。但是如果出现这些情况，您本人不会从这些产品中获得任何利益，也不会获得这些产品的任何所有权。</p>
                <p>根据我们充分了解到的情况，我们向公众共享的数据中将不会包含能够直接识别出您身份的信息。数据中没有您的名字、只有编码的数字，因此他人不会知道您的名字或者知道哪个数据是您。此外，数据中不会包括我们认为可能会让了解您的人猜测到哪个数据属于您的信息，比如您参与研究的日期等。如果我们就本研究撰写报告、文章，或者将本次研究的数据分享给他人，我们也将确保您不会被识别出来</p>
                <p>然而，非法的安全破坏（比如，网络入侵或网络攻击）可能会导致他人从数据中识别您的身份。但是，这种风险很低，因为我们会将您的数据储存在安全的数据库；并且，您的身份信息与数据是分开存储的，只有一个代码可以将二者联系起来。</p>
                <p>您数据的隐私部分（包括姓名，联系方式等）将至少被安全保存10年。在该期限后，我们将会销毁这些信息以保护您的隐私。</p>
                <p>是否让我们使用及分享您的数据将完全由您自愿决定。但是，参加本研究的前提是您愿意使用这种方式来分享您的数据。如果您不愿意，您将无法参加这项研究。</p>
                <p>如果您继续后续步骤，代表您充分理解上述关于公开数据的说明，同意在不清楚未来研究的细节、结果和应用的前提下，向未来的研究共享您的数据，与来自世界各地研究机构的研究者共享您的数据。 </p>
            </div>
        </template>
        <div class="button-box">
            <ElButton type="primary" @click="prev">上一页</ElButton>
            <ElButton type="primary" @click="next">{{ r == 2 ? "开始实验" : "下一页" }}</ElButton>
        </div>
    </div>
</template>

<style scoped>
.instr-box > div:nth-child(1) {
    font-size: 32px;
    line-height: 48px;
    text-align: center;
}

.instr-box > div:nth-child(2) {
    font-size: 18px;
    line-height: 28px;
    text-indent: 2em;
}

.button-box {
    text-align: center;
}
</style>