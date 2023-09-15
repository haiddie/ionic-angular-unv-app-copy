import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  constructor(
   public meta: Meta
  ) { }
  

  addMetaTags(metaTags: MetaDefinition[]){ 
    this.meta.addTags(metaTags)
  
  } 


  updateMetaTags(metaTags: MetaDefinition[]){

    
     metaTags.map(m=> 
       {
        this.meta.updateTag(m);
        
       })
     
}

removeMetaTags( tagElements  ){   
     return tagElements.map(element=>  { this.meta.removeTag(element) })
}

}


