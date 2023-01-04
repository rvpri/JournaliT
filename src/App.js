import React,{useState , useEffect} from 'react'
import Moment from 'moment';
import './App.css';
import View from './Components/View';

const getDatafromLS=()=>{
    const data = localStorage.getItem('journals');
    if(data){
      return JSON.parse(data);
    }
    else{
      return []
    }
  }
  
export const App = () =>  {

    const [journals, setJournals]=useState(getDatafromLS());
    const [title, setTitle] = useState("");
    const [text, setText]=useState('');

    
    const handleAddJournalSubmit=(e)=>{
  
      const datee = new Date();
      const time = datee.getTime();
      const formatDate = Moment().format('DD-MM-YYYY')
   
      e.preventDefault();
      let journal={
        ID: time,
        title,
        date: formatDate,
        text
      }
  
      setJournals([...journals,journal]);
      setText('');
      setTitle('');
    }
  
    const [id, setId]=useState();
    const [editForm,setEditForm]=useState(false);
  
    const handleEdit=(journal, index)=>{
      console.log("test");
      setEditForm(true);
      setId(index);
      setTitle(journal.title);
      setText(journal.text);
  
    }

    const handleEditSubmit=(e)=>{
      e.preventDefault();
      let items = [...journals];
      let item = items[id];
      item.title = title;
      item.text = text;
      items[id] = item;
      setJournals(items);
      setTitle('');
      setText('');
      setEditForm(false);
    }
    
    const deleteJournal=(ID)=>{
      const filteredJournals=journals.filter((element,index)=>{
        return element.ID !== ID
      })
      
      setJournals(filteredJournals);
      setEditForm(false);
    }
    
    useEffect(()=>{
      localStorage.setItem('journals',JSON.stringify(journals));
    },[journals])
  

  return (
    <div className="myclass">

    <div className= 'display-container'>
      <View  journals={journals}  handleEdit={handleEdit} deleteJournal={deleteJournal} />
    </div>
      
  
    <div class="parent-container">
    <div className='heading'> <h2> Journal IT</h2> </div>
    {editForm===false&&(
      <div class="form-container">
        <form onSubmit={handleAddJournalSubmit}>
        <input type='text' placeholder="Enter the Title" required onChange={(e)=>setTitle(e.target.value)} value={title}/>
        <br></br>
        <textarea className = 'myTextArea' placeholder="Enter the Text of your journal entry here" value={text}  onChange={(e)=>setText(e.target.value)}  />
        <br></br>
        <input type="submit" value="ADD"></input>
        </form>
      </div>
    )}

    {editForm===true&&(
      <div class="form-container">
        <form onSubmit={handleEditSubmit}>
            <input type='text'  required  onChange={(e)=>setTitle(e.target.value)} value={title}/>
            <br></br>
            <textarea  required  onChange={(e)=>setText(e.target.value)} value={text}/>
            <br></br>
            <input type="submit" value="UPDATE" ></input>
          </form>
      </div>
    )}

  </div>
</div>

 )}
export default App;
