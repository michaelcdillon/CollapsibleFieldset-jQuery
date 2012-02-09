CollapsibleFieldset Plugin for jQuery.

---
Installation
---

Add the plugin javascript file and the plugin css file to your page.

---
Usage
---
   
Dtandard usage:
    html:

    <div target="#div1" class="collapsible">Field Set 1</div>
    <div id="div1"> blah blah blah</div>

    script:
    
    $('.collapsible').collapsibleFieldset (); 

    result:
       Standard collapsible fieldset which is default uncollapsed.
  
Passing options:
    html:

    <div target="#div1" class="collapsible">Field Set 1</div>
    <div id="div1"> blah blah blah</div>

    script:

    $('.collapsible').collapsibleFieldset ({collapsed: true, speed: 100}); 

    result:
       All targeted divs are collapsed.
  
Per Anchor Collapsed / Uncollapsed:
    html:

    <div target="#div1" class="collapsible" collapsedintially="false">Field Set 1</div>
    <div id="div1"> blah blah blah</div>

    script:

    $('.collapsible').collapsibleFieldset ({collapsed: true, speed: 100}); 

    result:
       The fieldset is uncollapsed because its collapsed declaration takes
       priority over the global option
