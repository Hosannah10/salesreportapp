import React, { useEffect, useState } from 'react';
import './sales.css';
  
function Sales () {

  /** "selected" here is state variable which will hold the
   * value of currently selected dropdown.
   */
  const [selected, setSelected] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  var eagleID = `3`;
  var bullID = `4`;
  var lionID = `5`;
  
  const [tom, setTom] = useState([]);

  const [tm, setTm] = useState([]);

  const [tea, setTea] = useState([]);
  
  const [team, setTeam] = useState([]);
  
  //operation to fetch the date data and update the values
  //var firstdate = `2022-11-01`;
  //var seconddate = `2023-02-20`;

  var startDate = `Nov 1, 2022`;
  var endDate = `Feb 20, 2023`;
  
  // let date1  = startDate;
  const [date1, setDate1] = useState(startDate);
  // let date2  =  endDate;
  const [date2, setDate2] = useState(endDate);
  // const [isbuttonClicked, setisButtonClicked] = useState(false);

  // function setNewDate () {
  //   setisButtonClicked(true);
  // };

  // function formatDate(dateString) {
  //   var date = new Date(dateString);
  //   var options = {
  //     month: "long" ,
  //     day:  "numeric",
  //     year: "numeric",
  //   };
  //   return date.toLocaleDateString("en-US", options);
  // }

  function handleDate1Change (event) {
      setDate1(event.target.value);
  };

  function handleDate2Change (event) {
      setDate2(event.target.value);
  };

  
  /** Function that will set different values to state variable
   * based on which dropdown is selected
   */
  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  const handleOptionSelect = (event) => {
    setSelectedOptionIndex(event.target.value);
    
  };

  const getUniqueValues = (array) => (
    [...new Set(array)]
  );
  
  const getUniqueObj = (array) => (
    new Set(array)
  );

  const compareAndArrangeObjects = (firstObj, secondObj) => {
    const firstObjKeys = Object.keys(firstObj);
    const arrangedObj = {};
  
    firstObjKeys.forEach(key => {
      if (secondObj.hasOwnProperty(key)) {
        arrangedObj[key] = secondObj[key];
      }
    });
  
    return arrangedObj;
  };

  let teamID = eagleID;

  if (selected === "EAGLE") {
    teamID = eagleID;
    
  }
   else if (selected === "BULL") {
    teamID = bullID;
   
  }
   else if (selected === "LION") {
    teamID = lionID;
    
  }

  var teamUrl = `https://gplsales.3coretechnology.com/api/report/download/visits?from=${date1}&to=${date2}&rep_id=&team_id=${teamID}`;
  useEffect(() => {
  fetch(teamUrl).then(function(response){
    return response.json()
}).then(function(data){
    //console.log(data)
    const genteam = data?.visits?.map(x => x)

    const tom = genteam.map((x)=>{
      return {
         name: x.name, 
         purpose: x.purpose,
         visit_type: x.visit_type,
         business_name: x.business_name
      }
   })
   //console.log(tom)
   setTom(tom)

    const tm = genteam.map((x)=>{
      return {
         name: x.name, 
         visit_type: x.visit_type,
         business_name: x.business_name
      }
   })
   //console.log(tm)
   setTm(tm)

      const tea = genteam.map(function (x){
       return {
          name: x.name, 
         business_name: x.business_name
        }
    })
    //console.log(tea)
    setTea(tea)
    
  const team = genteam.map((x)=>{
    return  x.name
   })
     var uniqueName = getUniqueValues(team);
     //console.log(uniqueName)
     setTeam(uniqueName)
})
},[teamUrl]);


/**Customers*/   //Benchmark
const result = tea.reduce((acc, curr) => {
  if (!acc[curr.name]) {
    acc[curr.name] = [];
  }
  acc[curr.name].push(curr.business_name);
  return acc;
}, {});
 //console.log(result);
var rest = Object.values(result)
//console.log(rest)


//Active & Inactive Unique Customers Visited
var semo = tom.map((object) => JSON.stringify(object))
//console.log(semo)
var uniqueSemo = getUniqueObj(semo)
//console.log(uniqueSemo)
var uniques = Array.from(uniqueSemo)
//console.log(uniques)
var uniquesemo = uniques.map((string)=>JSON.parse(string))
 //console.log(uniquesemo)

 const garri = uniquesemo.reduce((acc, curr) => {
  if (!acc[curr.purpose]) {
    acc[curr.purpose] = [];
  }
  acc[curr.purpose].push({name:curr.name, business_name:curr.business_name, visit_type:curr.visit_type});
  return acc;
}, {});
 console.log(garri);

//Benchmark
 var other = garri?.OTHERS?.map(x => x)
 //var detail = garri?.DETAILING?.map(x => x);
 //console.log(detail)
 const others = []
 if (other) {
  others.push(...other)
}
 console.log(others)
 const rice = others.reduce((acc, curr) => {
  if (!acc[curr.visit_type]) {
    acc[curr.visit_type] = [];
  }
  acc[curr.visit_type].push({name:curr.name,business_name:curr.business_name});
  return acc;
}, {});
//console.log(rice)
  var beans = Object.values(rice);
  //console.log(beans)
   var fish = beans[0];
   const fishes = []
   if (fish) {
    fishes.push(...fish)
  }
   
   var egg = fishes.reduce((acc, curr) => {
     if (!acc[curr.name]) {
       acc[curr.name] = [];
     }
     acc[curr.name].push(curr.business_name);
     return acc;
   }, {});
     console.log(egg)
     var eggroll = [egg]
     //console.log(eggroll)
      //  var dell = Object.values(egg);
      //  console.log(dell) 
      
 //Active unique customers visited
 var collect = garri?.COLLECTIONS?.map(x => x) 
 //console.log(collect)
 
 const values = [];

    if (collect) {
      values.push(...collect);
    }
    //console.log(values)
     
 const akpu = values.reduce((acc, curr) => {
  if (!acc[curr.visit_type]) {
    acc[curr.visit_type] = [];
  }
  acc[curr.visit_type].push({name:curr.name,business_name:curr.business_name});
  return acc;
}, {});
  //console.log(akpu)
  var strong = Object.values(akpu);
  

  //onsite active unique customers visited
  var swallow = strong[0];
  const swallowed = []
  if (swallow) {
    swallowed.push(...swallow)
  }
   
   var egusi = swallowed.reduce((acc, curr) => {
     if (!acc[curr.name]) {
       acc[curr.name] = [];
    }
    acc[curr.name].push(curr.business_name);
     return acc;
   }, {});
     //console.log(egusi)
    // var eg = Object.values(egusi)
    // console.log(eg)
    var soup = [egusi]
    console.log(soup)
   
      const a1 = eggroll.map((obj) => {
        const secondObj = soup.find((item) => [item].forEach(x=>x) === [obj].forEach(x=>x));
        const newObj = { ...secondObj };
        Object.keys(obj).forEach((key) => {
          if (!newObj.hasOwnProperty(key)) {
            newObj[key] = [];
          }
        });
        return newObj;
      });
    
    //console.log(a1);
    var delicacy = a1.reduce(x => x);
    //console.log(delicacy)

    const r1 = compareAndArrangeObjects(result, delicacy);
    //console.log(r1)

    var delicious = Object.values(r1)
    //console.log(delicious)


    
   //offsite active unique customers visited
  var swallow2 = strong[1];
  const swallowed2 = []
  if (swallow2) {
    swallowed2.push(...swallow2)
  }
   
   var egusi2 = swallowed2.reduce((acc, curr) => {
     if (!acc[curr.name]) {
       acc[curr.name] = [];
    }
    acc[curr.name].push(curr.business_name);
     return acc;
   }, {});
     //console.log(egusi2)
    var soup2 = [egusi2]
    console.log(soup2)
   
      const b1 = eggroll.map((obj) => {
        const secondObj = soup2.find((item) => [item].forEach(x=>x) === [obj].forEach(x=>x));
        const newObj = { ...secondObj };
        Object.keys(obj).forEach((key) => {
          if (!newObj.hasOwnProperty(key)) {
            newObj[key] = [];
          }
        });
        return newObj;
      });
    
    //console.log(b1);
    var delicacy2 = b1.reduce(x => x);
    //console.log(delicacy2)

    const s1 = compareAndArrangeObjects(result, delicacy2);
    //console.log(s1)

    var delicious2 = Object.values(s1)
    //console.log(delicious2) 



//Inactive unique customers visited
var sell = garri?.SALES?.map(x => x);
//console.log(sell)
// var order = garri?.ORDER?.map(x=>x)
//console.log(order)
//var detail = garri?.DETAILING?.map(x => x);

const values2 = [];
if (sell) {
  values2.push(...sell);
}
//  if (order) {
//        values2.push(...order);
//      }
   
    // if (detail) {
    //   values2.push(...detail);
    // }

    // if (other) {
    //   values2.push(...other);
    // }
//console.log(values2)

const chicken = values2.reduce((acc, curr) => {
  if (!acc[curr.visit_type]) {
    acc[curr.visit_type] = [];
  }
  acc[curr.visit_type].push({name:curr.name,business_name:curr.business_name});
  return acc;
}, {});
//console.log(chicken)
  var roasted = Object.values(chicken);
  
  //onsite inactive unique customers visited
  var goat = roasted[0];
  const goated = []
  if (goat) {
    goated.push(...goat)
  }
   
  const meat = goated.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = [];
    }
    acc[curr.name].push(curr.business_name);
    return acc;
  }, {});
    //console.log(meat)
    var stew = [meat];
    console.log(stew)
    const a2 = eggroll.map((obj) => {
      const secondObj = stew.find((item) => [item].forEach(x=>x) === [obj].forEach(x=>x));
      const newObj = { ...secondObj };
      Object.keys(obj).forEach((key) => {
        if (!newObj.hasOwnProperty(key)) {
          newObj[key] = [];
        }
      });
      return newObj;
    });
  
  //console.log(a2);
  var knob = a2.reduce(x => x);
  
  const r2 = compareAndArrangeObjects(result, knob);

  var door = Object.values(r2)


