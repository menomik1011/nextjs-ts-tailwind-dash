import { IdMessegeData } from "@/types";
import { adminDatabase } from "firebaseAdminInit";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userName } = req.query;
    const data: IdMessegeData[] = [];
    const ref = adminDatabase.ref(`messege/${userName}/`);
    ref.once("value", (snapshot)=>{
        if(!snapshot.exists()){
            return res.status(400).send({ error: "no data" });
        }else{
            snapshot.forEach(childSnapshot=>{
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                childData.id = childKey;
                data.push(childData);
            });
            return res.status(200).send(data);
        }
    })
}