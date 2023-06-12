'./SearchBar.css'

export default function SearchBar(props){
   
    return(
        <div className="searchbar">
            <form >
             <input className="searchbar" type="text" placeholder="Search Here" onChange={props.handleChange} value={props.searchStr}/>
            </form>
         </div>
     )
 }