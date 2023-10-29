import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import { IStateAuth } from "../../state";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";

const HomePage:React.FunctionComponent = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state:IStateAuth.IInitialState) => state.user || {_id: '', picturePath: ''});
    console.log({_id, picturePath})
    return <Box>
        <Navbar/>
        <Box
            width={"100%"}
            p={"2rem 6%"}
            display={isNonMobileScreens ? 'flex' : 'block'}
            gap={"0.5rem"}
            justifyContent={"space-between"}
        >
            <Box>
                <UserWidget userId={_id} picturePath={picturePath}/>
            </Box>
            <Box
                flexBasis={isNonMobileScreens ? '42%' : undefined}
                mt={isNonMobileScreens ? undefined : '2rem'}
            >
                <MyPostWidget picturePath={picturePath}/>
            </Box>
            <Box>
                {isNonMobileScreens && <Box flexBasis={"26%"}></Box>}
            </Box>
        </Box>
    </Box>
};

export default HomePage;