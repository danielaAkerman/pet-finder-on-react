// import { useRecoilState } from "recoil";
// import { userDataAtom } from "../atoms";

// const url = "https://lostpets.onrender.com";

// const userToken = localStorage.getItem("token");

// export function init() {
//   const [userDataState, setUserDataState] = useRecoilState(userDataAtom);
//   fetch(url + "/init/" + userToken, {})
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       const { id, email, fullname } = data;

//       const userData: any = {};

//       userData.userId = id;
//       userData.email = email;
//       userData.fullname = fullname;
//       userData.token = userToken;
//       setUserDataState(userData);
//     });
// }
