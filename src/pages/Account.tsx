import { Avatar, Box, Heading, Icon, Input, Spinner, Text } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import User from "../models/User";
import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import { channel, supabase } from "../models/Client";
import { BeatLoader } from "react-spinners";

export default function Account(props: {user: User | null}) {

  const user = props.user;
  const created_at: string = user ? user.getCreated() : '';
  
  // Refrences
  const imgref = useRef() as MutableRefObject<HTMLInputElement>;

  // States
  const [ showAvatarEdit, setShowAvatarEdit ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ image, setImage ] = useState(user?.getData().image);

  const deleteOldPhoto = async () => {
    const {error} = await supabase.storage.from('avatars').remove(['avatars/public/'+user?.getData().id+'.png']);
  }

  const setNewImage = async (event: ChangeEvent<HTMLInputElement>) => {
    // Change image
    const file = event.target.files;
    if (file != null && file.length > 0) {
      // get signed link
      setLoading(true);
      deleteOldPhoto()
      const img = file[0];
      const { data, error } = await supabase.storage.from('avatars').upload('avatars/public/'+user?.getData().id+'.png', img, {
        cacheControl: '3600',
        upsert: true
      });
      if (error == null) {
        const path = data?.path;
        if (path != undefined) {
          const { data } = await supabase.storage.from('avatars').createSignedUrl(path, 100000000);
          const url = data?.signedUrl;
          if (url != undefined) {
            await supabase.auth.updateUser({
              data: {
                image: url
              }
            });
            setImage(url);
            user?.setImage(url);
            channel.send({
              type: 'broadcast',
              event: 'image',
              payload: { image: url}
            })
            setLoading(false);
          }
        }
      } else {
        console.error(error);
      }
      
    }
  }
  
  return (
    <Box display='flex' flexDir='column' alignItems='center'>
      <Box bgColor='red.300' w='100vw' h='30vh' display='flex' justifyContent='center' pos='relative'>
        <Icon display={loading ? 'none' : 'block'} as={FaCamera} pos='absolute' top='27vh' color='white' zIndex={3} w={12} h={12} 
          opacity={showAvatarEdit ? '30%' : '0'} 
          onMouseEnter={() => {setShowAvatarEdit(true)}} 
          onMouseLeave={() => {setShowAvatarEdit(false)}} 
          cursor={"pointer"} 
          onClick={() => {imgref.current.click()}}
        />
        <Box display={loading ? 'block' : 'none'} pos='absolute' top='30vh' zIndex={3}> 
          <BeatLoader size={8} />
        </Box>
        <Avatar pos='absolute' src={image} size='xl' top='25vh' outline='8px solid white' bgColor='red.300' zIndex={2}/>
        <Input ref={imgref} type='file' display='none' accept=".jpg" onChange={setNewImage}/>
      </Box>
      <Heading marginTop={16}>{user?.getData().name}</Heading>
      <Text>Created at: {new Date(created_at).toLocaleString('en', {dateStyle: 'medium'})}</Text>
    </Box>
  )
}