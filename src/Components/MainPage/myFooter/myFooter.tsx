import "./myFooter.css";
import { Paper, Typography } from '@mui/material';

function MyFooter(): JSX.Element {
    let year=new Date().getFullYear();
    return (
        <div className="myFooter">
            <Paper>
                <Typography variant="h6">&copy; all rights reseved for Shahar Cohen {year}</Typography>
            </Paper>
        </div>
     
            // <Typography variant="h6">&copy; all rights reseved for Shahar Cohen {year}</Typography>
      
    );
}

export default MyFooter;
