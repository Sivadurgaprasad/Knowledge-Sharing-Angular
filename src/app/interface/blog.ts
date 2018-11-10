export interface IBlog {
    tech: string;
    subTechs: SubTech[];
    
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
    blog: string;
    shortNote: string;
    subTechs: SubTech[];
}

export interface TechInfoResponse {
    id: string;
    blog: string;
    blogIconName: string;
    subTechs: Array<SubTech>;
}

export interface SubTech {
    subTech: string;
    definitions: Definition[];
    examples: Example[];
    importances: string[];
    limitations: string[];
    archetectures: Archetecture[];
    needs: string[]
    references: string[];
    scenarios: Scenario[];
    inOutputs: InOutput[];
}

export interface ImageUrl {
    url: string;
}

export interface BlogDropDown {
    id: string;
    blog: string;
    subTechs: Array<SubTech>;
}

export interface Script {
    name:string;
    src:string;
    loaded:boolean;
}

export const ScriptStore:Script[] = [
    {name: "Code Highlighter Script", src : "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js", loaded: false}
];