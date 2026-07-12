import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";




// Get all medicine history

export const getMedicineHistory = async (
    uid: string
) => {


    let history: any[] = [];



    const medicinesRef =
        collection(
            db,
            "users",
            uid,
            "medicines"
        );



    const medicines =
        await getDocs(medicinesRef);





    for (
        const medicine of medicines.docs
    ) {



        const medicineData =
            medicine.data();




        const historyRef =
            collection(
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


            const data: any =
                item.data();




            history.push({


                id: item.id,


                medicineId:
                    medicine.id,



                medicineName:
                    medicineData.name,



                status:
                    data.status ||
                    (
                        data.taken
                            ?
                            "Taken"
                            :
                            "Missed"
                    ),



                date:
                    data.date ||
                    data.createdAt
                    ||
                    new Date()



            });



        });



    }




    return history;



};









// Calculate weekly adherence

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





    const weekly: any = {

        Sun: 0,
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0

    };





    const totals: any = {


        Sun: 0,
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0

    };







    history.forEach((item) => {



        let date;



        if (
            item.date?.toDate
        ) {

            date =
                item.date.toDate();

        }

        else if (
            item.date
        ) {

            date =
                new Date(item.date);

        }

        else {

            return;

        }






        const day =
            days[
            date.getDay()
            ];




        totals[day]++;




        if (
            item.status === "Taken"
            ||
            item.status === "Completed"
        ) {

            weekly[day]++;

        }





    });







    const chartData = days.map((day) => {



        if (
            totals[day] === 0
        ) {

            return 0;

        }



        return Math.round(

            (
                weekly[day]
                /
                totals[day]
            )
            *
            100

        );



    });







    return {


        labels: [

            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"

        ],


        datasets: [

            {

                data: chartData

            }

        ]


    };



};









// Get missed medicines

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