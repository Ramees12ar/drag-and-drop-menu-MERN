import React,{ useState, useEffect } from 'react';
import Axios from 'axios';
import './style.css';
function HomePage(){
    const [showTextE, setShowTextE] = useState(false);
    const [showTextG, setShowTextG] = useState(false);
    const [subItemE, setSubItemE] = useState([]);
    const [subItemG, setSubItemG] = useState([]);
    const [itemDataE,setitemDataE] = useState([]);
    const [itemDataG,setitemDataG] = useState([]);
    useEffect(() => {
        // collect electronics sub datas
        Axios.get(('http://localhost:3006/readElectronics'),{
            params:{
            "id" : 1
            }
        }).then((response)=>{
            console.log(response.data);
            setSubItemE(response.data)
          })
        // collect Grocery sub datas
        Axios.get(('http://localhost:3006/readGrocery'),{
            params:{
            "id" : 2
            }
        }).then((response)=>{
            console.log(response.data);
            setSubItemG(response.data)
          })
    }, [])
    // fetch data for electronics
    var itemFetchE =(sid)=>{
            Axios.get(('http://localhost:3006/itemsElectronics'),{
            params:{
            "id" : sid
            }
        }).then((response)=>{
            console.log(response.data);
            setitemDataE(response.data);
          })
    }
    // fetch data for Grocery
    var itemFetchG =(sid)=>{
            Axios.get(('http://localhost:3006/itemsGrocery'),{
            params:{
            "id" : sid
            }
        }).then((response)=>{
            console.log(response.data);
            setitemDataG(response.data);
        })
    }
    const [dragItem,setdragItem] = useState();
    function dragStartHandler(e, pid){
        console.log("drag started",pid);
        setdragItem(pid);
    }
    function dragEndHandler(e){
        console.log("drag end");
    }
    function dragOverHandler(e){
        e.preventDefault();
        console.log("over");
    }
    // update dragged data
    function dropHandler(e, id){
        e.preventDefault();
        console.log(id,dragItem);
        Axios.put(`http://localhost:3006/update/${dragItem}`,{
            id:id})
    }
    return(
    <div className="container">
        <div class="dropdown">
            <button class="btn btn-primary main-btn" type="button" 
                onClick={() => setShowTextE(!showTextE)}>Electronics
                <span class="caret"></span></button>
                {showTextE &&
                    <ul id="subMenu" class=" sub-ul">
                    { subItemE.map((item)=>{
                        return(
                        <div>
                            <div 
                                onDragLeave={(e) => dragEndHandler(e)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dropHandler(e,item.pid)}>
                            <button className="btn btn-success sub-btn" type="button"
                                onClick={() => {itemFetchE(item.pid)}}>{item.Name}<span class="caret"></span></button>
                            </div>
                                <div>
                                    {itemDataE.map((items,index)=>{
                                        if(items.id===item.pid){
                                            return(
                                                <div 
                                                    onDragStart={(e) => dragStartHandler(e, items.Iid) }
                                                    draggable={true}>
                                                <li id={items.id}>
                                                    <button className="btn btn-danger item-btn">{items.item}</button>
                                                </li>
                                                </div>
                                                )
                                            }
                                        }
                                    )}
                                </div>
                        </div>
                        )})}
                    </ul>}
        </div>
        <div class="dropdown">
            <button class="btn btn-primary main-btn" type="button" 
                onClick={() => setShowTextG(!showTextG)}>Grocery
                <span class="caret"></span></button>
                {showTextG && 
                    <ul id="subMenu" class=" sub-ul">
                    { subItemG.map((item)=>{
                        return(
                        <div>
                            <div 
                                onDragLeave={(e) => dragEndHandler(e)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dropHandler(e,item.pid)}>
                            <button className="btn btn-success sub-btn" type="button"
                                onClick={() => {itemFetchG(item.pid)}}>{item.Name}<span class="caret"></span></button>
                            </div>
                                <div>
                                    {itemDataG.map((items,index)=>{
                                        if(items.id===item.pid){
                                            return(
                                                <div  
                                                    onDragStart={(e) => dragStartHandler(e, items.Iid) }
                                                    draggable={true}>
                                                    <li id={items.id}>
                                                        <button className="btn btn-danger item-btn">{items.item}</button>
                                                    </li>
                                                </div>
                                                )
                                            }
                                        }
                                    )}
                                </div>
                        </div>
                        )})}
                    </ul>}
        </div>
    </div>
    )
}
export default HomePage;