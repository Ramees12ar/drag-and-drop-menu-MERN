import React, { useState } from 'react';
import Axios from 'axios';
function AddItems(){
    const [subItem, setItem] = useState('');
    var addElectronics= () =>{
        Axios.post('http://localhost:3003/insert',{item:subItem,id:1})
        console.log(subItem);
        setItem('');
        window.location.reload();
    }
    var addGrocery= () =>{
        Axios.post('http://localhost:3003/insert',{item:subItem,id:2})
        console.log(subItem);
        setItem('');
        window.location.reload();
    }
    return(
        <div>
        <button type="button" class="btn btn-info btn-lg main" data-toggle="modal" data-target="#myEle">Electronics</button>
        <button type="button" class="btn btn-info btn-lg main" data-toggle="modal" data-target="#myGro">Grocery</button>
        <div class="modal fade" id="myEle" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Electronics</h4>
              </div>
              <div class="modal-body">
                <label>Item sub-item :-</label><input type="text" placeholder="item name" 
                          onChange={(e)=>{setItem(e.target.value)}} />
                <button onClick={()=>{addElectronics()}}>ADD</button>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
            
          </div>
        </div>
        <div class="modal fade" id="myGro" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Groceries</h4>
              </div>
              <div class="modal-body">
                <label>Item sub-item :-</label><input type="text" placeholder="item name" 
                          onChange={(e)=>{setItem(e.target.value)}} />
                <button onClick={()=>{addGrocery()}}>ADD</button>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
            
          </div>
        </div>
        </div>
    )
}

export default AddItems;