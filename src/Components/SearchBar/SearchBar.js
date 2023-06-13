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

 // Define the SearchBar component as the default export
// export default function SearchBar(props):
// Render the search bar component
// render:
//   - SearchBar
//     - Apply searchbar CSS styles
//     - Render a form
//       - Within the form, render an input field of type text
//         - Apply searchbar CSS styles to the input field
//         - Set the placeholder text to "Search Here"
//         - Set the onChange event handler to props.handleChange
//         - Set the value of the input field to props.searchStr
