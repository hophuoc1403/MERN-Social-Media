import { Divider, Menu, Typography } from "@mui/material";
import { Box } from "@mui/system";
import UserImage from "components/UserImage";
import { useAppSelector } from "index";
import { useRef } from "react";
import { makeStyles, withStyles } from "tss-react/mui";
import { useHover } from "usehooks-ts";

interface ChatBoxProps {
  onClose: () => void;
  id: string;
  chatRef: HTMLElement | null;
}

const ChatBox = ({ id, onClose, chatRef }: ChatBoxProps) => {
  const { classes } = useStyle();
  return (
    <Menu
      sx={{
        borderRadius: "100px !important",
        ".css-6hp17o-MuiList-root-MuiMenu-list": {
          borderRadius: "100px !important",
        },
      }}
      open={!!chatRef}
      onClose={onClose}
      id="chat-box"
      MenuListProps={{
        "aria-labelledby": "basic-button2",
      }}
      anchorEl={chatRef}
      className={classes.chatBox}
    >
      <Box className={""}>
        <ChatBoxEl />
        <ChatBoxEl />
        <ChatBoxEl />
      </Box>
    </Menu>
  );
};

const ChatBoxEl = () => {
  const chatElRef = useRef<HTMLDivElement | null>(null);
  const isHoverChat = useHover(chatElRef);
  const { user } = useAppSelector((state) => state);
  const { classes } = useStyleEl({ chatBoxHover: isHoverChat });
  return (
    <>
      <Box
        ref={chatElRef}
        className={`flex gap-2 px-2 py-3 min-w-[150px] ${classes.chatBoxEl}`}
      >
        <UserImage image={user.picturePath} size={35} />
        <Box>
          <Typography variant="h6">{user.firstName}</Typography>
          <Typography variant="body2">{user.firstName}</Typography>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default ChatBox;

const useStyle = makeStyles()((theme) => ({
  chatBox: {
    "& .css-6hp17o-MuiList-root-MuiMenu-list": {
      background: theme.palette.background.default,
      borderRadius: "5px !important",
    },
  },
}));

const useStyleEl = makeStyles<{ chatBoxHover: boolean }>()(
  (theme, { chatBoxHover }) => ({
    chatBoxEl: {
      backgroundColor: chatBoxHover ? "#EEEEEE" : "inherit",
      color: chatBoxHover ? "#000" : "",
      cursor: "pointer",
      minWidth: "200px",
    },
  })
);
