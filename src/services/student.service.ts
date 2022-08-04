import IStudent from "../types/student.type";
import HttpService from "./http-common";
class StudentService {
    
    private tableName = 'Students'

    getByName(name: string) {
        return HttpService(this.tableName).select({
            view: 'Grid view',
            filterByFormula: `{Name}='${name}'`
        }).firstPage();
    }

    getByFilter(filter: string) {
        return HttpService(this.tableName).select({
            view: 'Grid view',
            filterByFormula: filter
        }).firstPage();
    }
}

export default new StudentService();