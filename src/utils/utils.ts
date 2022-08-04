export default function filterCriteria(foreignIds : string[]) {
    const comparisons = foreignIds.map((id) => `RECORD_ID() = '${id}'`);
    let filterByFormula = 'OR(';
    for (const c of comparisons) {
        filterByFormula += `${c.concat(", ")}`
    }
    return `${filterByFormula.slice(0, -2)})`;
}