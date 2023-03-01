export function equipments(equipment, nameEquipment) {
    let res = []
    equipment.forEach(element => {
        if (element.placeId === nameEquipment) {
            res.push(element)
        }
    });
    return res
}