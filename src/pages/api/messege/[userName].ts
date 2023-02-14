import { onValue, ref } from "firebase/database";
import { database } from "firebaseConfig";
import { NextApiRequest, NextApiResponse } from "next";

interface MessegeData {
    date: string;
    tag: string;
    title: string;
}
interface IdMessegeData extends MessegeData {
    id: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userName } = req.query;
    const dbRef = ref(database, `messege/${userName}/`);
    onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());

            const data: IdMessegeData[] = [];
            Object.keys(snapshot.val()).map((key: string) => ({
                id: key,
                ...snapshot.val()[key],
            }))
            res.send(data);
        } else {
            res.send({});
        }
    })
}

interface objectData {
    title: string;
    tag: string;
    content: string;
}

interface addIdObjectData extends objectData {
    id: string;
}