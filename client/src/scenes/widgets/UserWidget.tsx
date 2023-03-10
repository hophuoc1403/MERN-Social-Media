import { useEffect, useState } from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../service/user.service";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccounts,
  ManageAccountsOutlined,
  WorkOutline,
} from "@mui/icons-material";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "index";
import useAppStore from "hooks/stateApp";
import { setUSer } from "state";

interface UserWidgetProps {
  userId: string;
  picturePath: string;
}

const UserWidget = ({ userId, picturePath }: UserWidgetProps) => {
  const rootUser = useAppSelector((state) => state.user);
  const { palette } = useTheme();
  const [user, setUser] = useState<IUser>(rootUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  // @ts-ignore
  const dark = palette.neutral.dark;
  // @ts-ignore
  const medium = palette.neutral.medium;
  // @ts-ignore
  const main = palette.neutral.main;
  const {setIsAppLoading} = useAppStore()
  const {userId:id} = useParams()

  const userId1 = localStorage.getItem('userId')
  useEffect(() => {
    console.log(id);
    
    const handleGetUser = async () => {
      const res = await getUser(id ?? userId1);
      console.log(res);
      
      dispatch(setUSer({ user: res.data }));
      setUser(res.data as IUser)
    };
    handleGetUser();
  }, [id]);



  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    friends,
    location,
    occupation,
    impressions,
    viewedProfile,
  } = user;

  return (
    <WidgetWrapper>
      {/*first row */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        gap={"0.5rem"}
        pb={"1.1rem"}
        onClick={async() => {
          await setIsAppLoading()
          navigate(`/profile/${userId}`)}}
      >
        <FlexBetween gap={"0.5rem"}>
          <UserImage image={picturePath} size={40} />
          <Box>
            <Typography
              variant={"h4"}
              color={dark}
              fontWeight={500}
              sx={{
                "&:hover": { color: palette.primary.light, cursor: "pointer" },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </Box>

      <Divider />

      {/*second row*/}
      <Box
        p={"1rem 0"}
        display={"flex"}
        flexDirection="column"
        // alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          display={"flex"}
          // justifyContent="space-between"
          alignItems={"center"}
          gap={"1rem"}
          mb={"0.5rem"}
        >
          <LocationOnOutlined fontSize={"large"} sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          // justifyContent={"center"}
          gap={"1rem"}
        >
          <WorkOutline fontSize={"large"} sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />

      {/*third row*/}
      <Box p={"1rem 0"}>
        <Box display={"flex"} justifyContent={"space-between"} mb={"0.5rem"}>
          <Typography color={medium}>Who viewed your profile ?</Typography>
          <Typography color={medium} fontWeight={500}>
            {viewedProfile}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={medium} fontWeight={500}>
            {impressions}
          </Typography>
        </Box>
      </Box>
      <Divider />

      {/*fourth row*/}
      <Box p={"1rem 0"}>
        <Typography fontSize={"1rem"} color={main} fontWeight={500} mb={"1rem"}>
          Social Profiles
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={"1rem"}
          mb={"0.5rem"}
        >
          <FlexBetween gap={"1rem"}>
            <img src={"../assets/twitter.png"} alt={"twitter"} />
            <Box>
              <Typography color={main} fontWeight={"500"}>
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={"1rem"}
          mb={"0.5rem"}
        >
          <FlexBetween gap={"1rem"}>
            <img src={"../assets/linkedIn.png"} alt={"twitter"} />
            <Box>
              <Typography color={main} fontWeight={"500"}>
                linkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
