import { IdMessegeData } from "@/types";
import { child, get, ref, set } from "firebase/database";
import { database } from "firebaseConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userName } = req.query;
    const copyData: IdMessegeData[] = [];
    const clientRef = ref(database, `messege/${userName}/`);
    if (req.method === "GET") {
        // 데이터 한번 읽기
        get(child(ref(database), `messege/${userName}/`))
            .then(snapshot => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    snapshot.forEach(childSnapshot => {
                        const childKey = childSnapshot.key;
                        const childData = childSnapshot.val();
                        childData.id = childKey;
                        copyData.push(childData);
                    });
                    return res.status(200).send(copyData);

                } else {
                    console.error("No data available");
                }
            })
    } else if (req.method === "POST") {
        const data = req.body;
        set(ref(database, `messege/${userName}/` + uuidv4()), data);
        await get(child(ref(database), `messege/${userName}/`))
            .then(snapshot => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    snapshot.forEach(childSnapshot => {
                        const childKey = childSnapshot.key;
                        const childData = childSnapshot.val();
                        childData.id = childKey;
                        copyData.push(childData);
                    });
                    return res.status(200).send(copyData);

                } else {
                    console.error("No data available");
                }
            })

    }
}
