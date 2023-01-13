import { CircularProgress, Stack } from "@mui/material";

export default function Spinner() {
  return (
    <Stack display={"flex"} flexDirection="column" alignItems="center" marginTop={"50px"}>
      <CircularProgress />
    </Stack>

  );
}
