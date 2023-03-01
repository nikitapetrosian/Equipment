export function hierarchyBuildingAndRooms(buildingAndRooms) {
    let buildingWithParts = []
    let ids = []
    for (let i = 0; i < buildingAndRooms.length; i++) {
        ids.push(buildingAndRooms[i].id)
    }
    for (let j = 0; j < buildingAndRooms.length; j++) {
        if (buildingAndRooms[j].parts) {
            for (let i = 0; i < ids.length; i++) {
                if (buildingAndRooms[j].parts.includes(ids[i])) {
                    buildingWithParts.push(`${buildingAndRooms[j].id}: ${ids[i]}`)
                }
            }
        }
    }
    let res = {}
    const f = (item) => {
        if (res[item[0]]) {
            res[item[0]] = [res[item[0]], item[1].trim()]
        }
        else { res[item[0]] = item[1].trim() }
    }
    // const arr = ['main: main-left', 'main: main-right', 'main-left: main-101', 'main-left: main-102', 'main-right: main-head', 'production: production-1', 'production: production-2']
    if (buildingWithParts.length) {
        for (let i = 0; i < buildingWithParts.length; i++) {
            f(buildingWithParts[i].split(':'))
        }
    }
    let a = []
    Object.keys(res).forEach(function (key) {
        a.push([key, [this[key]]])
    }, res);
    return a
}