//offsite inactive unique customers visited
var goat2 = roasted[1];
const goated2 = []
if (goat2) {
  goated2.push(...goat2)
}

const meat2 = goated2.reduce((acc, curr) => {
  if (!acc[curr.name]) {
    acc[curr.name] = [];
  }
  acc[curr.name].push(curr.business_name);
  return acc;
}, {});
  //console.log(meat2)
  var stew2 = [meat2];
  console.log(stew2)
  const b2 = eggroll.map((obj) => {
    const secondObj = stew2.find((item) => [item].forEach(x=>x) === [obj].forEach(x=>x));
    const newObj = { ...secondObj };
    Object.keys(obj).forEach((key) => {
      if (!newObj.hasOwnProperty(key)) {
        newObj[key] = [];
      }
    });
    return newObj;
  });

//console.log(b2);
var knob2 = b2.reduce(x => x);

const s2 = compareAndArrangeObjects(result, knob2);

var door2 = Object.values(s2)
  



//Unique Customers Visited
var tems = tm.map((object) => JSON.stringify(object))
//console.log(tems)
var uniqueTems = getUniqueObj(tems)
//console.log(uniqueTems)
var unique = Array.from(uniqueTems)
//console.log(unique)
var uniquetm = unique.map((string)=>JSON.parse(string))
 //console.log(uniquetm)

 const ball = uniquetm.reduce((acc, curr) => {
  if (!acc[curr.visit_type]) {
    acc[curr.visit_type] = [];
  }
  acc[curr.visit_type].push({name:curr.name,business_name:curr.business_name});
  return acc;
}, {});
 
 var shoot = Object.values(ball);
  
 //onsite unique customers visited
  var goal = shoot[0]
  const goals = []
  if (goal) {
    goals.push(...goal)
  }
   
  const baller = goals.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = [];
    }
    acc[curr.name].push(curr.business_name);
    return acc;
  }, {});
    var winner = [baller];
    //var win = Object.values(baller);
    //console.log(win)

    const c1 = eggroll.map((obj) => {
      const secondObj = winner.find((item) => [item].forEach(x=>x) === [obj].forEach(x=>x));
      const newObj = { ...secondObj };
      Object.keys(obj).forEach((key) => {
        if (!newObj.hasOwnProperty(key)) {
          newObj[key] = [];
        }
      });
      return newObj;
    });
  
  //console.log(b2);
  var d1 = c1.reduce(x => x);
  
  const e1 = compareAndArrangeObjects(result, d1);
  
  var win = Object.values(e1)



  //offsite unique customers visited
  var goal2 = shoot[1]
  const goals2 = []
  if (goal2) {
    goals2.push(...goal2)
  }
   
  const baller2 = goals2.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = [];
    }
    acc[curr.name].push(curr.business_name);
    return acc;
  }, {});
   //console.log(baller2)
   var winner2 = [baller2];
    //var win2 = Object.values(baller2);
    //console.log(win2)

    const c2 = eggroll.map((obj) => {
      const secondObj = winner2.find((item) => [item].forEach(x=>x) === [obj].forEach(x=>x));
      const newObj = { ...secondObj };
      Object.keys(obj).forEach((key) => {
        if (!newObj.hasOwnProperty(key)) {
          newObj[key] = [];
        }
      });
      return newObj;
    });
  
  var d2 = c2.reduce(x => x);
  
  const e2 = compareAndArrangeObjects(result, d2);
  
  var win2 = Object.values(e2)
     




