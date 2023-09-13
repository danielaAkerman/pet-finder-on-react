// import { useState } from "react"
// import { useRecoilState } from "recoil";
// import { userDataAtom } from "../atoms";

// const url = "https://lostpets.onrender.com";

// export function useLogin(loginValues) {

//   const [loggedIn, setLoggedIn] = useState(false)
//   const [userDataState, setUserDataState] = useRecoilState(userDataAtom);
//   const { email, password } = loginValues


//   function loginToAPI() {
//     // LLAMAR A LA API
//     // setLoggedIn(res)

//     if (email && password) {
//       fetch(url + "/login", {
//         method: "post",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(loginValues),
//       })
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         if (data.message) {
//           console.log("ERROR", data);


//         } else if (data) {
//           console.log("Se hizo log-in:", data);


//           const userData: any = {};
//           userData.userId = data.user.id;
//           userData.fullname = data.user.fullname;
//           userData.token = data.token;
//           userData.email = loginValues.email;

//           localStorage.setItem("token", data.token.toString());
//           console.log("se guarda token", data.token);

//           setUserDataState(userData);
//           setLoggedIn(true)

//           // if (hayUbicacion) {
//           //   console.log("ya hay ubicacion, se redirecciona a pets");
//           //   navigate("/pets", { replace: true });
//           // } else {
//           //   console.log("NO hay ubicacion, se redirecciona a /");
//           //   navigate("/", { replace: true });
//           // }
//         }
//       });
//     }


//   }


//   return {
//     loggedIn,
//     login: loginToAPI
//   }
// }