import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import { IBlog, ScriptStore } from '../../interface/blog';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ScriptLoaderService } from '../../service/script-loader.service';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  private blog: IBlog;
  private technology: string;
  constructor(private blogservice: BlogService,
              private activeRoute: ActivatedRoute,
              private utilService: UtilService) { }
  code:string = `
  package com.mkyong.test;

  import java.util.HashMap;
  import java.util.LinkedHashMap;
  import java.util.Map;
  import java.util.stream.Collectors;
  
  public class SortByKeyExample {
  
      public static void main(String[] argv) {
  
          Map<String, Integer> unsortMap = new HashMap<>();
          unsortMap.put("z", 10);
          unsortMap.put("b", 5);
          unsortMap.put("a", 6);
          unsortMap.put("c", 20);
          unsortMap.put("d", 1);
          unsortMap.put("e", 7);
          unsortMap.put("y", 8);
          unsortMap.put("n", 99);
          unsortMap.put("g", 50);
          unsortMap.put("m", 2);
          unsortMap.put("f", 9);
  
          System.out.println("Original...");
          System.out.println(unsortMap);
  
          // sort by keys, a,b,c..., and return a new LinkedHashMap
          // toMap() will returns HashMap by default, we need LinkedHashMap to keep the order.
          Map<String, Integer> result = unsortMap.entrySet().stream()
                  .sorted(Map.Entry.comparingByKey())
                  .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
                          (oldValue, newValue) -> oldValue, LinkedHashMap::new));
  
  
          // Not Recommend, but it works.
          //Alternative way to sort a Map by keys, and put it into the "result" map
          Map<String, Integer> result2 = new LinkedHashMap<>();
          unsortMap.entrySet().stream()
                  .sorted(Map.Entry.comparingByKey())
                  .forEachOrdered(x -> result2.put(x.getKey(), x.getValue()));
  
          System.out.println("Sorted...");
          System.out.println(result);
          System.out.println(result2);
  
      }
  
  }
  
  `;

  ngOnInit() {
    this.technology = this.activeRoute.snapshot.paramMap.get("technology");
    this.blogservice.getBlogService(this.technology).subscribe(blogResponse => {
      console.log(blogResponse);
      // blogResponse.definitions[0].definition = this.utilService.highlight(blogResponse.definitions[0].definition, blogResponse.subTech);
      // blogResponse.definitions[0].explanation = this.utilService.highlight(blogResponse.definitions[0].explanation, blogResponse.subTech);
      this.blog = blogResponse;
    });
  }

}
