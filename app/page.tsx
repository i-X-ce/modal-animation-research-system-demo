import { PATH } from "@/consts/path";
import {
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="p-4">
        <Paper>
          <List>
            {Object.entries(PATH).map(([key, { url, label }]) => (
              <Link key={key} href={url}>
                <ListItemButton>
                  <ListItem>
                    <ListItemText>{label}</ListItemText>
                  </ListItem>
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Paper>
      </main>
      <CssBaseline />
    </div>
  );
}
