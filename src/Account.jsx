import { useEffect, useState } from "react";

export default function Account({session}) {

  window.onload = () => {
    console.log(session.user);
    setPic(session.user.user_metadata.avatar_url);
    let string = session.user.user_metadata.full_name
    let nn = string.charAt(0).toUpperCase() + string.slice(1);
    setName(nn);
  }

  const [ pic, setPic ] = useState('');
  const [ name, setName ] = useState('');

  return (
    <div className="container">
      <div className="account-container">
        <img src={pic} />
        <h1>{name}</h1>
      </div>
    </div>
  )
}