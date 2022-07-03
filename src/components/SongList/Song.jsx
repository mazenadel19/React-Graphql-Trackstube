import { Card, CardContent, CardMedia } from "@mui/material";

export default function Song({ title, artist, thumbnail }) {
  return (
    <Card>
      <div>
        <CardMedia image={thumbnail} />
      </div>
      <div>
        <CardContent>

        </CardContent>
      </div>
      title:{title}
      artist:{artist}
      {/* <img src={thumbnail} alt="" /> */}
    </Card>
  );
}

