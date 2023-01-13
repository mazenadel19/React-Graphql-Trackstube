import {  useMediaQuery } from "@mui/material";


const useHelper = () => {
const greaterThanMedium = useMediaQuery((theme) => theme.breakpoints.up("md"));
const greaterThanSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));


  return { greaterThanMedium, greaterThanSmall }
}

export default useHelper