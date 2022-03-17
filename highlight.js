

function getboxes(box_id){
  console.log(box_id)
  input_tag = document.getElementById(box_id)
  var checkboxes = document.getElementsByName("boxes");
    if(input_tag.checked) {
            highlightdiff(input_tag.value,input_tag.id)
    }
    else{
      // removing element from first svg and second svg

      if (document.getElementById('rectsvg0_'+input_tag.id) != null){
        document.getElementById('rectsvg0_'+input_tag.id).remove();
      }
      if (document.getElementById('rectsvg1_'+input_tag.id) != null){
        document.getElementById('rectsvg1_'+input_tag.id).remove();
      }
    }
}


function highlightdiff(listValue,id_of_checkbox){
  //console.log(listValue)
  

  //document.getElementById('divsvg1').innerHTML = plain_svg1
  //document.getElementById('divsvg2').innerHTML = plain_svg1


  //console.log("starting of func")
  //console.log(document.getElementById('divsvg1'))
  //console.log(document.getElementById('divsvg2'))

  list_value_displayed = listValue.trim().split("-----")
  diff_in_first_svg = list_value_displayed[0].trim()
  diff_in_second_svg = list_value_displayed[1].trim()

  console.log(diff_in_first_svg)
  console.log(diff_in_second_svg)

  addingcustomattr('divsvg1', diff_in_first_svg)
  addingcustomattr('divsvg2', diff_in_second_svg)


  console.log(document.getElementById('divsvg1'))
  console.log(document.getElementById('divsvg2'))

  addingRect('divsvg1','divsvg2', id_of_checkbox)

  removingcustomattr('divsvg1')
  removingcustomattr('divsvg2')

  //console.log("ending of func")
  //console.log(document.getElementById('divsvg1'))
  //console.log(document.getElementById('divsvg2'))
};





function addingcustomattr(divsvgid, list_val_diff_displayed){

  //console.log(divsvgid,list_val_diff_displayed)
  element = document.getElementById(divsvgid)

  svgtag = element.innerHTML
  //console.log(svgtag)

  newsvgtag=""

  if (list_val_diff_displayed.includes("_attributes"))
  {
      json_obj = JSON.parse(list_val_diff_displayed.trim());
      attr_values = json_obj["_attributes"];

      newstr=""

      Object.keys(attr_values).forEach(key => {
        let value = attr_values[key];
        newstr = newstr + key + "=" +'"' + value + '" ';
        //console.log(key, value);
        //console.log(newstr)
      });

      //console.log(attr_values)
      str_with_new_attr= newstr +'customattr="change"'
      newsvgtag = svgtag.replace(newstr.trim(), str_with_new_attr.trim())
      //console.log(newsvgtag)
  }
  else
  {
    newsvgtag = svgtag.replace(list_val_diff_displayed.trim(), list_val_diff_displayed.trim() +'" customattr="change')
    //console.log(newsvgtag)
  }

  document.getElementById(divsvgid).innerHTML = newsvgtag;
  
}






function addingRect(divsvg1,divsvg2, id_of_checkbox){
  //var groupElements = document.getElementsByName("change")

  var groupElements = document.querySelectorAll('[customattr="change"]');

  console.log(groupElements)
  // getting the svg element to append new rect element
    //const iconSvg = document.querySelector('svg');

    var iconSvg1 = document.getElementById(divsvg1);
    var iconSvg2 = document.getElementById(divsvg2);

    //iconSvgs =[iconSvg1,iconSvg2]
    iconSvgs = document.querySelectorAll('svg')

// each group element is the element that has name="change" in it
groupElements.forEach(function(groupElement,index) {

    iconSvg = iconSvgs[index]

    //console.log("========")
    //console.log(index)
    //console.log(iconSvg)
    //console.log(groupElement)
    //console.log("========")


  // creating a rect element
    const rectBBox = document.createElementNS('http://www.w3.org/2000/svg','rect')

  // setting basic rect attrs
    rectBBox.setAttribute('stroke', "#00ff00");
    rectBBox.setAttribute('stroke-width', "3");
    rectBBox.setAttribute('fill', "none");

    rect_id = "rectsvg"+index+"_"  +id_of_checkbox;
    rectBBox.setAttribute('id',rect_id);



    //console.log(groupElement);
  // getting the bounding box for the element that has name="change"
    var bboxGroup = groupElement.getBBox();
    /*
  console.log(bboxGroup.x);
    console.log(bboxGroup.y);
    console.log(bboxGroup.width);
    console.log(bboxGroup.height);
  */
  
  // checking if that elementhas transform attribute. This is to add additional transfomation
    var ttt = groupElement.getAttribute('transform');
    //console.log(ttt)

  // if the element has translate, extract the x,y coordinates to add it to the BB coordinates
    if (ttt !== null) {
    // extracting the x coordinate of the transform and parsing it to float
        translate_x = ttt.split("(")[1].split(",")[0]
        translate_x_float = parseFloat(translate_x)
    
    // extracting the y coordinate of the transform and parsing it to float
        translate_y_with_last = ttt.split(",")[1]
        translate_y = translate_y_with_last.substr(0, translate_y_with_last.length - 1)
        translate_y_float = parseFloat(translate_y)
        
        // add bounding box attributes to the newly created rect attribute
        rectBBox.setAttribute('x', bboxGroup.x + translate_x_float);
        rectBBox.setAttribute('y', bboxGroup.y + translate_y_float);
        rectBBox.setAttribute('width', bboxGroup.width);
        rectBBox.setAttribute('height', bboxGroup.height);
    } 
  // if it does not have translate
  else {
    // add bounding box attributes to the newly created rect attribute
        rectBBox.setAttribute('x', bboxGroup.x);
        rectBBox.setAttribute('y', bboxGroup.y);
        rectBBox.setAttribute('width', bboxGroup.width);
        rectBBox.setAttribute('height', bboxGroup.height);
        
    } 
  // append the newly created rect element (with the attributes of the bounding box) to the SVG
    iconSvg.appendChild(rectBBox);
});
}



