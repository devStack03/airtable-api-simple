import IStudent from "../types/student.type";
import HttpService from "./http-common";
class ClassService {
    
    private tableName = 'Classes'

    getById(id: string) {
        return HttpService(this.tableName).find(id);
    }

    getByFilter(filter: string) {
        return HttpService(this.tableName).select({
            filterByFormula: filter
        }).firstPage();
    }
}

export default new ClassService();