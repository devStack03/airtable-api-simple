import React from 'react';
import IClass from '../types/class.type';

const Student = (props: any) => {
    const userClass = props.userClass as IClass;
    return (
        <div className="class-container">
            <h4>Name</h4>
            <p>{userClass.name}</p>
            <h4>Students</h4>
            {userClass.students?.map((student: any, index) => (
                <span className="badge badge-success" key={index}>{student.name}</span>
            ))}
            {/* <h4>{JSON.stringify(userClass.students)}</h4> */}
        </div>
    )
}

export default Student;