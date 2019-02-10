import { Injectable } from '@angular/core';
import { Object } from 'core-js';
import { ArrayType } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() { }

    /**
     * Highlight the specific words in the Blog.
     * @param content 
     * @param query 
     */
    public highlight(content: string, query: string) {
        if (!query) {
            return content;
        }
        return content.replace(new RegExp(query, "gi"), match => {
            return '<span class="font-weight-bold">' + match + '</span>';
        });
    }

    /**
     * It capitalize all first charters in a string. If String length 2 it convert both chars capitalize.
     * @param word 
     */
    public capitalizeFirst(word: string): string {
        var result:string = null;
        let tokens:string[]  = word.split(" ");
        tokens.forEach(token =>{
            if(token.length == 2){
                result = result === null ? token.toUpperCase() : result.concat(" ").concat(token.toUpperCase());
            } else {
                token = token[0].toUpperCase().concat(token.slice(1));
                result = result === null ? token : result.concat(" ").concat(token);
            }
        });
        return result == null ? word : result.trim();
    }

    /**
     * It converts Map of Objects to Array of strings.
     * @param data 
     * @param key 
     */
    public convertMapToArray(data:Array<object>, key:string) {
        for(let i=0; i < data.length; i++) {
            data[i] = data[i][key];
        }
    }

}
