import { useEffect, useState } from "react";

function App() {
  const [res, setRes] = useState("");

  useEffect(() => {
    // const get = async () => {
    //   const res = await fetch("http://localhost:8000");
    //   const data = await res.json();
    //   setRes(data);
    // };
    // get();
  }, []);

  return (
    <>
      <div className="text-3xl font-semibold">Welcome to Facebook</div>
      <div className="text-2xl font-semibold">{}</div>
      {/* {users.map((user, index) => (
        <div key={index} className="">
          {user.name}
        </div>
      ))} */}
      <div className=""></div>
    </>
  );
}

export default App;
