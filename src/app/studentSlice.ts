import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'
import studentService from '../services/student.service';
import IStudent from '../types/student.type';
import { array } from 'prop-types';
import classService from '../services/class.service';
import filterCriteria from '../utils/utils';

// Define a type for the slice state
interface StudentState {
    user: IStudent;
    loading: boolean;
    loggedin: boolean;
    errorMsg: any;
}

// Define the initial state using that type
const initialState: StudentState = {
    user: null!,
    loading: false,
    loggedin: false,
    errorMsg: null!
};


export function fetchStudent(name: string) {
    return studentService.getByName(name);
};

export function fetchClasses(filter: string) {
    return classService.getByFilter(filter);
}

export const loginByName = createAsyncThunk('students/fetch', async (name: string) => {

    try {
        const records: any = await fetchStudent(name);
        if (Array.isArray(records)) {
            if (records[0].fields.Name === name) {
                return records[0];
            }
            return [];
        } else {
            throw 'Error occurred';
        }

    } catch (error) {
        return error;
    }
});
export const getClassesPerUser = createAsyncThunk('classes/fetch', async (filter: string) => {
    try {
        const records: any = await fetchClasses(filter);
        if (Array.isArray(records)) {
            let classes = [];

            for (let record of records) {
                let students = await studentService.getByFilter(filterCriteria(record.fields.Students));
                classes.push({
                    ...mapRecordToClass(record._rawJson),
                    students: students.map((student) => mapRecordToStudent(student._rawJson))
                });
            }
            return classes;
        } else {
            throw 'Error occurred';
        }

    } catch (error) {
        return error;
    }
});

export const studentSlice = createSlice({
    name: 'student',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        logOut: (state) => {
            state.loggedin = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByName.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginByName.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedin = true;
                state.user = mapRecordToStudent(action.payload);
            })
            .addCase(loginByName.rejected, (state, action) => {
                state.loading = false;
                state.loggedin = true;
                state.errorMsg = action.error;
            })
            .addCase(getClassesPerUser.pending, (state) => {
            })
            .addCase(getClassesPerUser.fulfilled, (state, action) => {
                state.user.classes = action.payload as any[];
            })
            .addCase(getClassesPerUser.rejected, (state, action) => {
                state.errorMsg = action.error;
            })
    }
})

export const { logOut } = studentSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.value

export default studentSlice.reducer

function mapRecordToStudent(record: any) {
    return {
        id: record.id,
        name: record.fields.Name,
        classIds: record.fields.Classes
    }
}

function mapRecordToClass(record: any) {
    return {
        id: record.id,
        name: record.fields.Name,
        studentIds: record.fields.Students
    }
}