function removingcustomattr(divsvgid){
  element = document.getElementById(divsvgid)

  //console.log(element.innerHTML)

  element = element.innerHTML.replace('customattr="change"', "")

  document.getElementById(divsvgid).innerHTML = element;

}



/*


var data1= data

console.log(data1)

console.log(typeof(data1))


var tagelement;
var tag;
var key_of_array;
var flag=false;
var outputjson={};
var flag2=false;
function iterateOrigJson(obj,element,prop1) {
  //console.log("printing old values element")
  //console.log(obj)
  //console.log('prop1',prop1.length)
  //console.log(element)
  
    for(prop in obj) {
        if(typeof(obj[prop]) == "object"){
            if(JSON.stringify(obj[prop]).trim()==element.trim())
              {
                if (obj[prop]['_attributes']!=undefined)
                {
                    obj[prop]['_attributes']['name']='change'
                 }
                 else{
                obj[prop]['_attributes']={'name':'change'}
              }
              flag2=true;
            }
            else if(JSON.stringify(obj[prop]).trim().startsWith('[') && flag==false)
            {
                tag=prop;//title
                tagelement=obj[prop] //[0:{},1:{},2:{}]
                key_of_array=prop //0
                counter=tagelement.length
                //console.log('counter',counter)
                flag=true;
            }
            else if(flag==true && typeof(obj[prop])=="object" && !prop.includes('_'))
            {    
                key_of_array=prop;
                //console.log(counter);
                if(counter==0){
                  flag=false
                }
            }
            else if(!prop.includes('_')){
                tag=prop
                tagelement=obj[prop]
            }            
            if(!flag2)
            {
              iterateOrigJson(obj[prop],element,prop);
            }
            else
            {
              flag2=false
            }
     } else {
         if(obj[prop]==element) {
             if(JSON.stringify(tagelement).trim().startsWith('['))
             {
                if(tagelement[key_of_array]!=undefined && tagelement[key_of_array]['_attributes']!=undefined )
                {
                    tagelement[key_of_array]['_attributes']['name']='change'
                    //tagelement[key_of_array]['_attributes']['class']='overlay'
                }
                else if(tagelement[key_of_array]!=undefined){
                    tagelement[key_of_array]['_attributes']={'name':'change'}
                    //tagelement[key_of_array]['_attributes']={'class':'overlay'}
                }
                counter=counter-1;
                if(counter==0){
                  //console.log('flag is set to false')
                  flag=false
                }
             }
             else
             {
                if(tagelement['_attributes']!=undefined )
                {
                    tagelement['_attributes']['name']='change'
                    //tagelement['_attributes']['class']='overlay'
                }
                else{
                    tagelement['_attributes']={'name':'change'}
                    //tagelement['_attributes']={'class':'overlay'}
                }
             }
             outputjson[tag]=tagelement;
                break;
       }
     }
   }
 }


*/


//console.log("checking type of xml1json before calling iterateOrigJson")
//console.log(typeof(xml1json))
/*
old_values.forEach(element => {
   iterateOrigJson(JSON.parse(xml1json),element,'')
});
*/



/*

console.log("outputjson checking")
console.log(outputjson)
console.log("outputjson checking stringified")
console.log(JSON.stringify(outputjson))

console.log("ADDING NEW CHANGES")


function recursive1(json2){
  Object.keys(json2).forEach(element => {
    console.log("prinitng element")
    console.log(element)
    console.log("printing object.keys of outputjson")
    console.log(Object.keys(outputjson))
    if (typeof(json2[element]) == 'object' && !Object.keys(outputjson).includes(element)){
      recursive1(json2[element])
      console.log("printing inside if")
      console.log("val of output[element]")
      console.log(outputjson[element])
      console.log("val of json2[element]")
      console.log(json2[element])
    }
    else if (Object.keys(outputjson).includes(element)){
      json2[element] = outputjson[element]
        console.log("prinitng inside else if")
        //console.log(element)
        console.log("val of output[element]")
        console.log(outputjson[element])
        console.log("val of json2[element]")
        console.log(json2[element])

    }
  })
  //console.log(JSON.stringify(json2))
}


*/