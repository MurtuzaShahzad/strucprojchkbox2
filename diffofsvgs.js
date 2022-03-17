
const xml1 = document.getElementById('divsvg1');
const xml2 = document.getElementById('divsvg2');
console.log(document.getElementById('divsvg1'));
console.log(document.getElementById('divsvg2'));

console.log(xml1)
console.log(xml2)

// converting xmls to JSONS
var xml1json = xml2json(xml1.innerHTML, {compact: true, spaces: 4});
var xml2json = xml2json(xml2.innerHTML, {compact: true, spaces: 4});

console.log(xml1json)
console.log(xml2json)

// getting the diff of JSONs

result_of_diff = diff(JSON.parse(xml1json),JSON.parse(xml2json))
console.log(result_of_diff)



// two arrays to store the JSON differences
var old_values=[]
var new_values=[] 
function iterateObject(obj) {
   for(prop in obj) {
    if(typeof(obj[prop]) == "object"){
      if (obj[prop][0]=='-'){
        old_values.push(JSON.stringify(obj[prop][1]));
        new_values.push("Element missing")
      }
      else if (obj[prop][0]=='+'){
        new_values.push(JSON.stringify(obj[prop][1]));
        old_values.push("Element missing")
      }
      else if (prop!='id'){
        iterateObject(obj[prop]);
      }
    } else {
      if(prop=='__old' || prop.includes('__deleted')) {
          // Do something with this data
           old_values.push(obj[prop])
      }
        if(prop=='__new' || prop.includes('__added')) {
          // Do something with this data
           new_values.push(obj[prop])
      }
    }
  }
}

// calling the function to get the JSON diffs in two arrays
iterateObject(result_of_diff)
// displaying the diff arrays
console.log("The old values array:")
console.log(old_values)
console.log("The new values array:")
console.log(new_values)



//saving xml1json and xml2json

/*
fs.writeFile("xml1json.json", xml1json, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})
fs.writeFile("xml2json.json", xml2json, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})
*/




//fileContent = fs.readFileSync('SVG_highlight.html', 'utf8')
var s1 = '<ul>'

/*
old_values.forEach(element=>{
  s1= s1 + '<li onclick="highlightdiff(event)"> ' + element + ' </li>'
});
*/

var counter=1;

old_values.forEach((element1, index) => {
  const element2 = new_values[index];
  console.log(element1, "-----", element2, "\n");
  list_item_to_display = element1+"-----"+element2+"\n";
  s1= s1 + '<input type="checkbox" id="checkbox'+counter+'" + name="boxes" onclick="getboxes(\'checkbox'+counter+'\')" value='+list_item_to_display +' /> ' + list_item_to_display + '<br>'
  counter = counter+1;
});

s1 = s1 + '</ul>'

//console.log(s1)




const innercontentoflist = document.querySelector('div#listofdiffs');
innercontentoflist.innerHTML = s1;





primary_old=[];
primary_new=[];
secondary_old=[];
secondary_new=[];
cosmetic_old=[];
cosmetic_new=[];

old_values.forEach((element1, index) => {
  const element2 = new_values[index];


  // element missing is added to primary change
  if (element1.includes("Element missing") || element2.includes("Element missing")){
    primary_old.push(element1);
    primary_new.push(element2);
    return;
  }

  // attributes adding to primary change
  if (
    element1.includes("cx") || element1.includes("cy") || element1.includes("r=") || element1.includes("r =") || element1.includes("rx") || element1.includes("ry") || 
    element1.includes("height") || element1.includes("width") || element1.includes("x") || element1.includes("y") || element1.includes("preserveAspectRatio") ||
    element1.includes("x1") || element1.includes("x2") || element1.includes("y1") || element1.includes("y2") || element1.includes("pathLength") || element1.includes("points") ||
    
    element2.includes("cx") || element2.includes("cy") || element2.includes("r=") || element2.includes("r =") || element2.includes("rx") || element2.includes("ry") || 
    element2.includes("height") || element2.includes("width") || element2.includes("x") || element2.includes("y") || element2.includes("preserveAspectRatio") ||
    element2.includes("x1") || element2.includes("x2") || element2.includes("y1") || element2.includes("y2") || element2.includes("pathLength") || element2.includes("points")
    )
  {
    console.log(element1)
    primary_old.push(element1);
    primary_new.push(element2);
    return;
  }

  // attributes adding to secondary change
  if (
    element1.includes("clip-path") || element1.includes("display") || element1.includes("fill-rule") || element1.includes("stroke-dasharray") || element1.includes("stroke-dashoffset") || 
    element1.includes("stroke-linecap") || element1.includes("stroke-linejoin") || element1.includes("stroke-miterlimit") || element1.includes("stroke-width") || element1.includes("transform") ||
    element1.includes("matrix") || element1.includes("translate") || element1.includes("scale") || element1.includes("rotate") || element1.includes("skewX") ||
    element1.includes("skewY") || element1.includes("vector-effect") || element1.includes("visibility") ||
    
    element2.includes("clip-path") || element2.includes("display") || element2.includes("fill-rule") || element2.includes("stroke-dasharray") || element2.includes("stroke-dashoffset") || 
    element2.includes("stroke-linecap") || element2.includes("stroke-linejoin") || element2.includes("stroke-miterlimit") || element2.includes("stroke-width") || element2.includes("transform") ||
    element2.includes("matrix") || element2.includes("translate") || element2.includes("scale") || element2.includes("rotate") || element2.includes("skewX") ||
    element2.includes("skewY") || element2.includes("vector-effect") || element2.includes("visibility")
    )
  {
    secondary_old.push(element1);
    secondary_new.push(element2);
    return;
  }


  // attributes adding to cosmetic change
  if (
    element1.includes("clip-rule") || element1.includes("color") || element1.includes("color-interpolation") || element1.includes("color-rendering") || element1.includes("fill") || 
    element1.includes("fill-opacity") || element1.includes("filter") || element1.includes("mask") || element1.includes("opacity") || element1.includes("pointer-events") ||
    element1.includes("shape-rendering") || element1.includes("stroke") || element1.includes("stroke-opacity") || 
    
    element2.includes("clip-rule") || element2.includes("color") || element2.includes("color-interpolation") || element2.includes("color-rendering") || element2.includes("fill") || 
    element2.includes("fill-opacity") || element2.includes("filter") || element2.includes("mask") || element2.includes("opacity") || element2.includes("pointer-events") ||
    element2.includes("shape-rendering") || element2.includes("stroke") || element2.includes("stroke-opacity")
    )
  {
    cosmetic_old.push(element1);
    cosmetic_new.push(element2);
    return;
  }




});


console.log("+++++++++++++++++++++++++")
console.log("+++++++++++++++++++++++++")
console.log(primary_old)
console.log(primary_new)
console.log("+++++++++++++++++++++++++")
console.log("+++++++++++++++++++++++++")

console.log("+++++++++++++++++++++++++")
console.log("+++++++++++++++++++++++++")
console.log(secondary_old)
console.log(secondary_new)
console.log("+++++++++++++++++++++++++")
console.log("+++++++++++++++++++++++++")

console.log("+++++++++++++++++++++++++")
console.log("+++++++++++++++++++++++++")
console.log(cosmetic_old)
console.log(cosmetic_new)
console.log("+++++++++++++++++++++++++")
console.log("+++++++++++++++++++++++++")

