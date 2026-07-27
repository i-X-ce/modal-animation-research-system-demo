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
            {[
              PATH.viewTransitionDemo,
              PATH.viewTransitionDemo2,
              PATH.viewTransitionDemo3,
              PATH.viewTransitionDemo4,
              PATH.buttonAnimationDemo,
            ].map(({ url, label }, index) => (
              <Link key={index} href={url}>
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
