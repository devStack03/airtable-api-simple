import { FieldSet, Record } from 'airtable';
import React, { useState } from 'react';
import './App.scss';
import studentService from './services/student.service';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loginByName, logOut } from './app/studentSlice';
import Students from './components/Students';


const App = () => {

   const [name, setName] = useState('');
   const data = useAppSelector(state => state);
   const dispatch = useAppDispatch();
   // handle form submit
   const handleSubmit = (e: any) => {
      e.preventDefault();
      if (name.length > 0) {
         setName('');
         dispatch(loginByName(name));
      }
   }

   const handleChange = (event: any) => {
      setName(event.target.value);
   };

   return (
      <div>
         <div className="outer">
            <div className="fixed">      
               {data.loggedin ? <button onClick={() => dispatch(logOut())}>Logout</button> : null}
            </div>
            <div className="middle">
               <div className="inner">

                  {data.loading ?
                     (
                        <p>Loading...</p>
                     ) : (
                        <>
                           {data.loggedin ?
                              (
                                 <Students />
                              ) : (
                                 <form onSubmit={handleSubmit}>
                                    <label htmlFor="student-name">
                                       Student name:
                                    </label>
                                    <input
                                       id="student-name"
                                       name="name"
                                       type="text"
                                       value={name}
                                       onChange={handleChange}
                                    />
                                    <button type="submit">Login</button>
                                 </form>
                              )
                           }
                        </>
                     )
                  }
               </div>
               <p>{data.errorMsg}</p>
            </div>
         </div>
      </div>
   );
}

export default App;

