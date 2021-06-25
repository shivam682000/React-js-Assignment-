
import './App.css';
import * as React from 'react'
import {
  Button,
  Input,
  Footer,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText,
  input,
 

} from "mdbreact";




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: 'dogs',
      imageList: [],
      pageNumber:1,
      searcheditem:[],
      isshow:false
    }
    this.onchange = this.onchange.bind(this)
    this.addsearchitem = this.addsearchitem.bind(this)
  }

  componentDidMount() {
    
    this.ApiCall()
    

  }
  ApiCall() {
    const url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=847b43221e688059973358acc1294ba5&per_page=1500" + "&tags=" + this.state.searchText
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState(
          { imageList: json.photos.photo })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getImageUrl(farm, server, id, secret) {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  }
  onchange(e) {
    
    this.setState({searchText: e.target.value })
    this.ApiCall()
    
  }
  
addsearchitem(){
  this.ApiCall()
   let arr2=this.state.searcheditem;
   
   arr2.push(this.state.searchText)
  this.setState({searcheditem:arr2})
 
}
handleclear=()=>{
  console.log('hello')
  
  
  this.state.searcheditem=[]
  console.log(this.state.searcheditem)
}
onfocus=()=>{
  this.setState({isshow:true})

}
onblur=()=>{
  this.setState({isshow:false})
}
  
  
  render() {


    return (
      <div className='container'  style={{display:'flex',flexDirection:'column'}}>

        <header className='header' style={styles.headerstyle}>


          <h1 style={{ color: 'white' }}>
            Search Photos
                </h1>
          <div>
          <input
            
            placeholder={"search Images"}
            style={styles.inputstyle}
            onChange={this.onchange}
           onFocus={this.onfocus}
            value={this.state.searchText}
            onBlur={this.onblur}
            



          />
          <button onClick={this.addsearchitem}>
              Press for Search
            </button>
            </div>
            
          
        </header>
        <header style={{justifyContent:'center',alignItems:'center',display:'flex',}}>
          {!this.state.isshow?'':
          <div style={{borderWidth:1,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',backgroundColor:'lightgray',width:'30%',}}> 
          
            {this.state.searcheditem.map(item=>{
              return(
                <h4>
                  {item}
                </h4>
              )
            })}
            <button  onClick={this.handleclear()}>
            clear All
          </button>
            </div>}
            {/* {this.state.searcheditem.length!==0 && this.state.isshow?<button type={'text'} onClick={this.handleclear()}>
            clear All
          </button>:''
          } */}
          </header>

       <div style={{height:'60%',width:'100%'}}>

          {this.state.imageList.map(item => {
            const url = this.getImageUrl(item.farm, item.server, item.id, item.secret)
            return (
              <img
                src={url}
                style={styles.imagestyle}

              />
            )
          })}
          

        </div>
      </div>
    )
  }
}

export default App;
const styles = {
  headerstyle:{
  display: 'flex',
  height: 150,
  width: '100%',
  backgroundColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  position: 'sticky',
  top: -1,
  transition: 0.2,
  marginBottom: 20
},
inputstyle:{
  padding:10,
  width:'90%',
  borderWidth:1

},
imagestyle:{
   height: 300, 
   width: 300, 
   marginLeft: 120, 
   marginTop: 40
   }
}