//Customers Visited
const output = tm.reduce((acc, curr) => {
  if (!acc[curr.visit_type]) {
    acc[curr.visit_type] = [];
  }
  acc[curr.visit_type].push({name:curr.name,business_name:curr.business_name});
  return acc;
}, {});
 //console.log(output);
 var out = Object.values(output)
  //console.log(out)


//onsite customers visited
  var scream = out[0]
  const screams = []
  if (scream) {
    screams.push(...scream)
  }
   

  const shotput = screams.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = [];
    }
    acc[curr.name].push(curr.business_name);
    return acc;
  }, {});
   //console.log(shotput);
   var shooter = [shotput];
    //var shot = Object.values(shotput);
     //console.log(shot)

     const f1 = eggroll.map((obj) => {
      const secondObj = shooter.find((item) => [item].forEach(x=>x) === [obj].forEach(x=>x));
      const newObj = { ...secondObj };
      Object.keys(obj).forEach((key) => {
        if (!newObj.hasOwnProperty(key)) {
          newObj[key] = [];
        }
      });
      return newObj;
    });
  
  var g1 = f1.reduce(x => x);
  
  const h1 = compareAndArrangeObjects(result, g1);
  
  var shot = Object.values(h1)




     //offsite customers visited
    var run = out[1]
    const runs = []
    if (run) {
      runs.push(...run)
    }
   
    const mamaput = runs.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = [];
    }
    acc[curr.name].push(curr.business_name);
    return acc;
  }, {});
   //console.log(mamaput);
   var madam = [mamaput];
    //var mama = Object.values(mamaput)
     //console.log(mama)

     const i1 = eggroll.map((obj) => {
      const secondObj = madam.find((item) => [item].forEach(x=>x) === [obj].forEach(x=>x));
      const newObj = { ...secondObj };
      Object.keys(obj).forEach((key) => {
        if (!newObj.hasOwnProperty(key)) {
          newObj[key] = [];
        }
      });
      return newObj;
    });
  
  var j1 = i1.reduce(x => x);
  
  const k1 = compareAndArrangeObjects(result, j1);
  
  var mama = Object.values(k1)
    



     
     //Frequency of Customers Visited

     //frequency of onsite customers visited
     const duck = shot.map((obj) => {
      const counts = {};
      Object.values(obj).forEach((element) => {
        counts[element] = (counts[element] || 0) + 1;
      });
      return {...counts };
    });
    //console.log(duck);
    const duckling = duck.map((obj) => Object.values(obj));
    //console.log(duckling);
  
    //frequency of offsite customers visited
    const duck2 = mama.map((obj) => {
      const counts2 = {};
      Object.values(obj).forEach((element) => {
        counts2[element] = (counts2[element] || 0) + 1;
      });
      return {...counts2 };
    });
    //console.log(duck2);
    const duckling2 = duck2.map((obj) => Object.values(obj));
    //console.log(duckling2);
  

     
    
     














