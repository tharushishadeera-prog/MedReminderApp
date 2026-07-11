import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";


export const getMedicineHistory = async (
    uid: string
) => {


    let history: any[] = [];


    const medicinesRef = collection(
        db,
        "users",
        uid,
        "medicines"
    );


    const medicines =
        await getDocs(medicinesRef);



    for (const medicine of medicines.docs) {


        const historyRef = collection(
            db,
            "users",
            uid,
            "medicines",
            medicine.id,
            "history"
        );


        const historySnap =
            await getDocs(historyRef);



        historySnap.forEach((item) => {


            history.push({

                id: item.id,

                medicineName:
                    medicine.data().name,

                ...item.data()

            });


        });


    }


    return history;


};