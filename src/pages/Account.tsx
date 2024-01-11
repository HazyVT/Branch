import { Box, Heading } from "@chakra-ui/layout";
import User from "../models/User";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Input } from "@chakra-ui/input";
import React, { MutableRefObject, useRef, useState } from "react";
import { selfChannel, supabase } from "../models/Client";

export default function Account(props: {user : User | null}) {

  const user = props.user;
  const  [ image, setImage ] = useState(user?.getData().image);
  const inputref = useRef() as MutableRefObject<HTMLInputElement>;

  const uploadURL = async (path: string) => {
    const { data, error } = await supabase.storage.from('avatars').createSignedUrl(path, 36000000);
    if (error == null) {
      const link = data.signedUrl;
      await supabase.auth.updateUser({
        data: {image: link}
      })
      setImage(link);
      selfChannel.send({
        type: 'broadcast',
        event: 'image',
        payload: {image: link}
      })
    } else {
      console.error(error);
    }
  }

  const changeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const file = event.target.files[0];
      const { data, error } = await supabase.storage.from('avatars').upload('avatars/public/'+user?.getData().id+'.png', file, {upsert: true});
      if (error == null) {
        uploadURL(data.path);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <Box display='flex' flexDir='column' alignItems='center'>
      <Avatar size='lg' bgColor='red.300' src={image} onClick={() => {inputref.current.click()}}>
        <AvatarBadge boxSize='1em' bg='green.500'/>
      </Avatar>
      <Heading marginTop={2}>{user?.getData().name}</Heading>
      <Input ref={inputref} onChange={changeImage} type="file" accept=".jpg" display='none'/>
    </Box>
  )
}