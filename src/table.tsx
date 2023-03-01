import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import db from './helpers/database';
const ListTable = (data) => {
    const [eq, setEq] = React.useState([])
    React.useEffect(() => {
        setEq(data.data)
    }, [data])
    const handleClick = (id) => {
        setEq(data.data.filter(x => x.id !== id));
        db.removeEquipment(id).then(() => {
            console.info("Done");
        });
    }
    return (<TableContainer component={Paper}>
        <Table aria-label="caption table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="center">nameEquipment</TableCell>
                    <TableCell align="center">count</TableCell>
                    <TableCell align="center">Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {eq.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.data}
                        </TableCell>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.count}</TableCell>
                        <TableCell align="center">
                            <Button onClick={() => handleClick(row.id)}>
                                <DeleteIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    )
};

export default ListTable;