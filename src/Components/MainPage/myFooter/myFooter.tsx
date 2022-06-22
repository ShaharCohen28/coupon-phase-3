import "./myFooter.css";
import { Paper, Typography } from '@mui/material';

function MyFooter(): JSX.Element {
    let year=new Date().getFullYear();
    return (
        // <div className="myFooter">
		// 	<Typography variant="h6">&copy; all rights reseved for Shahar Cohen {year}</Typography>
        // </div>
        <Paper>
            <Typography variant="h6">&copy; all rights reseved for Shahar Cohen {year}</Typography>
        </Paper>
    );
}

export default MyFooter;
