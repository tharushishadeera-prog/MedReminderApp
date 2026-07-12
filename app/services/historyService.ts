import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";





// ===============================
// GET MEDICINE HISTORY
// ===============================

export const getMedicineHistory = async (
    uid: string
) => {


    try {


        const history: any[] = [];



        const medicinesRef =
            collection(
                db,
                "users",
                uid,
                "medicines"
            );



        const medicinesSnapshot =
            await getDocs(medicinesRef);





        for (
            const medicineDoc of medicinesSnapshot.docs
        ) {



            const medicineData =
                medicineDoc.data();




            const historyRef =
                collection(
                    db,
                    "users",
                    uid,
                    "medicines",
                    medicineDoc.id,
                    "history"
                );





            const historySnapshot =
                await getDocs(historyRef);







            historySnapshot.forEach(
                (historyDoc) => {


                    const data =
                        historyDoc.data();





                    history.push({

                        id:
                            historyDoc.id,


                        medicineId:
                            medicineDoc.id,



                        medicineName:
                            medicineData.name,



                        dosage:
                            medicineData.dosage,



                        time:
                            medicineData.time,



                        status:
                            data.status || "Pending",



                        date:
                            data.date ||
                            data.createdAt ||
                            new Date()


                    });



                }

            );



        }




        return history;



    }

    catch (error) {


        console.log(
            "History Fetch Error:",
            error
        );


        return [];


    }


};











// ===============================
// WEEKLY ADHERENCE
// ===============================

export const getWeeklyAdherence = async (
    uid: string
) => {


    const history =
        await getMedicineHistory(uid);





    const days = [

        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"

    ];





    const completed: any = {

        Sun: 0,
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0

    };






    const total: any = {

        Sun: 0,
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0

    };







    history.forEach(
        (item) => {


            let date;



            if (
                item.date?.toDate
            ) {

                date =
                    item.date.toDate();

            }


            else {


                date =
                    new Date(item.date);


            }





            const day =
                days[
                date.getDay()
                ];




            total[day]++;






            if (

                item.status === "Taken"

                ||

                item.status === "Completed"

            ) {

                completed[day]++;

            }



        }

    );







    const values =
        days.map(
            (day) => {


                if (total[day] === 0) {

                    return 0;

                }



                return Math.round(

                    (
                        completed[day]
                        /
                        total[day]

                    )
                    *
                    100

                );


            }

        );






    return {


        labels: days,


        datasets: [

            {

                data: values

            }

        ]


    };


};












// ===============================
// MISSED MEDICINES
// ===============================

export const getMissedMedicines = async (
    uid: string
) => {


    const history =
        await getMedicineHistory(uid);




    return history.filter(

        item =>
            item.status === "Missed"

    );


};











// ===============================
// TODAY MEDICINES
// ===============================

export const getTodayMedicines = async (
    uid: string
) => {


    const history =
        await getMedicineHistory(uid);




    const today =
        new Date();



    return history.filter(
        item => {


            const date =
                item.date?.toDate
                    ?
                    item.date.toDate()
                    :
                    new Date(item.date);




            return (

                date.getDate()
                ===
                today.getDate()

                &&

                date.getMonth()
                ===
                today.getMonth()

                &&

                date.getFullYear()
                ===
                today.getFullYear()

            );


        }

    );



};