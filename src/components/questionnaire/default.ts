interface BaseQues {
    readonly name: string;
    readonly title: string;
    readonly id?: string;
    readonly disabled?: boolean;
    readonly require?: boolean;
}

// 基础填空题
interface TextQues extends BaseQues {
    readonly quesType: "text";
    readonly placeholder?: string;
    readonly readonly?: boolean;
    readonly showPassword?: boolean;
}

// 基础单选题
interface RadioQues extends BaseQues {
    readonly quesType: "radio";
    readonly choices: string[] | number[]
}

// 基础多选题
interface CheckboxQues extends BaseQues {
    readonly quesType: "checkbox";
    readonly choices: string[] | number[]
}

// 选择单选题
interface SwitchQues extends BaseQues {
    readonly quesType: "switch";
    readonly choices: string[]
}

type Ques = TextQues | RadioQues | CheckboxQues | SwitchQues;
const quesAnswerType = {
    text: "",
    radio: "",
    checkbox: [],
    switch: ""
}
export { quesAnswerType };
export type { Ques };
