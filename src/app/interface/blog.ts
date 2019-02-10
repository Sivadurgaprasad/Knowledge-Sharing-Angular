export interface IBlog {
    id: string;
    technology: string;
    subTechnologies: Map<string, SubTechnology>;

}

export interface Archetecture {
    archetecture: string;
    diagram: File;
    explanation: string;
}

export interface Definition {
    definition: string;
    explanation: string;
}

export interface Example {
    example: string;
    explanation: string;
    program: File;
}

export interface InOutput {
    in: string;
    out: string;
}

export interface Scenario {
    archetecture: File;
    explanation: string;
    scenario: string;
}

export interface TechInfo {
    id: string;
    technology: string;
    shortNote: string;
    subTechs: Array<string>;
    uploadImagePath: string;
    deleteImageUrlList: Array<string>;
    techIconName: string;
}

export interface TechInfoResponse {
    id: string;
    technology: string;
    techIconName: string;
    subTechs: Array<string>;
    shortNote: string;
}

export interface SubTechnology {
    subTechnology: string;
    shortNote: string;
    blogs: Map<string, BlogModel>;
}

export interface BlogModel {
    blogId: string;
    blog: string;
    definitions: Definition[];
    examples: Example[];
    importances: string[];
    limitations: string[];
    archetectures: Archetecture[];
    needs: string[]
    references: string[];
    scenarios: Scenario[];
    inOutputs: InOutput[];
    status: string;
}

export interface ImageUrl {
    url: string;
}

export interface BlogDropDown {
    id: string;
    technology: string;
    subTechnologies: Array<string>;
    subTechs: Map<string, string>;
}

export interface Script {
    name: string;
    src: string;
    loaded: boolean;
}

export interface SequenceInc {
    id: string;
    subTechnologyId: string;
    blogId: string;
}

export const ScriptStore: Script[] = [
    { name: "Code Highlighter Script", src: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js", loaded: false }
];