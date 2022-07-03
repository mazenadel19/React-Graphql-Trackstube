import { CircularProgress } from "@mui/material";

const spinnerContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 50,
};

export default function Spinner() {
  return (
    <div style={spinnerContainer}>
      <CircularProgress />
    </div>
  );
}