/**list of options that display and change depending on the team the user selects*/
let options = null;

  if (team) {
    options = team.map((array, index) => <option  value={index}>{array}</option>);
  }
  
    const Table = () => {
      if (tea.length === 0) {
      return (
      <table>
      <thead>
       <tr>
           <th>Customers</th>
           <th>Customers Visited(on-site)</th>
           <th>Unique Customers Visited(on-site)</th>
           <th>Frequency Of Customers Visited(on-site)</th>
           <th>Active Unique Customers Visited(on-site)</th>
           <th>Inactive Unique Customers Visited(on-site)</th>
           <th>Customers Visited(off-site)</th>
           <th>Unique Customers Visited(off-site)</th>
           <th>Frequency Of Customers Visited(off-site)</th>
           <th>Active Unique Customers Visited(off-site)</th>
           <th>Inactive Unique Customers Visited(off-site)</th>
         </tr>
       </thead>
          
          <tbody>          
          <tr>
              <td colSpan="5">Loading, please wait...</td>
          </tr>
        </tbody>
        </table>
        );
      }
      
       return (
       <table>
       <thead>
       <tr>
           <th>Customers</th>
           <th>Customers Visited(on-site)</th>
           <th>Unique Customers Visited(on-site)</th>
           <th>Frequency Of Customers Visited(on-site)</th>
           <th>Active Unique Customers Visited(on-site)</th>
           <th>Inactive Unique Customers Visited(on-site)</th>
           <th>Customers Visited(off-site)</th>
           <th>Unique Customers Visited(off-site)</th>
           <th>Frequency Of Customers Visited(off-site)</th>
           <th>Active Unique Customers Visited(off-site)</th>
           <th>Inactive Unique Customers Visited(off-site)</th>
         </tr>
       </thead>
       <tbody>
       {selectedOptionIndex !== null && (
            <tr>
              <td>{rest[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td>
              <td>{shot[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td>
              <td className='freq'>{win[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td> 
              <td className='freq'>{duckling[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td>  
              <td>{delicious[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td>
              <td>{door[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td>
              <td>{mama[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td>
              <td className='freq'>{win2[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td>
              <td className='freq'>{duckling2[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td>
              <td>{delicious2[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td>
              <td>{door2[selectedOptionIndex].map((item, index)=>(<p key={index}>{item}</p>))}</td>
            </tr>
          )}
       </tbody>
       <tfoot>
       {selectedOptionIndex !== null && (
        <tr>
              <td><b>TOTAL: </b>{rest[selectedOptionIndex].length}</td>
              <td><b>TOTAL: </b>{shot[selectedOptionIndex].length}</td>
              <td><b>TOTAL: </b>{win[selectedOptionIndex].length}</td> 
              <td><b>TOTAL: </b>{duckling[selectedOptionIndex].length}</td>  
              <td><b>TOTAL: </b>{delicious[selectedOptionIndex].length}</td>
              <td><b>TOTAL: </b>{door[selectedOptionIndex].length}</td>
              <td><b>TOTAL: </b>{mama[selectedOptionIndex].length}</td>
              <td><b>TOTAL: </b>{win2[selectedOptionIndex].length}</td>
              <td><b>TOTAL: </b>{duckling2[selectedOptionIndex].length}</td>
              <td><b>TOTAL: </b>{delicious2[selectedOptionIndex].length}</td>
              <td><b>TOTAL: </b>{door2[selectedOptionIndex].length}</td>
        </tr>
        )}
       </tfoot>
     </table>
     )
     }

  return (
    <div
      // style={{
      //   padding: "16px",
      //   margin: "16px",
      // }}
    >
        {/* <div className='box'>  */}
        <h1 className="salesreport">SALES REPORT</h1>
        <div className='inputs'>
        <div className ='dates'>
        <h3 className='text'>Set Date:</h3>
          <div>
           <label>From:</label> 
          <input type="date" className ='date'  onChange={handleDate1Change} />
          <label>to:</label>
          <input type="date" className ='date'  onChange={handleDate2Change} />
          </div>
          <div className='button'>
          {/* <button onClick={setNewDate}>Set Date</button> */}
          </div>
        </div>

        <div className='team'>
          {/** Bind changeSelectOptionHandler to onChange method of select.
           * This method will trigger every time different
           * option is selected.
           */}
           <h3 className='text'>Select Team:</h3>
           <div>
          <select onChange={changeSelectOptionHandler}>
            <option>EAGLE</option>
            <option>BULL</option>
            <option>LION</option>
          </select>
          </div>
        </div>

        <div className='rep'>
          <h3 className='text'>Select Rep:</h3>
          <div>
          <select value={selectedOptionIndex} onChange={handleOptionSelect}>
            {
              /** This is where we have used our options variable */
              options
            }
          </select>
          </div>
        </div>
        </div>
        

        <div className='table'>
          <Table /> 
        </div>
      
    </div>
  );
};
  
export default Sales;