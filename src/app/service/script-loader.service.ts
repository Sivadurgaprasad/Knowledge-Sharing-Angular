import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Script, ScriptStore } from '../interface/blog';

@Injectable({
  providedIn : "root"
})
export class ScriptLoaderService {

  private scripts: Array<Script> = new Array<Script>();

  constructor() {
    console.log("scripting executed");
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        name: script.name,
        loaded: false,
        src: script.src
      };
    });
  }

  loadAllScripts(...scripts: Script[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  public loadScript(script: Script): Observable<Script> {
    console.log(script.name+" : "+script.src);
    return new Observable<Script>((observer: Observer<Script>) => {
      var existingScript = this.scripts.find(s => s.name == script.name);

      // Complete if already loaded
      if (existingScript && existingScript.loaded) {
        observer.next(existingScript);
        observer.complete();
      }
      else {
        // Add the script
        this.scripts = [...this.scripts, script];

        // Load the script
        let scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.src = script.src;
        scriptElement.async = true;
        scriptElement.charset = 'utf-8';

        scriptElement.onload = () => {
          script.loaded = true;
          observer.next(script);
          observer.complete();
        };

        scriptElement.onerror = (error: any) => {
          observer.error("Couldn't load script " + script.src);
        };

        document.getElementsByTagName('body')[0].appendChild(scriptElement);
      }
    });
  }

}
