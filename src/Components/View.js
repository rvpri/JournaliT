import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

const View = (props)=>(
    <div className="Container">
      <div className='DisplayHeading'><h2>Journal Entries</h2><br></br></div>
        {props.journals.length>0&&<>
        {props.journals.map((individualJournal,index )=>(
           <p key={individualJournal.ID} class="displayItems">
             <div className="Journal-title"  >
               <strong> <p className="under" onClick={()=>props.handleEdit(individualJournal,index)}>{individualJournal.title}</p></strong>
               <small><p>Created: {individualJournal.date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Icon onClick={()=>props.deleteJournal(individualJournal.ID)} icon={trash}/> </p></small>
             </div> </p>
           ))}
        </>}
        {props.journals.length < 1 && <div>  No journals are added yet</div>}
     </div>
);

export default View;
