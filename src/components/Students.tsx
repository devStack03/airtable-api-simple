import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import classService from '../services/class.service';
import studentService from '../services/student.service';
import filterCriteria from '../utils/utils';
import { getClassesPerUser } from '../app/studentSlice';
import Student from './Student';
const Students = () => {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getClassesPerUser(filterCriteria(user.classIds)))
    }, [])
    return (
        <div>
            {user.classes?.map((_class: any, index) => (
                <Student userClass={_class} key={index}/>
            ))}
        </div>
    )
}

export default Students;