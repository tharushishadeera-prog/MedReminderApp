import {
    collection,
    getDocs,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";



export const getMedicines = async (uid: string) => {


    const medicineRef = collection(
        db,
        "users",
        uid,
        "medicines"
    );


    const snapshot = await getDocs(
        medicineRef
    );


    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

};
export const updateMedicineTaken = async (
    uid: string,
    medicineId: string
) => {

    try {

        console.log("Updating medicine:", medicineId);


        const medicineRef = doc(
            db,
            "users",
            uid,
            "medicines",
            medicineId
        );


        await updateDoc(
            medicineRef,
            {
                taken: true
            }
        );


        console.log("Medicine updated");



        await addDoc(

            collection(
                db,
                "users",
                uid,
                "medicines",
                medicineId,
                "history"
            ),

            {
                status: "Taken",
                date: serverTimestamp()
            }

        );


        console.log("History created");


    }
    catch (error) {

        console.log("ERROR:", error);

    }

};




// DELETE MEDICINE

export const deleteMedicine = async (

    uid: string,

    medicineId: string

) => {


    const medicineRef = doc(

        db,

        "users",

        uid,

        "medicines",

        medicineId

    );



    await deleteDoc(
        medicineRef
    );


};