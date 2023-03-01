import { FirebaseApp, initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, Firestore, doc, deleteDoc, addDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from '../config';
import "firebase/firestore";
class DatabaseService {
    app: FirebaseApp
    db: Firestore
    constructor() {
        try {
            this.app = initializeApp(firebaseConfig)
            this.db = getFirestore(this.app)
            console.log('Инициализированно');
        } catch (err) {
            console.log(err);
            console.error('Application works without database!!');
        }
    }
    async getBuildingAndRooms() {
        const citiesCol = collection(this.db, 'places');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data().name,
                parts: doc.data().parts && doc.data().parts.map((part: any) => part.id)
            }
        })
        return cityList;
    }

    async getEquipment() {
        const equipment = collection(this.db, 'inventory');
        const equipmentSnapshot = await getDocs(equipment);
        const equipmentList = equipmentSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data().name,
                count: doc.data().count,
                placeId: function () {
                    if (typeof doc.data().place === 'string') {
                        return doc.data().place
                    }
                    else {
                        return doc.data().place !== undefined ? doc.data().place.id : ''
                    }
                }()
            }
        })
        return equipmentList;
    }
    async addEquipment(data: object) {
        await addDoc(collection(this.db, "inventory"), { data }

            // {
            //     name: "Los Angeles",
            //     count: "123",
            //     place: "main-102"
            //     
            // }
        );
    }
    async removeEquipment(id: string) {
        await deleteDoc(doc(this.db, "inventory", id));
    }
}
const db = new DatabaseService();
export default db;