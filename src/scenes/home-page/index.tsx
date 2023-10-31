import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import { IStateAuth } from "../../state";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage:React.FunctionComponent = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state:IStateAuth.IInitialState) => state.user || {_id: '', picturePath: ''});
    return (<Box>
        <Navbar/>
        <Box
            width={"100%"}
            p={"2rem 6%"}
            display={isNonMobileScreens ? 'flex' : 'block'}
            gap={"0.5rem"}
            justifyContent={"space-between"}
        >
            <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
                <UserWidget userId={_id} picturePath={picturePath}/>
            </Box>
            <Box
                flexBasis={isNonMobileScreens ? '42%' : undefined}
                mt={isNonMobileScreens ? undefined : '2rem'}
            >
                <MyPostWidget picturePath={picturePath}/>
                <PostsWidget userId={_id}/>
            </Box>
            <Box
                flexBasis={"26%"}

            >{isNonMobileScreens && (
                    <Box>
                        <AdvertWidget/>
                        <Box m={'2rem 0'}></Box>
                        <FriendListWidget userId={_id}/>
                    </Box>
                )}
            </Box>
        </Box>
    </Box>)
};

export default HomePage;