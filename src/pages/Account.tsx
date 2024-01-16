import { Box, Heading } from "@chakra-ui/layout";
import User from "../models/User";
import { Avatar } from "@chakra-ui/avatar";
import { Input } from "@chakra-ui/input";
import React, { MutableRefObject, useRef, useState } from "react";
import { selfChannel, supabase } from "../models/Client";
import { useToast } from "@chakra-ui/toast";

export default function Account(props: {user : User | null}) {

  const user = props.user;
  const toast = useToast();
  const [ image, setImage ] = useState(user?.getData().image);
  const [ banner, setBanner ] = useState(props.user?.getData().banner);
  const headingref = useRef() as MutableRefObject<HTMLInputElement>;
  const inputref = useRef() as MutableRefObject<HTMLInputElement>;
  const bannerref = useRef() as MutableRefObject<HTMLInputElement>;

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
    if (event.target.files != null && event.target.files.length > 0) {
      const file = event.target.files[0];
      const { data, error } = await supabase.storage.from('avatars').upload('avatars/public/'+user?.getData().id+'.png', file, {upsert: true});
      if (error == null) {
        uploadURL(data.path);
      } else {
        console.error(error);
      }
    }
  }

  const changeName = async () => {
    const text = headingref.current.innerText;
    const { error } = await supabase.auth.updateUser({
      data: {username: text}
    })
    if (error == null) {
      toast({
        title: "Username Updated",
        description: "Your username has been updated.",
        status: "success"
      })
    } else {
      console.error(error)
    }
  }

  const uploadBanner = async (path: string) => {
    const { data, error } = await supabase.storage.from('banners').createSignedUrl(path, 36000000);
    if (error == null) {
      const link = data.signedUrl;
      await supabase.auth.updateUser({
        data: {banner: link}
      });
      setBanner(link);
    } else {
      console.error
    }
  }

  const changeBanner = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null && event.target.files.length > 0) {
      const file = event.target.files[0];
      const { data, error } = await supabase.storage.from('banners').upload('public/'+user?.getData().id+'.png', file, {upsert: true});
      if (error == null) {
        uploadBanner(data.path)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <Box display='flex' flexDir='column' alignItems='center' paddingTop={10}>
      <Box pos='fixed' zIndex={1} bgColor={banner ? '' : 'red.300'} w='100vw' backgroundImage={banner ? banner : ''} backgroundSize={'contain'} h='22vh' top={0} onClick={() => {bannerref.current.click()}} />
      <Avatar size='xl' bgColor='red.300' src={image} onClick={() => {inputref.current.click()}} zIndex={2} outline='6px solid white' borderRadius={0}/>
      <Heading ref={headingref} fontWeight={300} size='2xl' zIndex={2} contentEditable suppressContentEditableWarning outline='none' marginTop={4} onBlur={changeName}>{user?.getData().name}</Heading>
      <Input ref={inputref} onChange={changeImage} type="file" accept=".jpg" display='none'/>
      <Input ref={bannerref} onChange={changeBanner} type='file' accept=".jpg" display={"none"} />
    </Box>
  )
}