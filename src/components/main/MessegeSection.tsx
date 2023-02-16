import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { child, get, onValue, ref, set } from "firebase/database";
import { database } from "firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { IdMessegeData } from "@/types";
import axios from "axios";

// function createMsgData(
//   index: number,
//   title: string,
//   tag: string,
//   date: string
// ) {
//   return { index, title, tag, date };
// }

const tagList = ["달리기", "등산", "외식", "수면"];
// const msgList = [
//   createMsgData(1, "등산을 해보세요!", "등산", "2023-01-31"),
//   createMsgData(2, "달리기를 해보세요!", "달리기", "2023-02-01"),
//   createMsgData(3, "외식을 해보세요!", "외식", "2023-02-02"),
//   createMsgData(4, "수면을 해보세요!", "수면", "2023-02-03"),
// ];

interface propTypes {
  userName?: string;
  data: IdMessegeData[];
}

export default function MessegeSection({ userName, data }: propTypes) {
  const [msgTitle, setMsgTitle] = useState("");
  const [selectTag, setSelectTag] = useState("");
  const [msgLists, setMsgLists] = useState(data);

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setMsg(formData);
    // setMsgLists([
    //   ...msgLists,
    //   // createMsgData(msgLists.length + 1, msgTitle, selectTag, "2023-02-08"),
    // ]);

    // firebase database 쓰기
    // set(ref(database, `messege/${userName}/` + uuidv4()), {
    //   title: msgTitle,
    //   tag: selectTag,
    //   date: "2023-02-14",
    // });
    // await get(child(ref(database),`messege/${userName}/`))
    // .then(snapshot=>{
    //     if(snapshot.exists()){
    //       const data: IdMessegeData[] = [];
    //         // console.log(snapshot.val());
    //         snapshot.forEach(childSnapshot=>{
    //             const childKey = childSnapshot.key;
    //             const childData = childSnapshot.val();
    //             childData.id = childKey;
    //             data.push(childData);
    //         });

    //     }else{
    //         console.error("No data available");
    //     }
    // })

    axios.post(`http://localhost:3000/api/messege/${userName}/`, {
      title: msgTitle,
      tag: selectTag,
      date: "2023-02-14",
    }).then(res=>{
      console.log(res.data);
      
      setMsgLists(res.data)
    });

    setMsgTitle("");
    setSelectTag("");
  };
  const onSelectedRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectTag(e.target.value);
  };

  return (
    <div className="py-2 px-2 flex border-solid border-0 border-x-[1px] border-slate-300">
      <form
        className="px-6 mr-8 flex-col grow bg-white border-solid border-0 border-r-[1px] border-slate-300"
        onSubmit={onSubmitForm}
      >
        <h4 className="py-2 text-md mb-4 text-slate-600">메세지 보내기</h4>
        <div className="flex items-center mb-4">
          <label htmlFor="title" className="mr-2">
            제목 :{" "}
          </label>
          <input
            className="px-1 bg-transparent border-solid border-0 border-b-[1px] text-[1rem] outline-none grow"
            id="title"
            type="text"
            placeholder="제목을 입력해주세요..."
            value={msgTitle}
            onChange={(e) => setMsgTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-2">태그 선택 : </label>
          {tagList.map((tag) => (
            <div key={tag} className="mr-2">
              <label>
                <input
                  type="radio"
                  value={tag}
                  checked={tag === selectTag}
                  onChange={onSelectedRadio}
                />
                {tag}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end border-solid border-0 border-t-[1px] border-slate-500 pt-4 px-2">
          <button className="bg-transparent border-0 font-bold cursor-pointer">
            보내기
          </button>
        </div>
      </form>
      <div className="border-solid border-0 border-l-[1px] border-slate-300">
        <h4 className="pl-2 py-2 text-slate-600">보낸 메세지 목록</h4>
        <TableContainer
          component={Paper}
          style={{
            boxShadow: "none",
            borderRadius: 0,
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
          }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell align="left">제목</TableCell>
                <TableCell align="right">태그</TableCell>
                <TableCell align="right">날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {msgLists &&
                msgLists.map((msg, index) => (
                  <TableRow
                    key={msg.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{msg.title}</TableCell>
                    <TableCell align="right">{msg.tag}</TableCell>
                    <TableCell align="right">{msg.date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
